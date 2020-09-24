export const saveData = (key, data) => {
  if (data === null || data === undefined) {
    removeData(key);
    return;
  }
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const loadData = (key) => {
  const json = localStorage.getItem(key);
  if (json === null || json === undefined) return null;
  return JSON.parse(json);
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};
