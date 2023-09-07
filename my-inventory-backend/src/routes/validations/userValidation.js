"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
var express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('username').isLength({ min: 3 }).trim().escape(),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
    // ... any other fields and their validations ...
];
