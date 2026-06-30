const Project = require('../models/Project.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

exports.getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  ApiResponse(res, projects);
});

exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  ApiResponse(res, project);
});

exports.createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  ApiResponse(res, project, 'Project created', 201);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, 'Project not found');
  ApiResponse(res, project, 'Project updated');
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  ApiResponse(res, null, 'Project deleted');
});
