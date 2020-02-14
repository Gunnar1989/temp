import React, { useState } from "react";
import useAuth from "../../auth/use-auth";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../util/Routing";

export default function Login() {
  const { isLoading, signin } = useAuth();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="box" onSubmit={e => e.preventDefault() && false}>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control has-icons-left">
          <input
            id="email"
            name="email"
            type="email"
            label="Email"
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <span className="icon is-small is-left">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input
            id="password"
            name="password"
            type="password"
            label="Password"
            className="input"
            htmlFor="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className="icon is-small is-left">
            <i className="fa fa-lock"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="checkbox">
          <input type="checkbox" />
          Remember me
        </label>
      </div>
      <div className="field">
        <button
          type="submit"
          className="button is-light"
          disabled={isLoading}
          onClick={() => {
            signin(email, password);
            if (isLoading) {
              setTimeout(() => {
                console.log("logging in...");
              }, 1000);
            }
            history.replace(ROUTES.HOME.PATH);
          }}
        >
          {isLoading ? "Signing up..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
