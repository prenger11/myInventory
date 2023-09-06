import { body } from 'express-validator';

export const createOrUpdateProductValidation = [
  body('name').isLength({ min: 3 }).trim().escape(),
  body('description').optional().trim().escape(),
  body('price').isDecimal().withMessage('Price must be a valid decimal number.'),
  body('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer.'),
];
