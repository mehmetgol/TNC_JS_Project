import { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { INITIAL_BOOKS } from "../interfaces/types";

export default function Dashboard() {
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem("bookshelf_data");
        return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    });

    const [editingBook, setEditingBook] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Hepsi");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem("bookshelf_data", JSON.stringify(books));
    }, [books]);

    const handleSaveBook = (bookData) => {
        if (editingBook) {
            setBooks(books.map((b) => (b.id === editingBook.id ? { ...bookData, id: b.id } : b)));
            setEditingBook(null);
        } else {
            setBooks([{ ...bookData, id: crypto.randomUUID() }, ...books]);
        }
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter((b) => b.id !== id));
    };

    const filteredBooks = books.filter((book) => {
        const matchesStatus = filterStatus === "Hepsi" || book.status === filterStatus;
        const matchesSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased pb-20">
            {/* Basit ve Şık Navbar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">📚</span>
                        <span className="font-bold text-lg text-slate-900 tracking-tight">BookShelf</span>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-md border border-emerald-200">
            {books.length} Kayıtlı Kitap
          </span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-8">
                {/* Form Alanı */}
                <BookForm
                    onSave={handleSaveBook}
                    editingBook={editingBook}
                    onCancelEdit={() => setEditingBook(null)}
                />

                {/* Filtre ve Arama Alanı */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                    <div className="flex gap-1 bg-slate-200/70 p-1 rounded-xl self-start">
                        {["Hepsi", "Okunacak", "Okunuyor", "Bitti"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilterStatus(tab)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                                    filterStatus === tab
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Kitap veya yazar ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition shadow-sm w-full sm:w-64"
                    />
                </div>

                {/* Kartlar */}
                <BookList
                    books={filteredBooks}
                    onDelete={handleDeleteBook}
                    onEdit={(book) => setEditingBook(book)}
                />
            </main>
        </div>
    );
}