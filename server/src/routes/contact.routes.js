const { Router } = require('express');
const ctrl = require('../controllers/contact.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const rules = require('../validators/contact.validator');
const { contactLimiter } = require('../middleware/rateLimiter.middleware');

const router = Router();

router.post('/', contactLimiter, rules, validate, ctrl.sendMessage);
router.get('/', auth, ctrl.getMessages);
router.patch('/:id/read', auth, ctrl.markRead);
router.delete('/:id', auth, ctrl.deleteMessage);

module.exports = router;
