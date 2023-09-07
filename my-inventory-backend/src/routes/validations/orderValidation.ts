import { body, param } from 'express-validator';

export const placeOrderValidation = [
  body('userId').isInt().withMessage('User ID must be a valid integer.'),
  body('products').isArray().withMessage('Products must be an array.')
  .custom((products) => products.every((p: { productId?: any, quantity?: any }) => p.productId && typeof p.quantity === 'number'))
    .withMessage('Each product must have a valid productId and quantity.'),
];

export const updateOrderStatusValidation = [
  param('orderId').isInt().withMessage('Order ID must be a valid integer.'),
  body('status').isString().trim().escape().withMessage('Status is required and must be a string.'),
];

export const fetchUserOrdersValidation = [
  param('userId').isInt().withMessage('User ID must be a valid integer.'),
];
