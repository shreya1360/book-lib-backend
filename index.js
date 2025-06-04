// index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./config.js";
import userRoutes from "./routes/user.route.js";
import bookRoutes from "./routes/book.route.js";
import borrowRoutes from "./routes/borrow.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/borrow", borrowRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
