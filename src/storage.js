const storedData = localStorage.getItem('data');
export const data = storedData ? JSON.parse(storedData) : [];
