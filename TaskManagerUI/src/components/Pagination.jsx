function Pagination({ pageNumber, totalPages, onPrevious, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={pageNumber === 1}>
        Previous
      </button>

      <span>
        Page {pageNumber} of {totalPages}
      </span>

      <button onClick={onNext} disabled={pageNumber === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;