import { Router, Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Service } from '../models/Service';
import { WorkerProfile } from '../models/WorkerProfile';
import { User } from '../models/User';
import { authenticate, authorize } from '../middleware/auth';
import { validateInput, schemas } from '../middleware/security';
import { sendEmail } from '../services/email';
import { sendBookingNotificationSMS } from '../services/sms';

const router = Router();

// Create new booking
router.post('/', authenticate, validateInput(schemas.createBooking), async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.user!._id;
    const {
      serviceId,
      workerId,
      bookingType,
      schedule,
      location,
      serviceDetails,
      recurring,
      emergency
    } = req.body;

    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      res.status(404).json({
        success: false,
        message: 'Service not found or inactive'
      });
      return;
    }

    // If worker specified, verify worker
    let assignedWorker = null;
    if (workerId) {
      const workerProfile = await WorkerProfile.findOne({
        userId: workerId,
        isActive: true,
        isApproved: true,
        'verification.status': 'verified'
      }).populate('userId');

      if (!workerProfile) {
        res.status(404).json({
          success: false,
          message: 'Worker not found or not available'
        });
        return;
      }

      assignedWorker = workerProfile;
    }

    // Calculate pricing
    const basePrice = service.pricing.basePrice;
    let additionalCharges = 0;
    let emergencyCharges = 0;
    let travelCharges = 0;

    // Add emergency charges if applicable
    if (bookingType === 'emergency') {
      emergencyCharges = Math.round(basePrice * 0.5); // 50% emergency surcharge
    }

    // Calculate distance-based travel charges
    if (assignedWorker && location.coordinates) {
      // Mock travel charges calculation - in real app, use Google Maps API
      travelCharges = 50; // Base travel charge
    }

    const subtotal = basePrice + additionalCharges + emergencyCharges + travelCharges;
    const gst = Math.round(subtotal * 0.18); // 18% GST
    const platformFee = Math.round(subtotal * 0.05); // 5% platform fee
    const totalAmount = subtotal + gst + platformFee;
    const workerEarnings = subtotal - platformFee;

    // Create booking
    const booking = new Booking({
      customerId,
      workerId: assignedWorker?.userId._id,
      serviceId,
      bookingType,
      serviceDetails: {
        serviceName: service.name,
        category: service.category,
        description: serviceDetails.description,
        customRequirements: serviceDetails.customRequirements,
        urgencyLevel: serviceDetails.urgencyLevel
      },
      schedule,
      location,
      pricing: {
        basePrice,
        additionalCharges: [],
        emergencyCharges,
        travelCharges,
        tax: {
          gst,
          serviceTax: 0
        },
        totalAmount,
        platformFee,
        workerEarnings
      },
      payment: {
        method: 'cash', // Default to cash, will be updated on payment
        status: 'pending'
      },
      tracking: {
        milestones: [{
          status: 'booking_created',
          timestamp: new Date(),
          description: 'Booking created successfully',
          updatedBy: 'system'
        }]
      },
      recurring,
      emergency
    });

    await booking.save();

    // Update service stats
    await Service.findByIdAndUpdate(serviceId, {
      $inc: { 'stats.totalBookings': 1 }
    });

    // Send confirmation email to customer
    const customer = await User.findById(customerId);
    if (customer) {
      try {
        await sendEmail({
          to: customer.email,
          subject: 'Booking Confirmed - Nagrik Sewa',
          template: 'booking-confirmation',
          data: {
            customerName: customer.firstName,
            bookingId: booking.bookingId,
            serviceName: service.name,
            workerName: assignedWorker ? `${assignedWorker.userId.firstName} ${assignedWorker.userId.lastName}` : 'To be assigned',
            dateTime: `${schedule.requestedDate.toDateString()} at ${schedule.requestedTime}`,
            address: `${location.address.street}, ${location.address.city}`,
            totalAmount: totalAmount,
            bookingLink: `${process.env.FRONTEND_URL}/bookings/${booking._id}`
          }
        });
      } catch (emailError) {
        console.error('Failed to send booking confirmation email:', emailError);
      }

      // Send SMS notification
      try {
        await sendBookingNotificationSMS(
          customer.phone,
          booking.bookingId,
          service.name,
          `${schedule.requestedDate.toDateString()} at ${schedule.requestedTime}`
        );
      } catch (smsError) {
        console.error('Failed to send booking SMS:', smsError);
      }
    }

    // Notify worker if assigned
    if (assignedWorker) {
      // Add worker notification logic here
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: {
          id: booking._id,
          bookingId: booking.bookingId,
          status: booking.status,
          serviceDetails: booking.serviceDetails,
          schedule: booking.schedule,
          pricing: booking.pricing,
          assignedWorker: assignedWorker ? {
            id: assignedWorker.userId._id,
            name: `${assignedWorker.userId.firstName} ${assignedWorker.userId.lastName}`,
            avatar: assignedWorker.userId.avatar,
            rating: assignedWorker.rating.average
          } : null
        }
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const { status, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = Math.min(parseInt(limit as string), 50);
    const skip = (pageNum - 1) * limitNum;

    // Build query based on user role
    const query: any = {};
    if (req.user!.role === 'customer') {
      query.customerId = userId;
    } else if (req.user!.role === 'worker') {
      query.workerId = userId;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const [bookings, totalCount] = await Promise.all([
      Booking.find(query)
        .populate('serviceId', 'name category images')
        .populate('customerId', 'firstName lastName avatar phone')
        .populate('workerId', 'firstName lastName avatar phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Booking.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limitNum),
          hasNext: pageNum * limitNum < totalCount,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get booking by ID
router.get('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const booking = await Booking.findById(id)
      .populate('serviceId', 'name category description images pricing')
      .populate('customerId', 'firstName lastName avatar phone email address')
      .populate('workerId', 'firstName lastName avatar phone email');

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }

    // Check if user has permission to view this booking
    const hasPermission = booking.customerId._id.toString() === userId.toString() ||
                         booking.workerId?._id.toString() === userId.toString() ||
                         req.user!.role === 'admin';

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Get worker profile if worker is assigned
    let workerProfile = null;
    if (booking.workerId) {
      workerProfile = await WorkerProfile.findOne({ userId: booking.workerId._id })
        .select('rating skills experience verification');
    }

    res.json({
      success: true,
      data: {
        booking,
        workerProfile
      }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// Update booking status
router.patch('/:id/status', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    const userId = req.user!._id;

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }

    // Check permissions
    const isCustomer = booking.customerId.toString() === userId.toString();
    const isWorker = booking.workerId?.toString() === userId.toString();
    const isAdmin = req.user!.role === 'admin';

    if (!isCustomer && !isWorker && !isAdmin) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Validate status transitions
    const validTransitions: { [key: string]: string[] } = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['in-progress', 'cancelled'],
      'in-progress': ['completed', 'cancelled'],
      'completed': ['disputed'],
      'cancelled': [],
      'disputed': ['resolved']
    };

    if (!validTransitions[booking.status]?.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Cannot change status from ${booking.status} to ${status}`
      });
      return;
    }

    // Update booking status
    booking.status = status;

    // Add milestone
    booking.tracking.milestones.push({
      status,
      timestamp: new Date(),
      description: reason || `Status changed to ${status}`,
      updatedBy: isAdmin ? 'admin' : (isCustomer ? 'customer' : 'worker')
    });

    // Handle specific status changes
    if (status === 'in-progress') {
      booking.schedule.actualStartTime = new Date();
    } else if (status === 'completed') {
      booking.schedule.actualEndTime = new Date();
      
      // Update service and worker stats
      await Promise.all([
        Service.findByIdAndUpdate(booking.serviceId, {
          $inc: { 'stats.completedBookings': 1 }
        }),
        WorkerProfile.findOneAndUpdate(
          { userId: booking.workerId },
          {
            $inc: {
              'stats.completedBookings': 1,
              'earnings.totalEarnings': booking.pricing.workerEarnings
            }
          }
        )
      ]);
    } else if (status === 'cancelled') {
      booking.cancellation = {
        cancelledBy: isAdmin ? 'admin' : (isCustomer ? 'customer' : 'worker'),
        reason: reason || 'No reason provided',
        cancelledAt: new Date(),
        refundEligible: true, // Logic for refund eligibility
        refundAmount: booking.pricing.totalAmount
      };
    }

    await booking.save();

    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: { booking }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status'
    });
  }
});

// Add review for completed booking
router.post('/:id/review', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment, categories, images } = req.body;
    const userId = req.user!._id;

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }

    if (booking.status !== 'completed') {
      res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
      return;
    }

    const isCustomer = booking.customerId.toString() === userId.toString();
    const isWorker = booking.workerId?.toString() === userId.toString();

    if (!isCustomer && !isWorker) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Add review
    const reviewData = {
      rating,
      comment,
      categories,
      images,
      reviewedAt: new Date()
    };

    if (isCustomer) {
      if (booking.review?.customerReview) {
        res.status(400).json({
          success: false,
          message: 'Customer review already exists'
        });
        return;
      }
      booking.review = { ...booking.review, customerReview: reviewData };
    } else {
      if (booking.review?.workerReview) {
        res.status(400).json({
          success: false,
          message: 'Worker review already exists'
        });
        return;
      }
      booking.review = { ...booking.review, workerReview: reviewData };
    }

    await booking.save();

    // Update worker rating if customer reviewed
    if (isCustomer && booking.workerId) {
      const workerProfile = await WorkerProfile.findOne({ userId: booking.workerId });
      if (workerProfile) {
        const currentRating = workerProfile.rating;
        const newTotalReviews = currentRating.totalReviews + 1;
        const newAverage = ((currentRating.average * currentRating.totalReviews) + rating) / newTotalReviews;

        workerProfile.rating.average = Math.round(newAverage * 10) / 10;
        workerProfile.rating.totalReviews = newTotalReviews;
        workerProfile.rating.breakdown[rating as keyof typeof workerProfile.rating.breakdown]++;

        // Update category ratings
        if (categories) {
          Object.keys(categories).forEach(category => {
            if (workerProfile.rating.categories[category as keyof typeof workerProfile.rating.categories] !== undefined) {
              const currentCategoryRating = workerProfile.rating.categories[category as keyof typeof workerProfile.rating.categories];
              const newCategoryRating = ((currentCategoryRating * (newTotalReviews - 1)) + categories[category]) / newTotalReviews;
              (workerProfile.rating.categories as any)[category] = Math.round(newCategoryRating * 10) / 10;
            }
          });
        }

        await workerProfile.save();
      }
    }

    res.json({
      success: true,
      message: 'Review added successfully',
      data: { review: reviewData }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add review'
    });
  }
});

// Cancel booking
router.post('/:id/cancel', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user!._id;

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }

    // Check if booking can be cancelled
    if (['completed', 'cancelled', 'disputed'].includes(booking.status)) {
      res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled'
      });
      return;
    }

    const isCustomer = booking.customerId.toString() === userId.toString();
    const isWorker = booking.workerId?.toString() === userId.toString();

    if (!isCustomer && !isWorker && req.user!.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Calculate cancellation charges
    let cancellationFee = 0;
    let refundAmount = booking.pricing.totalAmount;

    const timeUntilBooking = new Date(booking.schedule.requestedDate).getTime() - Date.now();
    const hoursUntilBooking = timeUntilBooking / (1000 * 60 * 60);

    if (isCustomer) {
      if (hoursUntilBooking < 2) {
        cancellationFee = Math.round(booking.pricing.totalAmount * 0.5); // 50% charge
      } else if (hoursUntilBooking < 24) {
        cancellationFee = Math.round(booking.pricing.totalAmount * 0.25); // 25% charge
      }
    }

    refundAmount = booking.pricing.totalAmount - cancellationFee;

    // Update booking
    booking.status = 'cancelled';
    booking.cancellation = {
      cancelledBy: req.user!.role === 'admin' ? 'admin' : (isCustomer ? 'customer' : 'worker'),
      reason: reason || 'No reason provided',
      cancelledAt: new Date(),
      refundEligible: true,
      cancellationFee,
      refundAmount
    };

    booking.tracking.milestones.push({
      status: 'cancelled',
      timestamp: new Date(),
      description: `Booking cancelled: ${reason || 'No reason provided'}`,
      updatedBy: req.user!.role === 'admin' ? 'admin' : (isCustomer ? 'customer' : 'worker')
    });

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        cancellationFee,
        refundAmount,
        booking
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

export default router;
