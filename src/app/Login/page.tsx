"use client"

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background: #274c4b;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const LinkText = styled.div`
  align-self: flex-end;
  margin: 20px 10px 0 0;
  font-size: 14px; 
  color: #5A5A5A;
`;

const Login: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/data-statistics');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Image src="/img/text-logo-green.svg" alt='logo image' width={230} height={100}/>
        <Input type="email" placeholder="이메일" required />
        <Input type="password" placeholder="비밀번호" required />
        <Button type="submit">로그인</Button>
        <LinkText>
          <Link href="/sign-up">회원가입</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Login;
