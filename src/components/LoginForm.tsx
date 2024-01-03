import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface LoginFormProps {
  onSubmit: (data: {name: string; email: string}) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default LoginForm;
