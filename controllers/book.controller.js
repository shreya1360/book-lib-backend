import Book from "../model/book.model.js";

// GET all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: error.message });
  }
};

// POST - Add a new book
export const addBook = async (req, res) => {
  const { title, author, genre, totalCopies } = req.body;

  if (!title || !author || !genre || totalCopies == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      genre,
      totalCopies,
      borrowedCount: 0, // Default when a book is created
    });

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
};

// PUT - Update a book
export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre, totalCopies } = req.body;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Optional: prevent setting totalCopies < borrowedCount
    if (totalCopies < book.borrowedCount) {
      return res.status(400).json({
        message: "Total copies cannot be less than borrowed count",
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.totalCopies = totalCopies ?? book.totalCopies;

    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update book", error: error.message });
  }
};

// DELETE - Remove a book
export const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.destroy();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete book", error: error.message });
  }
};
