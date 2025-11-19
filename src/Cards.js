import { Flex, Button, Text, Link, VStack } from "@chakra-ui/react"
import OneCard from "./OneCard"
import title from "./Home"

const Cards = () => {



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
                    >
                        Change account
                    </Link>
                    <Link
                        fontSize = {16}
                        color = "rgb(4, 120, 87)"
                        p = {2}   
                        ml = "auto"
                    >
                        To history
                    </Link>
                </Flex>
            </Flex>
            <Flex
                minH = "90vh"
                w = "100%"
                flexDirection = "column"
                justify = "center"
                align = "center" 
            >
                <Flex
                    h = "5%"
                    w = "40%"
                    justify = "center"
                    align = "center" 
                    marginTop = "12"
                    flexDirection = "column"
                >
                    <Text
                        fontSize = {24}
                        color = "rgb(40, 40, 40)"

                    >
                        Title
                    </Text>
                </Flex>
                <VStack
                    minH = "100%"
                    w = "100%"
                    overflowY = "auto"
                    spaceY = {4}
                    marginTop = {8}
                >
                    <OneCard/>
                    <OneCard/>
                    <OneCard/>

                </VStack>
                
            </Flex>
        </Flex>
    )
}

export default Cards