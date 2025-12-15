import { Text, Checkbox, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"

const OneAns = (props) => {

    const {answer} = props

    const [isChecked, setIsChecked] = useState(false);
    const chooseAns = (e) => {
        setIsChecked(e.target.checked);
    };

    return(
        <Flex
            minH = "0vh"
            minW = "0vw"
            justify = "top"
            align = "center"
        >
            <Input
                type = "checkbox"
                isChecked = {isChecked}
                onChange = {chooseAns}
                h = "24px"
                w = "12px"
                bg = {isChecked? "rgb(4, 120, 87)": "rgb(240, 240, 240)"}/>
            <Text
                marginStart = {4}
                fontSize = {14}
            >
                {answer}
            </Text>
            {/* <Checkbox 
                isChecked = {isChecked}
                onChange = {chooseAns}
            >
                <Text>
                    {answer}
                </Text>
            </Checkbox> */}
        </Flex>
    )

}

export default OneAns