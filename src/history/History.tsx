import React, { useState, useEffect } from "react";
import {
  Flex, Button, Text, Link, Grid, GridItem, HStack, Spinner
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CardList from "../classes/CardList.ts";
import OneHistoryCard from "../items/OneHistoryCard.tsx";

interface CardListData {
  id: string;
  title: string;
  cards: any[];
}

const History: React.FC = () => {
  const [history, setHistory] = useState<CardList[]>([]);
  const [originalHistory, setOriginalHistory] = useState<CardList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("oldest");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const [displayedHistory, setDisplayedHistory] = useState<CardList[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLogged(!!token);
    console.log(token);
    fetchHistory();
  }, []);

  useEffect(() => {
    if (originalHistory.length > 0) {
      sortHistory(sortOrder);
    }
  }, [sortOrder, originalHistory]);

  useEffect(() => {
    updateDisplayedHistory();
  }, [currentPage, history, itemsPerPage]);

  const fetchHistory = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch('/card_lists/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }

      const historyData: CardListData[] = await response.json();

      const cardLists = historyData.map(cardList =>
        new CardList(cardList.id, cardList.title, cardList.cards)
      );

      setOriginalHistory(cardLists);
      sortHistory("oldest", cardLists);

      console.log(history.length);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortHistory = (order: "oldest" | "newest", data: CardList[] | null = null): void => {
    const historyData = data || originalHistory;

    if (order === "newest") {
      const sorted = [...historyData].reverse();
      setHistory(sorted);
    } else {
      setHistory([...historyData]);
    }
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSortOldest = (): void => {
    setSortOrder("oldest");
  };

  const handleSortNewest = (): void => {
    setSortOrder("newest");
  };

  const updateDisplayedHistory = (): void => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
    setDisplayedHistory(currentItems);
  };

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const nextPage = (): void => {
    if (currentPage < Math.ceil(history.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(history.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex
      minH="100vh"
      w="100%"
      bg="rgb(240, 240, 240)"
      justify="center"
      align="center"
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
            href="/login"
          >
            {isLogged ? "Log out" : "Log in"}
          </Link>
          <Link
            fontSize={16}
            color="rgb(4, 120, 87)"
            p={2}
            ml="auto"
            href="/home"
          >
            To home
          </Link>
        </Flex>
      </Flex>
      <Flex
        flex="1"
        minH="0"
        w="100%"
        flexDirection="column"
        justify="flex-start"
        align="center"
      >
        <Flex
          h="auto"
          minH="10%"
          w="40%"
          justify="center"
          align="center"
          marginTop={6}
          flexDirection="column"
        >
          <Text
            fontSize={24}
            color="rgb(40, 40, 40)"
            justifyContent="center"
            alignContent="center"
            mb={6}
          >
            History
          </Text>
          <HStack gap={4} mb={6} mt={2}>
            <Button
              size="sm"
              bg={sortOrder === "newest" ? "rgb(240, 240, 240)" : "rgb(4, 120, 87)"}
              outline="1px solid"
              outlineColor="rgb(4, 120, 87)"
              onClick={handleSortOldest}
              color={sortOrder === "newest" ? "rgb(4, 120, 87)" : "white"}
            >
              Oldest First
            </Button>
            <Button
              size="sm"
              bg={sortOrder === "newest" ? "rgb(4, 120, 87)" : "rgb(240, 240, 240)"}
              outline="1px solid"
              outlineColor="rgb(4, 120, 87)"
              onClick={handleSortNewest}
              color={sortOrder === "newest" ? "white" : "rgb(4, 120, 87)"}
            >
              Newest First
            </Button>
          </HStack>
        </Flex>

        {isLoading ? (
          <Flex justify="center" align="center" flex="1">
            <Spinner size="xl" color="rgb(4, 120, 87)" />
          </Flex>
        ) : (
          <>
            <Grid
              flex="1"
              minH="0"
              w="100%"
              templateColumns="repeat(3, 0.2fr)"
              justifySelf="center"
              gap={4}
              justifyContent="center"
              justifyItems="center"
              paddingY="4"
              overflowY="auto"
              marginTop="2"
            >
              {displayedHistory.map(cardList => (
                <GridItem key={cardList.id}>
                  <OneHistoryCard
                    id={cardList.id}
                    title={cardList.title}
                  />
                </GridItem>
              ))}
            </Grid>

            {history.length > itemsPerPage && (
              <Flex
                h="10%"
                w="100%"
                justify="center"
                align="center"
                paddingY={4}
                bg="rgb(240, 240, 240)"
              >
                <HStack gap={2}>
                  <Button
                    size="sm"
                    bg="rgb(240, 240, 240)"
                    outline="1px solid"
                    outlineColor="rgb(4, 120, 87)"
                    color="rgb(4, 120, 87)"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    _hover={{ bg: "rgb(230, 230, 230)" }}
                  >
                    &laquo;
                  </Button>

                  {pageNumbers.map(number => (
                    <Button
                      key={number}
                      size="sm"
                      bg={currentPage === number ? "rgb(4, 120, 87)" : "rgb(240, 240, 240)"}
                      outline="1px solid"
                      outlineColor="rgb(4, 120, 87)"
                      color={currentPage === number ? "white" : "rgb(4, 120, 87)"}
                      onClick={() => paginate(number)}
                      _hover={{
                        bg: currentPage === number ? "rgb(3, 100, 70)" : "rgb(230, 230, 230)"
                      }}
                    >
                      {number}
                    </Button>
                  ))}

                  <Button
                    size="sm"
                    bg="rgb(240, 240, 240)"
                    outline="1px solid"
                    outlineColor="rgb(4, 120, 87)"
                    color="rgb(4, 120, 87)"
                    onClick={nextPage}
                    disabled={currentPage === pageNumbers.length}
                    _hover={{ bg: "rgb(230, 230, 230)" }}
                  >
                    &raquo;
                  </Button>
                </HStack>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default History;