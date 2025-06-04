import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import User from "./user.model.js";
import Book from "./book.model.js";

const Borrow = sequelize.define("Borrow", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  returnDate: {
    type: DataTypes.DATE,
    allowNull: true, // null means not returned yet
  },

  returned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Set associations
User.hasMany(Borrow, { foreignKey: "userId" });
Borrow.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Borrow, { foreignKey: "bookId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });

export default Borrow;
