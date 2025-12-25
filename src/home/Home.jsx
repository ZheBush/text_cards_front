import { useState, useRef, useEffect } from "react";
import { 
  Flex, Box, Text, Link, Input, HStack, Button, Textarea,
  useToast, Alert, AlertIcon, AlertTitle, AlertDescription 
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import Keyboard from "../icons/Keyboard";
import FileTxt from "../icons/FileTxt"
import FilePdf from "../icons/FilePdf"
import CardList from "../classes/CardList";


const Home = () => {

    const [title, setTitle] = useState("")
    const [cardsNum, setCardsNum] = useState("")
    const [text, setText] = useState("")
    const [isLogged, setIsLogged] = useState(false)
    const [selectedTxtFile, setSelectedTxtFile] = useState(null)
    const [selectedPdfFile, setSelectedPdfFile] = useState(null)
    const [isTxtLoading, setIsTxtLoading] = useState(false)
    const [isPdfLoading, setIsPdfLoading] = useState(false)

    const navigate = useNavigate()

    const txtFileRef = useRef(null) 
    const pdfFileRef = useRef(null) 

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setIsLogged(!!token)
    }, [])

    const handleAuthClick = () => {
        if (isLogged) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            setIsLogged(false);
        } 
        navigate("/login");
    };
    
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const changeCardsNum = (e) => {
        setCardsNum(e.target.value)
    }
    const changeText = (e) => {
        setText(e.target.value)
    }

    const handleTxtFileClick = () => {
        if (!isLogged) {
            navigate("/login")
            return
        }
        txtFileRef.current?.click()
    }
    
    const handlePdfFileClick = () => {
        if (!isLogged) {
            navigate("/login")
            return
        }
        pdfFileRef.current?.click()
    }

    const handleTxtFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log(file.name)
            if (!isLogged) {
                navigate("/login")
                return
            }
            if (!title || !cardsNum) {
                return
            }
            setSelectedTxtFile(file)
        }
    }

    const handlePdfFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log(file.name)
            if (!isLogged) {
                navigate("/login")
                return
            }
            if (!title || !cardsNum) {
                return
            }
            setSelectedPdfFile(file)
        }
    }

    const uploadText = async (text) => {
        setIsTxtLoading(true)
        try {
            const token = localStorage.getItem('access_token')

            if (!token) {
                throw new Error("No authentication token found")
            }

            const formData = new FormData()
            
            formData.append("title", title)
            formData.append("cards_num", parseInt(cardsNum))
            formData.append("file", text)

            const response = await fetch('/card_lists/upload_txt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })

            const data = await response.json()

            console.log(data)
            navigate("/cards", { 
                state: { 
                    cardListId: data.card_list_id,
                    title: data.title 
                } 
            })
            
            setTitle("")
            setCardsNum("")
            setText(null)
        } 
        catch (error) {
            console.error("Upload error:", error)
        }
        finally {
            setIsTxtLoading(false)
        }
    }

    const uploadTxtFile = async (file) => {
        setIsTxtLoading(true)
        try {
            const token = localStorage.getItem('access_token')

            if (!token) {
                throw new Error("No authentication token found")
            }

            const formData = new FormData()
            
            formData.append("title", title)
            formData.append("cards_num", parseInt(cardsNum))
            formData.append("file", file)

            const response = await fetch('/card_lists/upload_txt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })

            const data = await response.json()

            console.log(data)
            navigate("/cards", { 
                state: { 
                    cardListId: data.card_list_id,
                    title: data.title 
                } 
            })
            
            setTitle("")
            setCardsNum("")
            setSelectedTxtFile(null)
        } 
        catch (error) {
            console.error("Upload error:", error)
        }
        finally {
            setIsTxtLoading(false)
        }
    }

    const uploadPdfFile = async (file) => {
        setIsPdfLoading(true)
        try {
            const token = localStorage.getItem('access_token')

            if (!token) {
                throw new Error("No authentication token found")
            }

            const formData = new FormData()
            
            formData.append("title", title)
            formData.append("cards_num", parseInt(cardsNum))
            formData.append("file", file)

            const response = await fetch('/card_lists/upload_pdf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })

            const data = await response.json()

            console.log(data)
            navigate("/cards", { 
                state: { 
                    cardListId: data.card_list_id,
                    title: data.title 
                } 
            })
            
            setTitle("")
            setCardsNum("")
            setSelectedPdfFile(null)
        } 
        catch (error) {
            console.error("Upload error:", error)
        }
        finally {
            setIsPdfLoading(false)
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
                        onClick = {handleAuthClick}
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                    >
                        {isLogged ? "Log out" : "Log in"}
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
                        Enter the title and number of the cards
                    </Text>
                    <Flex
                        w = "30vw"
                        flexDirection = "column"
                    >
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
                        <Input
                            value = {cardsNum}
                            onChange = {changeCardsNum}
                            size = "sm"
                            placeholder = "Num"
                            borderColor = "rgb(220, 220, 220)"
                            shadow = {4}
                            marginTop = "6"
                            _focus = {{
                              bg: "rgb(240, 240, 240)",
                              borderColor: "rgb(200, 200, 200)"}}/>                          
                    </Flex>
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
                                onClick = {() => uploadText()}
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
                                ref={txtFileRef}
                                onChange={handleTxtFileChange}
                                accept=".txt"
                                display="none" 
                            />
                            <FileTxt/>
                            <Button
                                h = "55%"
                                w = "80%"
                                mt = {4}
                                colorScheme = "rgb(4, 120, 87)"
                                variant = "outline"
                                _hover = {{
                                  borderColor: "rgb(4, 120, 87)"
                                }}
                                onClick={() => handleTxtFileClick()}
                            >
                                <Text 
                                    textAlign = "center"
                                    color = "rgb(114, 114, 114)"
                                    fontWeight = {400}
                                >
                                    {!selectedTxtFile? "Load your .txt file here": title}
                                </Text>
                            </Button>
                            <Button
                                h = "12%"
                                w = "80%"
                                bg = "rgb(4, 120, 87)"
                                marginTop = "4"
                                onClick={() => uploadTxtFile(selectedTxtFile)}
                                isLoading={isTxtLoading}
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
                                ref={pdfFileRef}
                                onChange={handlePdfFileChange}
                                accept=".pdf"
                                display="none" 
                            />
                            <FilePdf/>
                            <Button
                                h = "55%"
                                w = "80%"
                                mt = {4}
                                onClick = {() => handlePdfFileClick()}
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
                                    {!selectedPdfFile? "Load your .pdf file here": title}
                                </Text>
                            </Button>
                            <Button
                                h = "12%"
                                w = "80%"
                                bg = "rgb(4, 120, 87)"
                                marginTop = "4"
                                onClick={() => uploadPdfFile(selectedPdfFile)}
                                isLoading={isPdfLoading}
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