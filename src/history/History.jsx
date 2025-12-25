import { Flex, Button, Text, Link, Grid, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Card from "../classes/Card"
import CardList from "../classes/CardList"
import OneHistoryCard from "../items/OneHistoryCard"

const History = () => {

    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setIsLogged(!!token)
        console.log(token)
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem('access_token')
            
            if (!token) {
                navigate("/login")
                return
            }

            const response = await fetch('/card_lists/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch cards')
            }

            const historyData = await response.json()
            
            setHistory(
                historyData.map(cardList => 
                    new CardList(cardList.id, cardList.title, cardList.cards)
                )
            )

            console.log(history.length)
        } 
        catch (error) {
            console.error("Error fetching cards:", error)
        } 
        finally {
            setIsLoading(false)
        }
    }

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
                        href = "login"
                    >
                        {isLogged ? "Log out" : "Log in"}
                    </Link>
                    <Link
                        fontSize = {16}
                        color = "rgb(4, 120, 87)"
                        p = {2}   
                        ml = "auto"
                        href = "/home"
                    >
                        To home
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
                        History
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
                    paddingTop = "10"
                    overflowY = "auto"
                >
                    {
                        history.map(cardList => (
                            <GridItem key = {cardList.id}>
                                <OneHistoryCard
                                    id = {cardList.id}
                                    title = {cardList.title} />
                            </GridItem>
                        ))
                    }
                </Grid>
            </Flex>
        </Flex>
    )
}

export default History