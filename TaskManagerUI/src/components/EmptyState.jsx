function EmptyState({ onReset, onCreate }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      <h3>No tasks found</h3>
      <p>
        No tasks match your current search, filter, or sort settings. You can
        clear the filters or create a new task.
      </p>

      <div className="empty-actions">
        <button className="empty-reset-btn secondary-empty-btn" onClick={onReset} type="button">
          Clear Filters
        </button>

        <button className="empty-reset-btn" onClick={onCreate} type="button">
          Add New Task
        </button>
      </div>
    </div>
  );
}

export default EmptyState;