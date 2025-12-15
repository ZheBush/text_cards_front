import { useState, useRef } from "react";
import { Flex, Box, Text, Link, Input, HStack, Button, Textarea } from "@chakra-ui/react"
import Keyboard from "./icons/Keyboard";
import FileTxt from "./icons/FileTxt"
import FilePdf from "./icons/FilePdf"

const Home = (props) => {

    const {user} = props

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const txtFile = useRef(null)
    const pdfFile = useRef(null)
    
    const changeTitle = (e) => {
      setTitle(e.target.value)
    }
    const changeText = (e) => {
        setText(e.target.value)
    }

    const handleTxtFileClick = () => {
        txtFile.current?.click()
    }
    const handlePdfFileClick = () => {
        pdfFile.current?.click()
    }

    const handleTxtFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log(file.name)
        }
    }
    const handlePdfFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log(file.name)
        }
    }

    return (
    <Flex
        minH = "100vh"
        w = "100%"
        bg = "rgb(240, 240, 240)"
        flexDirection = "column"
    >
        <Flex
            h = "6vh"
            w = "100%"
            justify = "center"
            align = "center" 
        >
            <Flex
                h = "100%"
                w = "60%"
            >
                <Link
                    fontSize = {16}
                    color = "rgb(4, 120, 87)"
                    p = {2}
                    href = "/login"
                >
                    { user === null ? "Log in" : "Log out" }
                </Link>
                <Link
                    fontSize = {16}
                    color = "rgb(4, 120, 87)"
                    p = {2}   
                    ml = "auto"
                    href = "/history"
                >
                    To history
                </Link>
            </Flex>
        </Flex>
        <Flex
            h = "100%"
            w = "100%"
            bg = "rgb(240, 240, 240)"
            flexDirection = "column"
            justify = "center"
            align = "center" 
        >
            <Flex
                h = "20%"
                w = "40%"
                bg = "rgb(240, 240, 240)"
                justify = "center"
                align = "center" 
                marginTop = "12"
                flexDirection = "column"
            >
                <Text
                    fontSize = {24}
                    color = "rgb(40, 40, 40)"

                >
                    Enter the title of the cards
                </Text>
                <Input
                    value = {title}
                    onChange = {changeTitle}
                    size = "sm"
                    placeholder = "Title"
                    borderColor = "rgb(220, 220, 220)"
                    shadow = {4}
                    marginTop = "6"
                    _focus = {{
                      bg: "rgb(240, 240, 240)",
                      borderColor: "rgb(200, 200, 200)"}}/>
            </Flex>
            <Flex
                h = "100%"
                w = "100%"
                bg = "rgb(240, 240, 240)"
                justify = "center"
                align = "center" 
                flexDirection = "column"
                marginTop = "10"
            >
                <Text
                    fontSize = {24}
                    color = "rgb(40, 40, 40)"

                >
                    Choose the download option
                </Text>
                <Text
                    fontSize = {14}
                    color = "rgb(100, 100, 100)"
                    marginTop = "2"
                >
                    Enter the text or load file (.txt or .pdf) to get the cards
                </Text>
                <HStack
                    h = "100%"
                    w = "100%"
                    bg = "rgb(240, 240, 240)"
                    justify = "center"
                    align = "center" 
                    spaceX = {8}
                    marginTop = {14}
                >
                    <Flex
                        h = "42vh"
                        w = "16vw"
                        bg = "rgb(240, 240, 240)"
                        shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
                        borderRadius = {16}
                        align = "center" 
                        flexDirection = "column"
                        paddingTop = "4"
                    >
                        <Keyboard/>
                        <Textarea
                            h = "55%"
                            w = "80%"
                            value = {text}
                            onChange = {changeText}
                            marginTop = "4"
                            placeholder = "Enter your text here"
                            alignContent = "center"
                            textAlign = "center"
                            whiteSpace = "pre-wrap"
                        >
                        </Textarea>
                        <Button
                            h = "12%"
                            w = "80%"
                            bg = "rgb(4, 120, 87)"
                            marginTop = "4"
                        >
                            Create
                        </Button>
                    </Flex>
                    <Flex
                        h = "42vh"
                        w = "16vw"
                        bg = "rgb(240, 240, 240)"
                        shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
                        borderRadius = {16}
                        align = "center" 
                        flexDirection = "column"
                        paddingTop = "4"
                    >
                        <Input
                            type="file"
                            ref={txtFile}
                            onChange={handleTxtFileChange}
                            accept=".txt"
                            display="none" 
                        />
                        <Input
                            type="file"
                            ref={pdfFile}
                            onChange={handlePdfFileChange}
                            accept=".pdf"
                            display="none"
                        />
                        <FileTxt/>
                        <Button
                            h = "55%"
                            w = "80%"
                            mt = {4}
                            onClick = {handleTxtFileClick}
                            colorScheme = "rgb(4, 120, 87)"
                            variant = "outline"
                            _hover = {{
                              borderColor: "rgb(4, 120, 87)"
                            }}
                        >
                            <Text 
                                textAlign = "center"
                                color = "rgb(114, 114, 114)"
                                fontWeight = {400}
                            >
                                Load your .txt file here
                            </Text>
                        </Button>
                        <Button
                            h = "12%"
                            w = "80%"
                            bg = "rgb(4, 120, 87)"
                            marginTop = "4"
                        >
                            Create
                        </Button>
                    </Flex>
                    <Flex
                        h = "42vh"
                        w = "16vw"
                        bg = "rgb(240, 240, 240)"
                        shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
                        borderRadius = {16}
                        align = "center" 
                        flexDirection = "column"
                        paddingTop = "4"
                    >
                        <FilePdf/>
                        <Button
                            h = "55%"
                            w = "80%"
                            mt = {4}
                            onClick = {handlePdfFileClick}
                            colorScheme = "rgb(4, 120, 87)"
                            variant = "outline"
                            _hover = {{
                              borderColor: "rgb(4, 120, 87)"
                            }}
                        >
                            <Text 
                                textAlign = "center"
                                color = "rgb(114, 114, 114)"
                                fontWeight = {400}
                            >
                                Load your .pdf file here
                            </Text>
                        </Button>
                        <Button
                            h = "12%"
                            w = "80%"
                            bg = "rgb(4, 120, 87)"
                            marginTop = "4"
                        >
                            Create
                        </Button>
                        
                    </Flex>
                </HStack>
            </Flex>
        </Flex>
    </Flex>
    )

}

export default Home;