import React from "react";

function Error({ error }) {
  return (
    <div className="Error">
      <h2>Error</h2>
      <p>{error?.message || "An unknown error occurred"}</p>
    </div>
  );
}

export default Error;
