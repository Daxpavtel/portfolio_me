const Skill = require('../models/Skill.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

exports.getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, name: 1 });
  ApiResponse(res, skills);
});

exports.createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  ApiResponse(res, skill, 'Skill created', 201);
});

exports.updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) throw new ApiError(404, 'Skill not found');
  ApiResponse(res, skill, 'Skill updated');
});

exports.deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  ApiResponse(res, null, 'Skill deleted');
});
