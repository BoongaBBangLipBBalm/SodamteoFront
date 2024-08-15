"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 

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

const Signup: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/user/register', {
        Email: email,
        userName: userName,
        password: password,
      });

      if (response.status === 200) {
        router.push('/login');
        alert('회원가입에 성공하였습니다!');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    } catch (err) {
      alert('서버 오류가 발생하였습니다. 관리자에게 문의 바랍니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <FormTitle>이메일</FormTitle>
        <Input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <FormTitle>이름</FormTitle>
        <Input 
          type="text" 
          placeholder="이름" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        <FormTitle>비밀번호</FormTitle>
        <Input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? '회원가입 중...' : '회원가입'}
        </Button>
        <LinkText>
          <Link href="/login">로그인</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Signup;
