"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateProductValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createOrUpdateProductValidation = [
    (0, express_validator_1.body)('name').isLength({ min: 3 }).trim().escape(),
    (0, express_validator_1.body)('description').optional().trim().escape(),
    (0, express_validator_1.body)('price').isDecimal().withMessage('Price must be a valid decimal number.'),
    (0, express_validator_1.body)('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer.'),
];
