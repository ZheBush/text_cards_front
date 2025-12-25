import { Flex, Button, Text, Link, VStack } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import OneCard from "../items/OneCard"
import Card from "../classes/Card"
import CardList from "../classes/CardList"
import { useState, useEffect } from "react"

const Cards = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [cardList, setCardList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const cardListId = location.state?.cardListId
    const cardListTitle = location.state?.title

    useEffect(() => {
        if (cardListId) {
            fetchCards(cardListId, cardListTitle)
        }
    }, [cardListId, cardListTitle])

    const fetchCards = async (id, title) => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem('access_token')

            if (!token) {
                navigate("/login")
                return
            }

            const response = await fetch(`/cards/card_list/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch cards')
            }

            const cardsData = await response.json()
            
            const cards = cardsData.map(card => 
                new Card(card.id, card.question, card.answer, card.card_list_id, card.user_id)
            )

            console.log(cards.length)
            
            const list = new CardList(cardListId, title, cards)
            setCardList(list)
        } 
        catch (error) {
            console.error("Error fetching cards:", error)
        } 
        finally {
            setIsLoading(false)
        }
    }

    const handleBackToHistory = () => {
        navigate("/history")
    }

    const handleChangeAccount = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('token_type')
        navigate("/login")
    }

    return (
        <Flex
            minH="100vh"
            w="100%"
            bg="rgb(240, 240, 240)"
            flexDirection="column"
        >
            <Flex
                h="6vh"
                w="100%"
                justify="center"
                align="center" 
            >
                <Flex
                    h="100%"
                    w="60%"
                >
                    <Link
                        fontSize={16}
                        color="rgb(4, 120, 87)"
                        p={2}
                        onClick={handleChangeAccount}
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                    >
                        Change account
                    </Link>
                    <Link
                        fontSize={16}
                        color="rgb(4, 120, 87)"
                        p={2}   
                        ml="auto"
                        onClick={handleBackToHistory}
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                    >
                        To history
                    </Link>
                </Flex>
            </Flex>
            <Flex
                h = "100%"
                w="100%"
                flexDirection="column"
                justify="center"
                align="center" 
            >
                <Flex
                    h="5%"
                    w="40%"
                    justify="top"
                    align="center" 
                    marginTop="6"
                    flexDirection="column"
                >
                    <Text
                        fontSize={24}
                        color="rgb(40, 40, 40)"
                    >
                        {isLoading ? "Loading..." : cardListTitle}
                    </Text>
                </Flex>
                
                {isLoading ? (
                    <Text>Loading cards...</Text>
                ) : cardList ? (
                    <VStack
                        minH="100%"
                        w="100%"
                        overflowY="auto"
                        spacing={4}
                        marginTop={8}
                        paddingX={4}
                    >
                        {cardList.cards.map(card => (
                            <OneCard 
                                k = {card.id}
                                q = {card.question}
                                a = {card.answer}
                            />
                        ))}
                    </VStack>
                ) : (
                    <Text>No cards found</Text>
                )}
                
                <Button
                    h="5vh"
                    w="7vw"
                    bg="rgb(4, 120, 87)"
                    borderRadius="lg"
                    shadow="0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
                    marginTop={4}
                    marginBottom={8}
                    onClick={() => navigate("/home")}
                >   
                    <Text 
                        textAlign="center"
                        color="rgb(240, 240, 240)"
                        fontWeight={400}
                    >
                        To home
                    </Text>
                </Button>
            </Flex>
        </Flex>
    )
}

export default Cards