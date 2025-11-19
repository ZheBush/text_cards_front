import { Text, Button, Flex, Checkbox } from "@chakra-ui/react"

const OneCard = (props) => {

    const {question, answers, correctAnswer} = props

    return(
        <Flex
            h = "30vh"
            w = "60%"
            bg = "rgb(240, 240, 240)"
            shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
            justify = "center"
            align = "center" 
            flexDirection = "column"
            outline="1px solid"
            outlineColor="rgb(4, 120, 87)"
            borderRadius = {16}
            marginTop = {1}
        >
            
        </Flex>
    )

}

export default OneCard