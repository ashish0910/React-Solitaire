import React from "react";
import { Link } from "react-router-dom";
import "./Back.css";

function Back() {
  return (
    <div>
      <Link to={"/"}>
        <button className="back">
          <i class="fas fa-long-arrow-alt-left"></i> Menu
        </button>
      </Link>
    </div>
  );
}

export default Back;
