const Experience = require('../models/Experience.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

exports.getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ startDate: -1 });
  ApiResponse(res, experiences);
});

exports.createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  ApiResponse(res, experience, 'Experience created', 201);
});

exports.updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) throw new ApiError(404, 'Experience not found');
  ApiResponse(res, experience, 'Experience updated');
});

exports.deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  ApiResponse(res, null, 'Experience deleted');
});
