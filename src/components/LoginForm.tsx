import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface LoginFormProps {
  onSubmit: (data: {name: string; email: string}) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [name, setName] = useState<string>('demo');
  const [email, setEmail] = useState<string>('demo@fetchrewards.com');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit({name, email});
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={10} sm={10} md={10} lg={10} xl={10} className="justify-content-md-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-2 btn-lg"
              style={{ backgroundColor: "#2f0c38", color: '#f8a619' }}
            >
              Login
            </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default LoginForm;
