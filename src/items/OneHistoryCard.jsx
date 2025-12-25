import { Flex, Button, Text } from "@chakra-ui/react" 
import { useNavigate } from "react-router-dom";


const OneHistoryCard = (props) => {

    const {k, id, title} = props

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/cards", { 
            state: { 
                cardListId: id,
                title: title 
            } 
        })
    }


    return(
        <Button
            h = "20vh"
            w = "20vw"
            bg = "rgb(240, 240, 240)"
            justify = "top"
            align = "start" 
            flexDirection = "column"
            shadow = "0 1px 4px -1px rgba(0, 0, 0, 0.2)"
            outline="1px solid"
            outlineColor="rgb(4, 120, 87)"
            onClick = {handleClick}
        >
            <Text 
                textAlign = "center"
                color = "rgb(40, 40, 40)"
                fontWeight = {400}
                fontSize={18}
            >
                {title}
            </Text>
        </Button>
    )

}

export default OneHistoryCard