import "./Card.css";
import React from "react";
import { FiStar } from "react-icons/fi";

export default function Card({ title, imageurl, body, star }) {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imageurl} width="425" height="300" alt="" />
      </div>

      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <p> {body} </p>
        </div>
      </div>
      <div className="btn">
        <button>
          <a>
            {star === 1 && <FiStar color="ffff00" size={36} />}
            {star === 2 && (
              <>
                <FiStar color="ffff00" size={36} />{" "}
                <FiStar color="ffff00" size={36} />{" "}
              </>
            )}
            {star === 3 && (
              <>
                <FiStar color="ffff00" size={36} />{" "}
                <FiStar color="ffff00" size={36} />{" "}
                <FiStar color="ffff00" size={36} />{" "}
              </>
            )}
          </a>
        </button>
      </div>
    </div>
  );
}
