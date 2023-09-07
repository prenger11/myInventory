"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserOrdersValidation = exports.updateOrderStatusValidation = exports.placeOrderValidation = void 0;
var express_validator_1 = require("express-validator");
exports.placeOrderValidation = [
    (0, express_validator_1.body)('userId').isInt().withMessage('User ID must be a valid integer.'),
    (0, express_validator_1.body)('products').isArray().withMessage('Products must be an array.')
        .custom(function (products) { return products.every(function (p) { return p.productId && typeof p.quantity === 'number'; }); })
        .withMessage('Each product must have a valid productId and quantity.'),
];
exports.updateOrderStatusValidation = [
    (0, express_validator_1.param)('orderId').isInt().withMessage('Order ID must be a valid integer.'),
    (0, express_validator_1.body)('status').isString().trim().escape().withMessage('Status is required and must be a string.'),
];
exports.fetchUserOrdersValidation = [
    (0, express_validator_1.param)('userId').isInt().withMessage('User ID must be a valid integer.'),
];
