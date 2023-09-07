"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("./database"); // Adjust the path to your Sequelize instance
var users_1 = require("./users"); // Import the User model
var orderItem_1 = require("./orderItem"); // Assuming this is the path to your OrderItem model
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Order;
}(sequelize_1.Model));
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id' // Column name of the referenced table
        }
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        defaultValue: 'Pending'
    },
}, {
    tableName: 'orders',
    sequelize: database_1.default,
});
// Associations
Order.belongsTo(users_1.default, { foreignKey: 'userId' });
Order.belongsToMany(orderItem_1.default, { through: 'orderItems', foreignKey: 'orderId' }); // Assuming you have a junction table named 'orderItems'
exports.default = Order;
