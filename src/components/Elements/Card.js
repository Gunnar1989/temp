import React from "react";
import { Link } from "react-router-dom";

export default function Card({ path, img, title, type }) {
  return (
    <div className="column is-one-quarter">
      <Link to={path}>
        <article className="tile has-background-primary is-child box">
          <h1 className="title has-text-centered has-text-white-ter">
            {title}
          </h1>
          <figure className="image is-4by3">
            <img alt="Profile" loading="lazy" src={img}></img>
          </figure>
          <hr />
          <p className="subtitle has-text-centered has-text-white-ter">
            {type}
          </p>
        </article>
      </Link>
    </div>
  );
}
