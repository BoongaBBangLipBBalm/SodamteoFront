"use client"
import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background: #274c4b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const LinkText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
`;

const Signup = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input type="text" placeholder="Name" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit">Sign Up</Button>
        <LinkText>
          Already have an account? <Link to="/">Login</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Signup;
