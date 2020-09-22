export const saveData = (key, data) => {
  if (data === null || data === undefined) return;
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const loadData = (key) => {
  const json = localStorage.getItem(key);
  if (!json) return null;
  const data = JSON.parse(json);
  if (!data) return null;
  return data;
};
