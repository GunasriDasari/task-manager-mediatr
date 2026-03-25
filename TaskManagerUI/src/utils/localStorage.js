export const STORAGE_KEYS = {
  search: "taskSearch",
  status: "taskStatus",
  sortBy: "taskSortBy",
  viewMode: "taskViewMode",
};

export const getStoredValue = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ?? defaultValue;
};

export const setStoredValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const clearTaskFilterStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.search);
  localStorage.removeItem(STORAGE_KEYS.status);
  localStorage.removeItem(STORAGE_KEYS.sortBy);
  localStorage.removeItem(STORAGE_KEYS.viewMode);
};