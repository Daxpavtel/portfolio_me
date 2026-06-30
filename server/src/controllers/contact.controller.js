const Message = require('../models/Message.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { sendContactNotification } = require('../utils/sendEmail');

exports.sendMessage = asyncHandler(async (req, res) => {
  const msg = await Message.create({
    ...req.body,
    ipAddress: req.ip || req.connection.remoteAddress,
  });

  sendContactNotification(msg);

  ApiResponse(res, null, 'Message sent successfully', 201);
});

exports.getMessages = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    Message.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Message.countDocuments(),
  ]);

  ApiResponse(res, {
    messages,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

exports.markRead = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) throw new ApiError(404, 'Message not found');
  ApiResponse(res, msg, 'Message marked as read');
});

exports.deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) throw new ApiError(404, 'Message not found');
  ApiResponse(res, null, 'Message deleted');
});
