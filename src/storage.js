const storedData = localStorage.getItem('data');
export const data = storedData ? JSON.parse(storedData) : [];
const crosswordData = localStorage.getItem('crosswordData');
export const crossword = crosswordData ? JSON.parse(crosswordData) : [];
