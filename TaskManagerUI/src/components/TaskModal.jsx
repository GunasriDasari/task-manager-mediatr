function TaskModal({
  isOpen,
  modalMode,
  isSubmitting,
  formTitle,
  formDescription,
  formIsCompleted,
  onClose,
  onSubmit,
  setFormTitle,
  setFormDescription,
  setFormIsCompleted,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{modalMode === "edit" ? "Edit Task" : "Add New Task"}</h2>
            <p className="modal-subtitle">
              {modalMode === "edit"
                ? "Update the task details below."
                : "Fill in the details to create a new task."}
            </p>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            type="button"
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <div className="field-group">
            <label className="field-label">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Description</label>
            <textarea
              placeholder="Enter task description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formIsCompleted}
              onChange={(e) => setFormIsCompleted(e.target.checked)}
            />
            Mark as completed
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={isSubmitting}>
              {isSubmitting
                ? modalMode === "edit"
                  ? "Saving..."
                  : "Adding..."
                : modalMode === "edit"
                ? "Save Changes"
                : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;