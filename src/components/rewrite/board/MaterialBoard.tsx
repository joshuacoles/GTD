import React from "react";

import './Material.css'

export default function MaterialBoard({ children }) {
  return (
    <div className="card-scene">
      {children}
    </div>
  );
}
