import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ##22254b;
  color: white;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: none;
  border-radius: 25px;
  background-color: white;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const LinkContainer = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

const Link = styled.a`
  color: white;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
      });
    
      const [errors, setErrors] = useState({});
      const [isFormValid, setIsFormValid] = useState(false);
    
      useEffect(() => {
        const validationErrors = validate();
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
      }, [formValues]);
    
      const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
      const validate = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = '이름을 입력해주세요!';
        if (!formValues.email) {
          newErrors.email = '이메일을 입력해주세요!';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
          newErrors.email = '이메일 형식에 맞게 다시 입력해주세요!';
        }
        if (!formValues.age) {
          newErrors.age = '나이를 입력해주세요!';
        } else if (isNaN(formValues.age)) {
          newErrors.age = '나이는 숫자로 입력해주세요!';
        } else if (formValues.age <= 0) {
          newErrors.age = '나이는 양수여야 합니다.!';
        } else if (!Number.isInteger(Number(formValues.age))) {
          newErrors.age = '나이를 실수로 입력할 수 없습니다.';
        } else if (formValues.age < 19) {
          newErrors.age = '19세 이상만 사용 가능합니다!';
        }
        if (!formValues.password) {
          newErrors.password = '비밀번호를 입력해주세요!';
        } else if (formValues.password.length < 4) {
          newErrors.password = '최소 4자리 이상 입력해주세요.';
        } else if (formValues.password.length > 12) {
          newErrors.password = '최대 12자리까지 가능합니다!';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formValues.password)) {
          newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.';
        }
        if (!formValues.confirmPassword) {
          newErrors.confirmPassword = '비밀번호를 다시 입력해주세요!';
        } else if (formValues.confirmPassword !== formValues.password) {
          newErrors.confirmPassword = '비밀번호가 일치하지 않습니다!';
        }
        return newErrors;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
          console.log('Form submitted successfully', formValues);
        } else {
          setErrors(validationErrors);
        }
      };
    
      return (
        <PageContainer>
          <Title>회원가입 페이지</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              value={formValues.name}
              onChange={handleChanges}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
    
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formValues.email}
              onChange={handleChanges}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    
            <Input
              type="number"
              name="age"
              placeholder="나이를 입력해주세요"
              value={formValues.age}
              onChange={handleChanges}
            />
            {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
    
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={formValues.password}
              onChange={handleChanges}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
    
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
    
            <Button type="submit" disabled={!isFormValid}>제출하기</Button>
          </Form>
        </PageContainer>
      );
}
