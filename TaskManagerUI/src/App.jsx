import { useEffect, useMemo, useState } from "react";

import "./styles/global.css";
import "./styles/hero.css";
import "./styles/alerts.css";
import "./styles/summary.css";
import "./styles/controls.css";
import "./styles/taskSummary.css";
import "./styles/emptyState.css";
import "./styles/taskList.css";
import "./styles/taskCard.css";
import "./styles/modal.css";

import SummaryCards from "./components/SummaryCards";
import TaskControls from "./components/TaskControls";
import TaskSummary from "./components/TaskSummary";
import EmptyState from "./components/EmptyState";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import ConfirmModal from "./components/ConfirmModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

import {
  STORAGE_KEYS,
  getStoredValue,
  setStoredValue,
  clearTaskFilterStorage,
} from "./utils/localStorage";

import {
  getCompletedCount,
  getPendingCount,
  createTaskPayload,
  isTaskFormValid,
} from "./utils/taskHelpers";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [search, setSearch] = useState(() =>
    getStoredValue(STORAGE_KEYS.search, "")
  );
  const [status, setStatus] = useState(() =>
    getStoredValue(STORAGE_KEYS.status, "")
  );
  const [sortBy, setSortBy] = useState(() =>
    getStoredValue(STORAGE_KEYS.sortBy, "")
  );
  const [viewMode, setViewMode] = useState(() =>
    getStoredValue(STORAGE_KEYS.viewMode, "grid")
  );

  const [totalCount, setTotalCount] = useState(0);
  const [expandedTaskIds, setExpandedTaskIds] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.search, search);
  }, [search]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.status, status);
  }, [status]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.sortBy, sortBy);
  }, [sortBy]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.viewMode, viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (!successMessage && !actionError) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
      setActionError("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [successMessage, actionError]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks({
        search,
        status,
        sortBy,
      });

      setTasks(data.data || []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Could not load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search, status, sortBy]);

  const completedCount = useMemo(() => getCompletedCount(tasks), [tasks]);
  const pendingCount = useMemo(() => getPendingCount(tasks), [tasks]);

  const resetForm = () => {
    setEditingTaskId(null);
    setFormTitle("");
    setFormDescription("");
    setFormIsCompleted(false);
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setActionError("");
  };

  const openCreateModal = () => {
    clearMessages();
    setModalMode("create");
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    clearMessages();
    setModalMode("edit");
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormIsCompleted(task.isCompleted);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    resetForm();
  };

  const openDeleteModal = (taskId) => {
    clearMessages();
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (actionLoadingId) return;

    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleResetControls = () => {
    setSearch("");
    setStatus("");
    setSortBy("");
    setViewMode("grid");
    setExpandedTaskIds([]);
    clearMessages();
    clearTaskFilterStorage();
  };

  const handleToggleExpand = (taskId) => {
    setExpandedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!isTaskFormValid(formTitle, formDescription)) {
      setActionError("Title and description are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const taskPayload = createTaskPayload(
        formTitle,
        formDescription,
        formIsCompleted
      );

      if (modalMode === "edit") {
        await updateTask(editingTaskId, taskPayload);
        setSuccessMessage("Task updated successfully.");
      } else {
        await createTask(taskPayload);
        setSuccessMessage("Task created successfully.");
      }

      closeModal();
      await loadTasks();
    } catch (err) {
      console.error("Error submitting task:", err);
      setActionError(
        modalMode === "edit"
          ? "Could not update task."
          : "Could not create task."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    clearMessages();

    try {
      setActionLoadingId(taskToDelete);

      await deleteTask(taskToDelete);
      setSuccessMessage("Task deleted successfully.");

      setExpandedTaskIds((prev) =>
        prev.filter((taskId) => taskId !== taskToDelete)
      );

      closeDeleteModal();
      await loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setActionError("Could not delete task.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleStatus = async (task) => {
    clearMessages();

    try {
      setActionLoadingId(task.id);

      const updatedTaskPayload = {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
      };

      await updateTask(task.id, updatedTaskPayload);
      setSuccessMessage("Task status updated successfully.");

      await loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      setActionError("Could not update task status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-tag">Task Dashboard</p>
            <h1 className="title">Task Manager</h1>
            <p className="subtitle">
              Create, manage, and track your tasks in one place.
            </p>
          </div>

          <div className="hero-actions">
            <button className="open-modal-btn" onClick={openCreateModal}>
              + Add New Task
            </button>
          </div>
        </section>

        {(successMessage || actionError) && (
          <div className="alerts-stack">
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {actionError && (
              <div className="alert alert-error">{actionError}</div>
            )}
          </div>
        )}

        <SummaryCards
          totalCount={totalCount}
          completedCount={completedCount}
          pendingCount={pendingCount}
        />

        <TaskControls
          search={search}
          status={status}
          sortBy={sortBy}
          viewMode={viewMode}
          onSearchChange={(e) => setSearch(e.target.value)}
          onStatusChange={(e) => setStatus(e.target.value)}
          onSortChange={(e) => setSortBy(e.target.value)}
          onViewChange={setViewMode}
          onReset={handleResetControls}
        />

        <TaskSummary
          totalCount={totalCount}
          startItem={tasks.length === 0 ? 0 : 1}
          endItem={tasks.length}
        />

        {loading ? (
          <div className="state-card">
            <p className="message">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="state-card">
            <p className="message error">{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState onReset={handleResetControls} onCreate={openCreateModal} />
        ) : (
          <TaskList
            tasks={tasks}
            actionLoadingId={actionLoadingId}
            isSubmitting={isSubmitting}
            viewMode={viewMode}
            expandedTaskIds={expandedTaskIds}
            onToggleExpand={handleToggleExpand}
            onEdit={openEditModal}
            onToggleStatus={handleToggleStatus}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        modalMode={modalMode}
        isSubmitting={isSubmitting}
        formTitle={formTitle}
        formDescription={formDescription}
        formIsCompleted={formIsCompleted}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
        setFormTitle={setFormTitle}
        setFormDescription={setFormDescription}
        setFormIsCompleted={setFormIsCompleted}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText={actionLoadingId ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        isLoading={Boolean(actionLoadingId)}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}

export default App;