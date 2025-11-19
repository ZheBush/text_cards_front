import { useState } from "react";
import { Flex, Box, Text, Input, Link, Button } from "@chakra-ui/react"

const Auth = () => {

  const [email, setEmail] = useState("")
  const [isEmailCorrect, setCorrectEmail] = useState(true)
  const [password, setPassword] = useState("")

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
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
  }

  return (
    <Flex
      h = "100vh"
      w = "100vw"
      justify = "center"
      align = "center"
      bg = "rgb(240, 240, 240)"
    >
      <Flex 
        h = "55%"
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
            Welcome
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
          <Flex
            w = "100%"
            flexDirection = "row"
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

            <Link
              fontSize = {12}
              color = "rgb(4, 120, 87)"
              p = {2}
              ml = "auto"
            >
              I forgot password
            </Link>

          </Flex>

          <Input
            type = "password"
            value = {password}
            onChange = {changePassword}
            placeholder = "Print your password"  
            size = "sm"
            borderColor = "rgb(220, 220, 220)"
            shadow={4}
            _focus = {{
              bg: "rgb(240, 240, 240)",
              borderColor: "rgb(200, 200, 200)"}}/>

        </Flex>

        <Button
          bg = "rgb(4, 120, 87)"
          _hover = {{ bg: "rgb(24, 140, 107)" }}
          marginTop = {8}
          onClick = {
            submitData
          }
        >
          Log in
        </Button>

        <Flex
          w = "100%"
          flexDirection = "row"
          justify = "center"
          align = "center"
          marginTop = {4}
        >

          <Text
            color = "rgb(100, 100, 100)"
            fontSize = {12}
          >
            No Account? 
          </Text>
          <Link
            color = "rgb(4, 120, 87)"
            fontSize = {12}
            marginStart = {1}
            href = "/register"
          >
            Register
          </Link>

        </Flex>

      </Flex>
    </Flex>
  );
}

export default Auth;
