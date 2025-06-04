import express from "express";
import {
  borrowBook,
  returnBook,
  getUserBorrowedBooks,
} from "../controllers/borrow.controller.js";

const router = express.Router();

// Route to borrow a book (bookId and userId in body)
router.post("/borrow", borrowBook);

// Route to return a book (bookId and userId in body)
router.post("/return", returnBook);

// Route to get all books currently borrowed by the user (userId in query)
router.get("/borrowed", getUserBorrowedBooks);

export default router;
