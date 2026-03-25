function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  isLoading,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-box confirm-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close-btn"
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            ×
          </button>
        </div>

        <p className="confirm-message">{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;