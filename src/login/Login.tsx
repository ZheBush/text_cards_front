import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Text, Input, Link, Button } from "@chakra-ui/react";
import { useAuth } from "../AuthContext.tsx";
import { AuthResponse } from "../types/index.ts";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailCorrect, setCorrectEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
      
      const data: AuthResponse = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_type', data.token_type);
      login({
        email,
        token: data.access_token,
        tokenType: data.token_type,
        role: data.role,
        id: data.user_id
      });
      
      navigate("/home");
      
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const submitData = async (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      setCorrectEmail(true);
      await handleLogin(email, password);
    } else {
      setCorrectEmail(false);
    }
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      bg="rgb(240, 240, 240)"
    >
      <Flex
        h="55%"
        w="30%"
        p={4}
        flexDirection="column"
      >
        <Box
          h="8vh"
          display="flex"
          justifyContent="center"
        >
          <Text
            fontSize={24}
            color="rgb(40, 40, 40)"
            textAlign="center"
          >
            Welcome
          </Text>
        </Box>
        
        <Flex
          h="12vh"
          justify="flex-start"
          align="start"
          flexDirection="column"
        >
          <Text
            fontSize={12}
            color={isEmailCorrect ? "rgb(4, 120, 87)" : "rgb(232, 52, 52)"}
            textAlign="start"
            p={2}
          >
            {isEmailCorrect ? "Email" : "Incorrect email"}
          </Text>
          <Input
            type="email"
            value={email}
            onChange={changeEmail}
            placeholder="Print your email"
            size="sm"
            borderColor={isEmailCorrect ? "rgb(220, 220, 220)" : "rgb(232, 52, 52)"}
            shadow="4"
            _autofill={{
              bg: "white",
              borderColor: "rgb(220, 220, 220)",
              boxShadow: "0 0 0px 1000px rgb(240, 240, 240) inset",
            }}
            _focus={{
              bg: "rgb(240, 240, 240)",
              borderColor: isEmailCorrect ? "rgb(200, 200, 200)" : "rgb(232, 52, 52)"
            }}
          />
        </Flex>
        
        <Flex
          h="10vh"
          justify="flex-start"
          align="start"
          flexDirection="column"
        >
          <Flex
            w="100%"
            flexDirection="row"
          >
            <Text
              fontSize={12}
              color="rgb(4, 120, 87)"
              textAlign="start"
              p={2}
            >
              Password
            </Text>
            <Link
              fontSize={12}
              color="rgb(4, 120, 87)"
              p={2}
              ml="auto"
            >
              I forgot password
            </Link>
          </Flex>
          <Input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder="Print your password"
            size="sm"
            borderColor="rgb(220, 220, 220)"
            shadow="4"
            _autofill={{
              bg: "white",
              borderColor: "rgb(220, 220, 220)",
              boxShadow: "0 0 0px 1000px rgb(240, 240, 240) inset",
            }}
            _focus={{
              bg: "rgb(240, 240, 240)",
              borderColor: "rgb(200, 200, 200)"
            }}
          />
        </Flex>
        
        <Button
          bg="rgb(4, 120, 87)"
          _hover={{ bg: "rgb(24, 140, 107)" }}
          marginTop={8}
          onClick={submitData}
        >
          Log in
        </Button>
        
        <Flex
          w="100%"
          flexDirection="row"
          justify="center"
          align="center"
          marginTop={4}
        >
          <Text
            color="rgb(100, 100, 100)"
            fontSize={12}
          >
            No Account?
          </Text>
          <Link
            color="rgb(4, 120, 87)"
            fontSize={12}
            marginStart={1}
            href="/register"
          >
            Register
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;