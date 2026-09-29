export default function BookCard({ book, onDelete, onEdit }) {
    const statusStyles = {
        Okunacak: "bg-amber-50 text-amber-700 border-amber-200",
        Okunuyor: "bg-blue-50 text-blue-700 border-blue-200",
        Bitti: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow transition flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900 text-base line-clamp-1">{book.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${statusStyles[book.status] || "bg-slate-100 text-slate-600"}`}>
            {book.status}
          </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">{book.author}</p>
                <p className="text-xs font-mono text-slate-400">{book.pageCount > 0 ? `${book.pageCount} sayfa` : "Sayfa belirtilmedi"}</p>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                    onClick={() => onEdit(book)}
                    className="flex-1 text-xs py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md transition text-center"
                >
                    Düzenle
                </button>
                <button
                    onClick={() => onDelete(book.id)}
                    className="text-xs py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-md transition"
                >
                    Sil
                </button>
            </div>
        </div>
    );
}