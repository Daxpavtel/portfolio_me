const { Router } = require('express');
const ctrl = require('../controllers/experience.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const rules = require('../validators/experience.validator');

const router = Router();

router.get('/', ctrl.getExperiences);
router.post('/', auth, rules, validate, ctrl.createExperience);
router.put('/:id', auth, rules, validate, ctrl.updateExperience);
router.delete('/:id', auth, ctrl.deleteExperience);

module.exports = router;
