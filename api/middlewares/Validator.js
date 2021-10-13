const { check, validationResult } = require("express-validator");


exports.registerRules = () => [
    check('username', 'This field is required').notEmpty(),
    check('email', 'This field is required').notEmpty(),
    check('email', 'This should be a valid email').isEmail(),
    check('password', 'This field should be at least 6 character').isLength({min:6})
];

exports.validator = (req,res,next) =>{
    const errors = validationResult(req)
    errors.isEmpty() ? next() : res.status(400).json({msg:errors.array()})
};