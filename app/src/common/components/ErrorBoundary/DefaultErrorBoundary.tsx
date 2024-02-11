import React from "react";
import { Link } from "react-router-dom";

export const DefaultErrorBoundary: React.FC = () => (
  <div className="page">
    <div className="w-full h-full flex flex-col justify-center items-center gap-sm text-center">
      <div>
        <h1>Whoops!</h1>
        <h2>Something went wrong!</h2>
      </div>
      <Link className="btn primary" to="/">
        Go back home
      </Link>
    </div>
  </div>
);
