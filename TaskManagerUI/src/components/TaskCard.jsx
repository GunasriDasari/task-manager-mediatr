function TaskCard({
  task,
  taskNumber,
  isExpanded,
  isTaskLoading,
  isSubmitting,
  viewMode,
  onToggleExpand,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const previewDescription =
    task.description.length > 95
      ? `${task.description.slice(0, 95)}...`
      : task.description;

  return (
    <article className={viewMode === "list" ? "task-card list-card" : "task-card"}>
      <div className="task-card-top">
        <span className="task-number">#{taskNumber}</span>
        <span className={task.isCompleted ? "status completed" : "status pending"}>
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-preview">
        <div className="task-preview-left">
          <div className="task-title-block">
            <h2 className="task-title">{task.title}</h2>
            {!isExpanded && (
              <p className="task-description-preview">{previewDescription}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="expand-btn"
          onClick={() => onToggleExpand(task.id)}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
      </div>

      {isExpanded && (
        <div className="task-details">
          <p className="task-description">{task.description}</p>

          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(task)}
              disabled={isTaskLoading || isSubmitting}
              type="button"
            >
              Edit
            </button>

            <button
              className="toggle-btn"
              onClick={() => onToggleStatus(task)}
              disabled={isTaskLoading}
              type="button"
            >
              {isTaskLoading
                ? "Updating..."
                : task.isCompleted
                ? "Mark Pending"
                : "Mark Completed"}
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              disabled={isTaskLoading}
              type="button"
            >
              {isTaskLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default TaskCard;