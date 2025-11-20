// src/components/FilterBar.jsx
function FilterBar({ statusFilter, onFilterChange, loading }) {
  return (
    <div className="form-row" style={{ justifyContent: "space-between" }}>
      <select
        className="input-date"
        style={{ width: "120px" }}
        value={statusFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        <option value="Đang làm">Đang làm</option>
        <option value="Hoàn thành">Hoàn thành</option>
      </select>

      {loading && <span style={{ fontSize: 13 }}>Đang tải...</span>}
    </div>
  );
}

export default FilterBar;
