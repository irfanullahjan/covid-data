"use client";

import { Spinner } from "reactstrap";

export function LoadingFullScreen() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
}
