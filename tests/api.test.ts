import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createServer } from '../server/index';
import { database } from '../server/config/database';

describe('Nagrik Sewa API Tests', () => {
  let app: any;
  let server: any;

  beforeAll(async () => {
    app = createServer();
    server = app.listen(0); // Use random port for testing
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
    server.close();
  });

  describe('Health Checks', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });

    it('should return ping message', async () => {
      const response = await request(app).get('/api/ping');
      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('Authentication', () => {
    const timestamp = Date.now();
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${timestamp}@example.com`,
      password: 'password123',
      phone: `98765${String(timestamp).slice(-5)}`,
      role: 'customer'
    };

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUser.email);
    });

    it('should login user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe('AI Chatbot', () => {
    it('should handle chat message (with or without API key)', async () => {
      const response = await request(app)
        .post('/api/chat/chat')
        .send({
          message: 'Hello, I need help with plumbing',
          language: 'en'
        });
      
      // Should return either success (200) if API key is valid, or error (500) if not configured
      expect([200, 500]).toContain(response.status);
      expect(response.body.success).toBeDefined();
      
      if (response.status === 200) {
        expect(response.body.data.response).toBeDefined();
      } else {
        expect(response.body.message).toContain('service');
      }
    });
  });

  describe('Services', () => {
    it('should get all services', async () => {
      const response = await request(app).get('/api/services');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data.services)).toBe(true);
    });
  });
});
