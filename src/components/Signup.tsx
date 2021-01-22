import React, { useRef } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordconfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordRef.current!.value !== passwordconfirmRef.current!.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup!(emailRef.current!.value, passwordRef.current!.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="w-100 d-flex justify-content-center">
      <div style={{ minWidth: "300px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign up</h2>
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
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password-confirm"
                  ref={passwordconfirmRef}
                  placeholder="Confirm Password"
                  required
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
