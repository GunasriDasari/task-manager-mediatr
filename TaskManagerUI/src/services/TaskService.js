const baseUrl = "https://localhost:7033/api/tasks";

export const getTasks = async ({ search = "", status = "", sortBy = "" }) => {
  let url = `${baseUrl}?pageNumber=1&pageSize=1000`;

  if (search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }

  if (status !== "") {
    url += `&isCompleted=${status}`;
  }

  if (sortBy) {
    url += `&sortBy=${encodeURIComponent(sortBy)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json().catch(() => null);
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json().catch(() => null);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return true;
};