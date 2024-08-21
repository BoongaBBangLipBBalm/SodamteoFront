"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 30px;
`;

const FormTitle = styled.span`
  align-self: flex-start;
  padding: 5px;
  font-size: 15px;
  color: #333;
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

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // 에러 초기화

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        router.push('/profile/select');
      } else if (response.status === 400) {
        setError('이메일과 비밀번호를 확인해주세요.');
      } else {
        setError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <FormTitle>이메일</FormTitle>
        <Input 
          type="email" 
          placeholder="이메일" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormTitle>비밀번호</FormTitle>
        <Input 
          type="password" 
          placeholder="비밀번호" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
        {error && <ErrorText>{error}</ErrorText>}
        <LinkText>
          <Link href="/sign-up">회원가입</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Login;
