import BookCard from "./BookCard";

export default function BookList({ books, onDelete, onEdit }) {
    if (books.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-900/30 border border-dashed border-slate-800/80 rounded-3xl">
                <div className="w-14 h-14 mb-4 rounded-2xl bg-slate-800/60 flex items-center justify-center text-2xl border border-slate-700/50">
                    🔍
                </div>
                <h3 className="text-base font-semibold text-slate-300">Kayıt Bulunamadı</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Aramanızla eşleşen veya bu filtreye uygun bir kitap bulunamadı. Filtreyi değiştirebilir veya yeni bir kitap ekleyebilirsiniz.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}