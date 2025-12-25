import { Text, Button, Flex, Checkbox, VStack, Box } from "@chakra-ui/react"

const OneCard = (props) => {

    const {k, q, a} = props

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
                <Text
                    color = "rgb(40, 40, 40)"
                    fontSize = {18}
                    marginTop = {4}
                    justify = "center"
                    align = "center"    
                    textAlign = "center"
                    paddingX = "10"
                >
                    {a}
                </Text>
            </Flex>
                  
        </Flex>
    )

}

export default OneCard