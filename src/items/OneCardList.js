import { Text, Button, Flex, Checkbox, VStack, Box } from "@chakra-ui/react"
import OneAns from "./OneAns"
import OneResult from "../items/OneResult"

const OneCardList = (props) => {

    const {card, isQuestion} = props

    const id = card.id
    const question = card.question
    const correctAnswer = card.correctAnswer
    const selectedAnswer = card.selectedAnswer
    const options = card.options
    const countOfOptions = options.length

    return(
        <Flex
            minH = "30vh"
            w = "60%"
            bg = "rgb(240, 240, 240)"
            shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
            justify = "top"
            align = "start" 
            flexDirection = "column"
            outline="1px solid"
            outlineColor="rgb(4, 120, 87)"
            paddingBottom = {6}
            borderRadius = {16}
            marginTop = {1}
        >
            <Box
                h = "5vh"
                w = "100%"
                display = "flex" 
                justifyContent = "center"
            >
                <Text
                    color = "rgb(40, 40, 40)"
                    fontSize = {18}
                    marginTop = {4}
                    justify = "center"
                    align = "center"    
                >
                    {question}
                </Text>
            </Box>
            <VStack
                w = "92%"
                marginStart = {8}
                marginTop = {4}
                spaceY={6}
            >
                {isQuestion 
                    ?  options.map(option => (
                            <OneAns answer = {option}/>
                        ))
                    : options.map(option => (
                            <OneResult 
                            isSelected = {option === selectedAnswer} 
                            isCorrect = {option === correctAnswer} 
                            answer = {option}/>
                        ))  
                }
            </VStack>
                  
        </Flex>
    )

}

export default OneCard