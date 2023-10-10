const rateLimit = require("express-rate-limit")

module.exports.createAccountLimiter = rateLimit({
	windowMs: 60*1000, // 1 min
	max: 500, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after a min',
	statusCode:	429,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})