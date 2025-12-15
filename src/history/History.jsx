import { Flex, Button, Text, Link, Grid, GridItem } from "@chakra-ui/react"
import Card from "../classes/Card"
import CardList from "../classes/CardList"
import OneHistoryCard from "../items/OneHistoryCard"

const History = (props) => {

    const card11 = new Card(1, 1, "abc?", "a", "a", ["a", "b", "c"])
    const card12 = new Card(2, 1, "def?", "e", "e", ["d", "e", "f"])
    const card13 = new Card(3, 1, "xyz?", "z", "x", ["x", "y", "z"])
    const cardList1 = new CardList("my cards 1", [card11, card12, card13])

    const card21 = new Card(1, 1, "abc?", "a", "a", ["a", "b", "c"])
    const card22 = new Card(2, 1, "def?", "e", "e", ["d", "e", "f"])
    const card23 = new Card(3, 1, "xyz?", "z", "x", ["x", "y", "z"])
    const cardList2 = new CardList("my cards 2", [card21, card22, card23])

    const history = [cardList1]

    return (
        <Flex
            minH = "100vh"
            w = "100%"
            bg = "rgb(240, 240, 240)"
            justify = "center"
            align = "center" 
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
                flex = "1"
                minH = "0"
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
                    marginTop = {6}
                    flexDirection = "column"
                >
                    <Text
                        fontSize = {24}
                        color = "rgb(40, 40, 40)"
                        justify = "center"
                        align = "center" 
                    >
                        Results
                    </Text>
                </Flex>
                <Grid
                    flex = "1"
                    h = "100%"
                    w = "100%"
                    templateColumns = "repeat(4, 0.2fr)"
                    justify = "center"
                    gap = {4}
                    justifyContent = "center"
                    alignItems = "flex-start"
                    paddingTop = {16}
                    paddingBottom = {4}
                    overflowY = "auto"
                >
                    {
                        history.map(cardList => (
                            <GridItem>
                                <OneHistoryCard
                                    title = {cardList.title}
                                    score = {cardList.score}
                                    total = {history.length}
                                />
                            </GridItem>
                        ))
                    }
                </Grid>
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
                        To home
                    </Text>
                </Button>
            </Flex>
        </Flex>
    )
}

export default History