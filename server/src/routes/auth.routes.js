const { Router } = require('express');
const ctrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const rules = require('../validators/auth.validator');
const { loginLimiter } = require('../middleware/rateLimiter.middleware');

const router = Router();

router.post('/login', loginLimiter, rules, validate, ctrl.login);
router.get('/me', auth, ctrl.getMe);

module.exports = router;
