const { Router } = require('express');
const projectRoutes = require('./project.routes');
const skillRoutes = require('./skill.routes');
const experienceRoutes = require('./experience.routes');
const contactRoutes = require('./contact.routes');
const authRoutes = require('./auth.routes');

const router = Router();

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK', uptime: process.uptime() });
});

module.exports = router;
