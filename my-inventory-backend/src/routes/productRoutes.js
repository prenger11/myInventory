"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var mysql_1 = require("mysql");
var productValidation_1 = require("./validations/productValidation");
// Setup MySQL connection (ensure you have the mysql node module installed)
var db = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
var router = (0, express_1.Router)();
// Add new product
router.post('/', productValidation_1.createOrUpdateProductValidation, function (req, res) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var _a = req.body, name = _a.name, description = _a.description, price = _a.price, stock_quantity = _a.stock_quantity;
    // Insert product into the database
    var sql = "INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, description, price, stock_quantity], function (error, results) {
        if (error) {
            return res.status(500).json({ message: "Failed to add product", error: error.message });
        }
        res.status(201).json({ message: "Product added successfully", productId: results.insertId });
    });
});
// Get all products
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error;
    return __generator(this, function (_a) {
        // TODO: Fetch all products from the database
        try {
            products = [];
            res.json(products);
        }
        catch (err) {
            error = err;
            res.status(500).json({ message: "Failed to fetch products", error: error.message });
        }
        return [2 /*return*/];
    });
}); });
// Get specific product
router.get('/:productId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error;
    return __generator(this, function (_a) {
        productId = req.params.productId;
        // TODO: Fetch the specific product from the database by its ID
        try {
            product = {
                id: 0,
                name: '',
                price: 0
            };
            res.json(product);
        }
        catch (err) {
            error = err;
            res.status(500).json({ message: "Failed to fetch product", error: error.message });
        }
        return [2 /*return*/];
    });
}); });
// Update product
router.put('/:productId', productValidation_1.createOrUpdateProductValidation, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, productId, _a, name, description, price, stock_quantity, error;
    return __generator(this, function (_b) {
        errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
        }
        productId = req.params.productId;
        _a = req.body, name = _a.name, description = _a.description, price = _a.price, stock_quantity = _a.stock_quantity;
        // TODO: Update the product in the database using its ID
        try {
            // Update product logic
            res.json({ message: "Product updated successfully" });
        }
        catch (err) {
            error = err;
            res.status(500).json({ message: "Failed to update product", error: error.message });
        }
        return [2 /*return*/];
    });
}); });
// Delete product
router.delete('/:productId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, error;
    return __generator(this, function (_a) {
        productId = req.params.productId;
        // TODO: Delete the product from the database using its ID
        try {
            // Delete product logic
            res.json({ message: "Product deleted successfully" });
        }
        catch (err) {
            error = err;
            res.status(500).json({ message: "Failed to delete product", error: error.message });
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
