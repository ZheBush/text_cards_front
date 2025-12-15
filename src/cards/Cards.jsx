import { Flex, Button, Text, Link, VStack } from "@chakra-ui/react"
import OneCard from "../items/OneCard"
import Card from "../classes/Card"
import CardList from "../classes/CardList"
import title from "../Home"

const Cards = () => {

    const card1 = new Card(1, 1, "abc?", "a", "a", ["a", "b", "c"])
    const card2 = new Card(2, 1, "def?", "e", "e", ["d", "e", "f"])
    const card3 = new Card(3, 1, "xyz?", "z", "x", ["x", "y", "z"])
    const cardList = new CardList("my cards", [card1, card2, card3])

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
                    {
                        cardList.getAllCards.map(card => (
                            <OneCard isQuestion = {true} card = {card}/>
                        ))
                    }
                </VStack>
                <Button
                    h = "5vh"
                    w = "7vw"
                    bg = "rgb(4, 120, 87)"
                    borderRadius = "lg"
                    shadow = "0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
                    marginTop = {4}
                    marginBottom = {8}
                >
                    <Text 
                        textAlign = "center"
                        color = "rgb(240, 240, 240)"
                        fontWeight = {400}
                    >
                        To result
                    </Text>
                </Button>
            </Flex>
        </Flex>
    )
}

export default Cards