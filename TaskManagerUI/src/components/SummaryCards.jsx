function SummaryCards({ totalCount, completedCount, pendingCount }) {
  return (
    <section className="summary-cards">
      <div className="summary-card total-card">
        <p className="summary-label">Total Tasks</p>
        <h2 className="summary-value">{totalCount}</h2>
        <span className="summary-note">Based on current filters</span>
      </div>

      <div className="summary-card completed-card">
        <p className="summary-label">Completed</p>
        <h2 className="summary-value">{completedCount}</h2>
        <span className="summary-note">Visible in current results</span>
      </div>

      <div className="summary-card pending-card">
        <p className="summary-label">Pending</p>
        <h2 className="summary-value">{pendingCount}</h2>
        <span className="summary-note">Visible in current results</span>
      </div>
    </section>
  );
}

export default SummaryCards;