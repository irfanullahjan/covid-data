export function MetaInfo({ meta }: any) {
  return (
    <div className="my-3">
      <small className="text-muted">
        Created by {meta.createdByUser.email} on{" "}
        {new Date(meta.createdAt).toLocaleString()}
      </small>
      <br />
      <small className="text-muted">
        Last updated by {meta.updatedByUser.email} on{" "}
        {new Date(meta.updatedAt).toLocaleString()}
      </small>
    </div>
  );
}
