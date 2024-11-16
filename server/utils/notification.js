// non_profit/server/utils/notifications.js
const Organization = require('../models/Organization');
const socketIO = require('../socket');

exports.sendNotification = async (organizationId, notification) => {
  try {
    await Organization.findByIdAndUpdate(organizationId, {
      $push: { 
        notifications: {
          ...notification,
          date: new Date()
        }
      }
    });

    // Send real-time notification
    socketIO.getIO().to(organizationId.toString()).emit('notification', notification);
    
    // If it's a high-priority notification, also send email
    if (notification.priority === 'high') {
      await sendEmail(organizationId, notification);
    }
  } catch (error) {
    console.error('Notification error:', error);
  }
};