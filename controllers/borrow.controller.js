import Borrow from "../model/borrow.model.js";
import Book from "../model/book.model.js";

// Borrow a book
export const borrowBook = async (req, res) => {
  const userId = req.body.userId; // get userId from request body
  const { bookId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  try {   
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user has already borrowed and not returned this book
    const existingBorrow = await Borrow.findOne({
      where: { userId, bookId, returned: false },
    });

    if (existingBorrow) {
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    // Check for available copies
    const availableCopies = book.totalCopies - book.borrowedCount;
    if (availableCopies < 1) {
      return res.status(400).json({ message: "No copies available to borrow" });
    }

    // Create borrow record
    await Borrow.create({
      userId,
      bookId,
      borrowDate: new Date(),
      returned: false,
    });

    // Increment book's borrowedCount
    book.borrowedCount += 1;
    await book.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to borrow book", error: error.message });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  const userId = req.body.userId;
  const { bookId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  try {
    const borrow = await Borrow.findOne({
      where: { userId, bookId, returned: false },
    });

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    borrow.returned = true;
    borrow.returnDate = new Date();
    await borrow.save();

    // Decrement book's borrowedCount
    const book = await Book.findByPk(bookId);
    if (book.borrowedCount > 0) {
      book.borrowedCount -= 1;
      await book.save();
    }

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to return book", error: error.message });
  }
};

// Get user's currently borrowed books (not returned)
export const getUserBorrowedBooks = async (req, res) => {
  const userId = req.query.userId; // get userId from query param

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const borrowedBooks = await Borrow.findAll({
      where: { userId, returned: false },
      include: [
        {
          model: Book,
          attributes: ["id", "title", "author", "genre", "totalCopies"],
        },
      ],
    });

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch borrowed books",
      error: error.message,
    });
  }
};
