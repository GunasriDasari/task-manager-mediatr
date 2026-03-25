export const getCompletedCount = (tasks) => {
  return tasks.filter((task) => task.isCompleted).length;
};

export const getPendingCount = (tasks) => {
  return tasks.filter((task) => !task.isCompleted).length;
};

export const createTaskPayload = (title, description, isCompleted) => {
  return {
    title: title.trim(),
    description: description.trim(),
    isCompleted,
  };
};

export const isTaskFormValid = (title, description) => {
  return title.trim() !== "" && description.trim() !== "";
};