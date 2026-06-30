const { Router } = require('express');
const ctrl = require('../controllers/skill.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const rules = require('../validators/skill.validator');

const router = Router();

router.get('/', ctrl.getSkills);
router.post('/', auth, rules, validate, ctrl.createSkill);
router.put('/:id', auth, rules, validate, ctrl.updateSkill);
router.delete('/:id', auth, ctrl.deleteSkill);

module.exports = router;
