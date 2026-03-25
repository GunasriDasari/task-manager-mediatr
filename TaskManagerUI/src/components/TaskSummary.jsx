function TaskSummary({ totalCount, startItem, endItem }) {
  return (
    <div className="task-summary">
      <p className="count-text">Total Tasks: {totalCount}</p>
      <p className="range-text">
        Showing {startItem} - {endItem} of {totalCount}
      </p>
    </div>
  );
}

export default TaskSummary;