import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LocationState } from "../types";

interface OneHistoryCardProps {
  id: string;
  title: string;
}

const OneHistoryCard: React.FC<OneHistoryCardProps> = ({ id, title }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/cards", {
      state: {
        cardListId: id,
        title: title
      } as LocationState
    });
  };

  return (
    <Button
      h="20vh"
      w="20vw"
      bg="rgb(240, 240, 240)"
      justifyContent="top"
      alignItems="start"
      flexDirection="column"
      shadow="0 1px 4px -1px rgba(0, 0, 0, 0.2)"
      outline="1px solid"
      outlineColor="rgb(4, 120, 87)"
      onClick={handleClick}
    >
      <Text
        textAlign="center"
        color="rgb(40, 40, 40)"
        fontWeight={400}
        fontSize={18}
      >
        {title}
      </Text>
    </Button>
  );
};

export default OneHistoryCard;