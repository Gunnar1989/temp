import React from "react";
import useAuth from "../../auth/use-auth";

export default function Signup() {
  const { isLoading, signup } = useAuth();

  return (
    <form onSubmit={signup}>
      <label htmlFor="email" />
      <input />
      <label htmlFor="password" />
      <input />
      <button disabled={isLoading} type="submit">
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
