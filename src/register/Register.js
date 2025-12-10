import { useState } from "react";
import { Flex, Box, Text, Input, Button } from "@chakra-ui/react"

const Register = () => {

  const [email, setEmail] = useState("")
  const [isEmailCorrect, setCorrectEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordConfirmed, setPasswordConfirmed] = useState(true) 

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const submitData = (e) => {

    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setCorrectEmail(true)
    }
    else {
      setCorrectEmail(false)

    }

    if (password === confirmPassword) {
        setPasswordConfirmed(true)
    }
    else {
        setPasswordConfirmed(false)
    }

  }

  return (
    <Flex
      h = "100vh"
      w = "100wh"
      justify = "center"
      align = "center"
      bg = "rgb(240, 240, 240)"
    >
      <Flex 
        h = "50%"
        w = "30%"
        p = {4}
        flexDirection = "column"
      >

        <Box 
          h = "8vh"
          display = "flex" 
          justifyContent = "center"
        >

          <Text 
            fontSize = {24}
            color = "rgb(40, 40, 40)"
            justify = "center"
            align = "center"
          >
            Register
          </Text>

        </Box>

        <Flex
          h = "12vh"
          justify = "flex-start"
          align = "start"
          flexDirection = "column"
        >

          <Text
            fontSize = {12}
            color = {isEmailCorrect? "rgb(4, 120, 87)": "rgb(232, 52, 52)"}
            justify = "flex-start"
            align = "start"
            p = {2}
          >
            {isEmailCorrect? "Email": "Incorrect email"}
          </Text>

          <Input
            type = "email"
            value = {email}
            onChange = {changeEmail}
            placeholder = "Print your email"  
            size = "sm"
            borderColor = {isEmailCorrect? "rgb(220, 220, 220)": "rgb(232, 52, 52)"}
            shadow = {4}
            _focus = {{
              bg: "rgb(240, 240, 240)",
              borderColor: isEmailCorrect? "rgb(200, 200, 200)": "rgb(232, 52, 52)"}}/>

        </Flex>

        <Flex
          h = "10vh"
          justify = "flex-start"
          align = "start"
          flexDirection = "column"
        >

          <Text
            fontSize = {12}
            color = "rgb(4, 120, 87)"
            justify = "flex-start"
            align = "start"
            p = {2}
          >
            Password
          </Text>

          <Input
            type = "password"
            value = {password}
            onChange = {changePassword}
            placeholder = "Print your password"  
            size = "sm"
            borderColor = {isPasswordConfirmed? "rgb(220, 220, 220)": "rgb(232, 52, 52)"}
            shadow={4}
            _focus = {{
              bg: "rgb(240, 240, 240)",
              borderColor: isPasswordConfirmed? "rgb(220, 220, 220)": "rgb(232, 52, 52)"}}/>

        </Flex>

        <Flex
          h = "10vh"
          justify = "flex-start"
          align = "start"
          flexDirection = "column"
        >
            
          <Text
            fontSize = {12}
            color = "rgb(4, 120, 87)"
            justify = "flex-start"
            align = "start"
            p = {2}
          >
            Confirm password
          </Text>

          <Input
            type = "password"
            value = {confirmPassword}
            onChange = {changeConfirmPassword}
            placeholder = "Confirm your password"  
            size = "sm"
            borderColor = {isPasswordConfirmed? "rgb(220, 220, 220)": "rgb(232, 52, 52)"}
            shadow={4}
            _focus = {{
              bg: "rgb(240, 240, 240)",
              borderColor: isPasswordConfirmed? "rgb(220, 220, 220)": "rgb(232, 52, 52)"}}/>

        </Flex>

        <Button
          bg = "rgb(4, 120, 87)"
          _hover = {{ bg: "rgb(24, 140, 107)" }}
          marginTop = {8}
          onClick = {
            submitData
          }
        >
          Create account
        </Button>

      </Flex>
    </Flex>
  );
}

export default Register;
