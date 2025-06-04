import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  totalCopies: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  borrowedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

export default Book;
