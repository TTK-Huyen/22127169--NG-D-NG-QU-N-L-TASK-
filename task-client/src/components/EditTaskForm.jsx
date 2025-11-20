// src/components/EditTaskForm.jsx
function EditTaskForm({
  visible,
  title,
  dueDate,
  onTitleChange,
  onDueDateChange,
  onSubmit,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <form className="form-row" onSubmit={onSubmit}>
      <input
        className="input-text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <input
        className="input-date"
        type="date"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
      />
      <button className="btn-save" type="submit">
        Save
      </button>
      <button className="btn-cancel" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditTaskForm;
