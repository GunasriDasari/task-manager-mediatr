function TaskControls({
  search,
  status,
  sortBy,
  viewMode,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onViewChange,
  onReset,
}) {
  return (
    <section className="controls-panel">
      <div className="controls-panel-top">
        <div>
          <h3 className="section-title">Search, Filter and Sort</h3>
          <p className="section-subtitle">
            Quickly find tasks and switch between layouts.
          </p>
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={viewMode === "grid" ? "view-btn active-view" : "view-btn"}
            onClick={() => onViewChange("grid")}
          >
            Grid View
          </button>

          <button
            type="button"
            className={viewMode === "list" ? "view-btn active-view" : "view-btn"}
            onClick={() => onViewChange("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={onSearchChange}
          className="control-input"
        />

        <select
          value={status}
          onChange={onStatusChange}
          className="control-input"
        >
          <option value="">All Tasks</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={onSortChange}
          className="control-input"
        >
          <option value="">Default Sort</option>
          <option value="title">Title A-Z</option>
          <option value="title_desc">Title Z-A</option>
          <option value="status">Status</option>
          <option value="status_desc">Status Desc</option>
        </select>

        <button className="reset-btn" onClick={onReset} type="button">
          Reset
        </button>
      </div>
    </section>
  );
}

export default TaskControls;