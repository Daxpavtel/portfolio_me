const { Router } = require('express');
const ctrl = require('../controllers/project.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const rules = require('../validators/project.validator');

const router = Router();

router.get('/', ctrl.getProjects);
router.get('/:id', ctrl.getProject);
router.post('/', auth, rules, validate, ctrl.createProject);
router.put('/:id', auth, rules, validate, ctrl.updateProject);
router.delete('/:id', auth, ctrl.deleteProject);

module.exports = router;
