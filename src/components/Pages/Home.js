import React from "react";
import Login from "../Elements/Login";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="tile is-vertical is-4">
            <div className="title has-text-primary	">
              Welcome To Vitasim Portal
            </div>
            <div className="subtitle has-text-primary">What?</div>
            <Login />
          </div>
        </div>
      </div>
    </section>
  );
}
