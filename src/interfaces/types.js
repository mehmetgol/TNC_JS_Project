/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {number} pageCount
 * @property {'Okunacak' | 'Okunuyor' | 'Bitti'} status
 */
export const INITIAL_BOOKS = [
    {
        id: "1",
        title: "Vadideki Zambak",
        author: "Honoré de Balzac",
        pageCount: 320,
        status: "Bitti"
    },
    {
        id: "2",
        title: "Dava",
        author: "Franz Kafka",
        pageCount: 224,
        status: "Okunuyor"
    }
];