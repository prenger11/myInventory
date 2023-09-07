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
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var userValidation_1 = require("./validations/userValidation");
var router = (0, express_1.Router)();
// Middleware for authentication
var isAuthenticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, decoded;
    return __generator(this, function (_a) {
        authHeader = req.headers.authorization;
        if (!authHeader) {
            return [2 /*return*/, res.status(401).send('Authorization header missing')];
        }
        token = authHeader.split(' ')[1];
        if (!token) {
            return [2 /*return*/, res.status(401).send('Token missing')];
        }
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (typeof decoded === 'object' && 'id' in decoded) {
                req.userId = decoded.id;
                next();
            }
            else {
                return [2 /*return*/, res.status(401).send('Invalid token')];
            }
        }
        catch (error) {
            return [2 /*return*/, res.status(401).send('Invalid token')];
        }
        return [2 /*return*/];
    });
}); };
// Middleware for role-based access (You can implement this later when needed)
var isAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: Fetch user from the database using req.userId and check if they have an admin role.
        // For now, we'll assume all authenticated users are admins.
        next();
        return [2 /*return*/];
    });
}); };
// User registration
router.post('/register', userValidation_1.registerValidation, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, username, email, password, salt, hashedPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 2:
                hashedPassword = _b.sent();
                // TODO: Insert user into the database with hashed password.
                // await User.create({ username, email, password: hashedPassword }); // Replace with Sequelize logic
                res.status(201).json({ message: "User registered successfully" });
                return [2 /*return*/];
        }
    });
}); });
// User login
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, validPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 1:
                validPassword = _b.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(401).json({ error: "Invalid username or password" })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, "YOUR_SECRET_KEY", {
                    expiresIn: 86400 // 24 hours
                });
                res.json({ message: "Logged in successfully", token: token });
                return [2 /*return*/];
        }
    });
}); });
// Get user details (must be authenticated)
router.get('/details', isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userDetails;
    return __generator(this, function (_a) {
        userId = req.userId;
        userDetails = {
            id: userId,
            username: 'sampleUsername',
            email: 'sample@email.com',
            role: 'customer'
        };
        res.json(userDetails);
        return [2 /*return*/];
    });
}); });
exports.default = router;
