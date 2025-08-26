import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkerProfile extends Document {
  userId: mongoose.Types.ObjectId;
  
  // Professional Information
  businessName?: string;
  description: string;
  experience: number; // in years
  
  // Skills and Services
  skills: Array<{
    name: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'expert';
    yearsOfExperience: number;
    certifications?: string[];
    hourlyRate?: number;
    fixedRate?: number;
  }>;
  
  serviceCategories: string[];
  
  // Verification and Documents
  verification: {
    status: 'pending' | 'in-review' | 'verified' | 'rejected';
    documents: Array<{
      type: 'aadhaar' | 'pan' | 'driving_license' | 'professional_license' | 'address_proof';
      documentNumber: string;
      imageUrl: string;
      verificationStatus: 'pending' | 'verified' | 'rejected';
      verifiedAt?: Date;
      rejectionReason?: string;
    }>;
    backgroundCheck: {
      status: 'pending' | 'in-progress' | 'cleared' | 'failed';
      completedAt?: Date;
      reportUrl?: string;
    };
    skillAssessments: Array<{
      skill: string;
      score: number;
      maxScore: number;
      assessedAt: Date;
      certificateUrl?: string;
    }>;
    referencesChecked: boolean;
    manualReviewCompleted: boolean;
    verifiedAt?: Date;
    verifiedBy?: mongoose.Types.ObjectId;
  };
  
  // Availability and Scheduling
  availability: {
    schedule: Array<{
      day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
      isAvailable: boolean;
      slots: Array<{
        startTime: string; // HH:MM format
        endTime: string;
        isBooked: boolean;
      }>;
    }>;
    timeZone: string;
    isCurrentlyAvailable: boolean;
    lastSeen?: Date;
    emergencyAvailable: boolean;
  };
  
  // Portfolio and Work Samples
  portfolio: Array<{
    title: string;
    description: string;
    images: string[];
    videos?: string[];
    category: string;
    completedAt: Date;
    clientFeedback?: string;
    tags: string[];
  }>;
  
  // Ratings and Reviews
  rating: {
    average: number;
    totalReviews: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
    categories: {
      quality: number;
      punctuality: number;
      communication: number;
      pricing: number;
      professionalism: number;
    };
  };
  
  // Earnings and Financial
  earnings: {
    totalEarnings: number;
    monthlyEarnings: number;
    weeklyEarnings: number;
    pendingPayouts: number;
    completedJobs: number;
    successRate: number;
    averageJobValue: number;
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
      bankName: string;
      isVerified: boolean;
    };
    taxDetails?: {
      panNumber: string;
      gstNumber?: string;
      isGstRegistered: boolean;
    };
  };
  
  // Service Areas and Preferences
  serviceAreas: Array<{
    city: string;
    state: string;
    pincode?: string;
    radius: number; // in km
    travelCharges?: number;
  }>;
  
  preferences: {
    minimumJobValue: number;
    maximumTravelDistance: number;
    preferredPaymentMethods: string[];
    workingDays: string[];
    emergencyServiceCharges: number;
    cancellationPolicy: string;
  };
  
  // Professional Development
  certifications: Array<{
    name: string;
    issuingAuthority: string;
    issueDate: Date;
    expiryDate?: Date;
    certificateUrl: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
  }>;
  
  courses: Array<{
    courseId: mongoose.Types.ObjectId;
    title: string;
    progress: number;
    completedAt?: Date;
    certificateUrl?: string;
    grade?: string;
  }>;
  
  // Statistics
  stats: {
    profileViews: number;
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    responseTime: number; // average response time in minutes
    firstResponseTime: number;
    jobCompletionRate: number;
    repeatCustomers: number;
    referrals: number;
  };
  
  // Settings
  settings: {
    instantBooking: boolean;
    autoAcceptBookings: boolean;
    showContactInfo: boolean;
    allowReviews: boolean;
    vacationMode: boolean;
    vacationMessage?: string;
  };
  
  // SEO and Discovery
  searchTags: string[];
  languages: string[];
  
  // Status
  isActive: boolean;
  isApproved: boolean;
  suspensionDetails?: {
    isSuspended: boolean;
    suspendedAt?: Date;
    suspensionReason?: string;
    suspendedBy?: mongoose.Types.ObjectId;
    suspensionExpiry?: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
  
  // Virtual properties
  profileCompletion: number;
}

const workerProfileSchema = new Schema<IWorkerProfile>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  businessName: {
    type: String,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  
  // Skills array
  skills: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      required: true
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0
    },
    certifications: [String],
    hourlyRate: {
      type: Number,
      min: 0
    },
    fixedRate: {
      type: Number,
      min: 0
    }
  }],
  
  serviceCategories: [String],
  
  // Verification object
  verification: {
    status: {
      type: String,
      enum: ['pending', 'in-review', 'verified', 'rejected'],
      default: 'pending'
    },
    documents: [{
      type: {
        type: String,
        enum: ['aadhaar', 'pan', 'driving_license', 'professional_license', 'address_proof'],
        required: true
      },
      documentNumber: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      },
      verifiedAt: Date,
      rejectionReason: String
    }],
    backgroundCheck: {
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'cleared', 'failed'],
        default: 'pending'
      },
      completedAt: Date,
      reportUrl: String
    },
    skillAssessments: [{
      skill: String,
      score: Number,
      maxScore: Number,
      assessedAt: Date,
      certificateUrl: String
    }],
    referencesChecked: {
      type: Boolean,
      default: false
    },
    manualReviewCompleted: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Availability object
  availability: {
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
      slots: [{
        startTime: String,
        endTime: String,
        isBooked: {
          type: Boolean,
          default: false
        }
      }]
    }],
    timeZone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    isCurrentlyAvailable: {
      type: Boolean,
      default: true
    },
    lastSeen: Date,
    emergencyAvailable: {
      type: Boolean,
      default: false
    }
  },
  
  // Portfolio array
  portfolio: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    images: [String],
    videos: [String],
    category: String,
    completedAt: Date,
    clientFeedback: String,
    tags: [String]
  }],
  
  // Rating object
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    breakdown: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    },
    categories: {
      quality: { type: Number, default: 0 },
      punctuality: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      pricing: { type: Number, default: 0 },
      professionalism: { type: Number, default: 0 }
    }
  },
  
  // Earnings object
  earnings: {
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0
    },
    monthlyEarnings: {
      type: Number,
      default: 0,
      min: 0
    },
    weeklyEarnings: {
      type: Number,
      default: 0,
      min: 0
    },
    pendingPayouts: {
      type: Number,
      default: 0,
      min: 0
    },
    completedJobs: {
      type: Number,
      default: 0,
      min: 0
    },
    successRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageJobValue: {
      type: Number,
      default: 0,
      min: 0
    },
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String,
      bankName: String,
      isVerified: {
        type: Boolean,
        default: false
      }
    },
    taxDetails: {
      panNumber: String,
      gstNumber: String,
      isGstRegistered: {
        type: Boolean,
        default: false
      }
    }
  },
  
  // Service areas
  serviceAreas: [{
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: String,
    radius: {
      type: Number,
      required: true,
      min: 1,
      max: 100
    },
    travelCharges: {
      type: Number,
      min: 0
    }
  }],
  
  // Preferences
  preferences: {
    minimumJobValue: {
      type: Number,
      default: 100,
      min: 0
    },
    maximumTravelDistance: {
      type: Number,
      default: 10,
      min: 1,
      max: 100
    },
    preferredPaymentMethods: [String],
    workingDays: [String],
    emergencyServiceCharges: {
      type: Number,
      default: 0,
      min: 0
    },
    cancellationPolicy: String
  },
  
  // Certifications
  certifications: [{
    name: {
      type: String,
      required: true
    },
    issuingAuthority: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: Date,
    certificateUrl: {
      type: String,
      required: true
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    }
  }],
  
  // Courses
  courses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    title: String,
    progress: {
      type: Number,
      min: 0,
      max: 100
    },
    completedAt: Date,
    certificateUrl: String,
    grade: String
  }],
  
  // Statistics
  stats: {
    profileViews: {
      type: Number,
      default: 0
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    completedBookings: {
      type: Number,
      default: 0
    },
    cancelledBookings: {
      type: Number,
      default: 0
    },
    responseTime: {
      type: Number,
      default: 0
    },
    firstResponseTime: {
      type: Number,
      default: 0
    },
    jobCompletionRate: {
      type: Number,
      default: 0
    },
    repeatCustomers: {
      type: Number,
      default: 0
    },
    referrals: {
      type: Number,
      default: 0
    }
  },
  
  // Settings
  settings: {
    instantBooking: {
      type: Boolean,
      default: false
    },
    autoAcceptBookings: {
      type: Boolean,
      default: false
    },
    showContactInfo: {
      type: Boolean,
      default: true
    },
    allowReviews: {
      type: Boolean,
      default: true
    },
    vacationMode: {
      type: Boolean,
      default: false
    },
    vacationMessage: String
  },
  
  searchTags: [String],
  languages: [String],
  
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  suspensionDetails: {
    isSuspended: {
      type: Boolean,
      default: false
    },
    suspendedAt: Date,
    suspensionReason: String,
    suspendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    suspensionExpiry: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
workerProfileSchema.index({ 'verification.status': 1 });
workerProfileSchema.index({ 'serviceCategories': 1 });
workerProfileSchema.index({ 'rating.average': -1 });
workerProfileSchema.index({ 'serviceAreas.city': 1, 'serviceAreas.state': 1 });
workerProfileSchema.index({ 'skills.name': 1, 'skills.category': 1 });
workerProfileSchema.index({ isActive: 1, isApproved: 1 });
workerProfileSchema.index({ 'availability.isCurrentlyAvailable': 1 });

// Compound indexes for search
workerProfileSchema.index({
  'serviceCategories': 1,
  'serviceAreas.city': 1,
  'rating.average': -1,
  'availability.isCurrentlyAvailable': 1
});

// Virtual for completion percentage
workerProfileSchema.virtual('profileCompletion').get(function() {
  let completed = 0;
  let total = 10;
  
  if (this.description) completed++;
  if (this.skills && this.skills.length > 0) completed++;
  if (this.portfolio && this.portfolio.length > 0) completed++;
  if (this.serviceAreas && this.serviceAreas.length > 0) completed++;
  if (this.verification.documents && this.verification.documents.length > 0) completed++;
  if (this.availability.schedule && this.availability.schedule.length > 0) completed++;
  if (this.earnings.bankDetails && this.earnings.bankDetails.accountNumber) completed++;
  if (this.certifications && this.certifications.length > 0) completed++;
  if (this.languages && this.languages.length > 0) completed++;
  if (this.businessName) completed++;
  
  return Math.round((completed / total) * 100);
});

export const WorkerProfile = (mongoose.models.WorkerProfile as mongoose.Model<IWorkerProfile>) || mongoose.model<IWorkerProfile>('WorkerProfile', workerProfileSchema);
