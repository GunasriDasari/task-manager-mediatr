import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  actionLoadingId,
  isSubmitting,
  viewMode,
  expandedTaskIds,
  onToggleExpand,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div
      className={viewMode === "grid" ? "task-list grid-view" : "task-list list-view"}
    >
      {tasks.map((task, index) => {
        const taskNumber = index + 1;
        const isTaskLoading = actionLoadingId === task.id;
        const isExpanded = expandedTaskIds.includes(task.id);

        return (
          <TaskCard
            key={task.id}
            task={task}
            taskNumber={taskNumber}
            isExpanded={isExpanded}
            isTaskLoading={isTaskLoading}
            isSubmitting={isSubmitting}
            viewMode={viewMode}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default TaskList;