import { useState, useEffect } from "react";

export default function BookForm({ onSave, editingBook, onCancelEdit }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        pageCount: "",
        status: "Okunacak",
    });

    useEffect(() => {
        if (editingBook) {
            setFormData(editingBook);
        } else {
            setFormData({ title: "", author: "", pageCount: "", status: "Okunacak" });
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.author.trim()) return;

        onSave({
            ...formData,
            pageCount: Number(formData.pageCount) || 0,
        });

        setFormData({ title: "", author: "", pageCount: "", status: "Okunacak" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900 text-sm">
                    {editingBook ? "Kitabı Güncelle" : "Yeni Kitap Ekle"}
                </h2>
                {editingBook && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                        Vazgeç
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                    type="text"
                    placeholder="Kitap Adı"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                    required
                />
                <input
                    type="text"
                    placeholder="Yazar"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                    required
                />
                <input
                    type="number"
                    placeholder="Sayfa Sayısı"
                    value={formData.pageCount}
                    onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                />
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition cursor-pointer"
                >
                    <option value="Okunacak">Okunacak</option>
                    <option value="Okunuyor">Okunuyor</option>
                    <option value="Bitti">Bitti</option>
                </select>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow"
                >
                    {editingBook ? "Kaydet" : "Ekle"}
                </button>
            </div>
        </form>
    );
}