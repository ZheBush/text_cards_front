import { Text, Checkbox, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"

const OneResult = (props) => {

    const {isSelected, isCorrect, answer} = props

    return(
        <Flex
            minH = "3vh"
            w = "100%"
            justify = "start"
            align = "center"
            bg = {isSelected && isCorrect? "rgb(4, 120, 87)": 
                isSelected && !isCorrect? "rgb(232, 52, 52)": "rgb(240, 240, 240)"}
            borderRadius = "lg"
            border = {!isSelected && isCorrect? "2px solid": "0px solid"}
            borderColor = {!isSelected && isCorrect? "rgb(4, 120, 87)": "rgb(240, 240, 240)"}
        >
            <Text
                marginStart = {4}
                fontSize = {14}
            >
                {answer}
            </Text>
        </Flex>
    )

}

export default OneResult