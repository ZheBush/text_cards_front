import { Text, Button, Flex, Checkbox, VStack, Box } from "@chakra-ui/react"
import { useState } from "react"

const OneCard = (props) => {
    const { k, q, a } = props
    const [showAnswer, setShowAnswer] = useState(false)

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer)
    }

    return(
        <Flex
            minH = "30vh"
            w = "40%"
            bg = "rgb(240, 240, 240)"
            shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
            justify = "center"
            align = "center" 
            flexDirection = "column"
            outline="1px solid"
            outlineColor="rgb(4, 120, 87)"
            paddingBottom = {6}
            borderRadius = {16}
            marginTop = {1}
            marginBottom = {1}
            cursor="pointer"
            onClick={toggleAnswer}
            _hover={{ shadow: "0 6px 25px -4px rgba(0, 0, 0, 0.15)" }}
        >
            <Flex
                minH = "30vh"
                w = "100%"
                flexDirection = "column"
                justify = "center"
                align = "center" 
            >
                <Text
                    color = "rgb(40, 40, 40)"
                    fontSize = {18}
                    marginTop = {4}
                    justify = "center"
                    align = "center"    
                    textAlign = "center"
                    paddingX = "10"
                >
                    {q}
                </Text>
                
                <Box
                    marginTop = {4}
                    justify = "center"
                    align = "center"    
                    textAlign = "center"
                    paddingX = "10"
                    paddingTop = "5"
                    minH="40px"
                    w="100%"
                >
                    {showAnswer ? (
                        <Text
                            color = "rgb(4, 120, 87)"
                            fontSize = {18}
                            fontWeight = "400"
                            transition="all 0.3s"
                        >
                            {a}
                        </Text>
                    ) : (
                        <Text
                            color = "rgb(160, 160, 160)"
                            fontSize = {18}
                            fontStyle = "italic"
                            cursor="pointer"
                            _hover={{ color: "rgb(120, 120, 120)" }}
                            transition="all 0.3s"
                        >
                            Нажмите, чтобы показать ответ
                        </Text>
                    )}
                </Box>
            </Flex>
        </Flex>
    )
}

export default OneCard