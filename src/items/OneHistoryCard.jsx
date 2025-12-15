import { Flex, Button, Text } from "@chakra-ui/react" 

const OneHistoryCard = (props) => {

    const {title, score, total} = props

    return(
        <Button
            h = "20vh"
            w = "20vw"
            bg = "rgb(240, 240, 240)"
            justify = "top"
            align = "start" 
            flexDirection = "column"
            shadow = "0 1px 4px -1px rgba(0, 0, 0, 0.1)"
            outline="1px solid"
            outlineColor="rgb(4, 120, 87)"
        >
            <Text 
                textAlign = "center"
                color = "rgb(40, 40, 40)"
                fontWeight = {400}
            >
                {title}
            </Text>
            <Text 
                textAlign = "center"
                color = "rgb(40, 40, 40)"
                fontWeight = {300}
            >
                {score} / {total}
            </Text>
        </Button>
    )

}

export default OneHistoryCard