const router = require('express').Router();
const { register, login, logout, sendVerificationOTP, verifyOTP, sendResetPasswordOTP, verifyResetOTP, updatePassword } = require('../controllers/auth.js');
const auth = require('../middlewares/auth.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verification-otp', auth, sendVerificationOTP);
router.post('/verify-otp', auth, verifyOTP);
router.post('/send-reset-password-otp', sendResetPasswordOTP);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/update-password', auth, updatePassword);


module.exports = router;