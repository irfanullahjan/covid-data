export function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center rounded"
      style={{ minHeight: "100px", backgroundColor: "rgba(0,0,0,0.1)" }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
