import mongoose from 'mongoose';

class Database {
  private static instance: Database;
  private isConnected: boolean = false;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('MongoDB already connected');
      return;
    }

    try {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }

      const options: mongoose.ConnectOptions = {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        retryWrites: true
      };

      await mongoose.connect(mongoUri, options);
      
      this.isConnected = true;
      console.log('✅ MongoDB connected successfully');

      // Handle connection events
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
        this.isConnected = true;
      });

      // Handle application termination
      process.on('SIGINT', async () => {
        await this.disconnect();
        process.exit(0);
      });

    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      this.isConnected = false;
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log('📦 MongoDB connection closed');
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
      throw error;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  public async ping(): Promise<boolean> {
    try {
      await mongoose.connection.db.admin().ping();
      return true;
    } catch (error) {
      console.error('❌ MongoDB ping failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const database = new Database();

// Health check function
export const checkDatabaseHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy';
  message: string;
  timestamp: Date;
}> => {
  try {
    const isConnected = database.getConnectionStatus();
    const canPing = await database.ping();
    
    if (isConnected && canPing) {
      return {
        status: 'healthy',
        message: 'Database connection is healthy',
        timestamp: new Date()
      };
    } else {
      return {
        status: 'unhealthy',
        message: 'Database connection issues detected',
        timestamp: new Date()
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Database health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date()
    };
  }
};
