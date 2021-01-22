import React, { useRef } from "react";
import { Button, Card, Form, Alert, FormControl } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login!(emailRef.current!.value, passwordRef.current!.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <div className="w-100 d-flex justify-content-center">
      <div style={{ minWidth: "300px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Enter email"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="Enter Password"
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
