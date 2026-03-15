import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Flex, Box, Text, Link, Input, HStack, Button, Textarea
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Keyboard from "../icons/Keyboard.tsx";
import FileTxt from "../icons/FileTxt.tsx";
import FilePdf from "../icons/FilePdf.tsx";
import { LocationState } from "../types";

interface UploadResponse {
  card_list_id: string;
  title: string;
}

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [cardsNum, setCardsNum] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [selectedTxtFile, setSelectedTxtFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [isTxtLoading, setIsTxtLoading] = useState<boolean>(false);
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const txtFileRef = useRef<HTMLInputElement>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLogged(!!token);
  }, []);

  const handleAuthClick = (): void => {
    if (isLogged) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_type');
      setIsLogged(false);
    }
    navigate("/login");
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const changeCardsNum = (e: ChangeEvent<HTMLInputElement>): void => {
    setCardsNum(e.target.value);
  };

  const changeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const handleTxtFileClick = (): void => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    txtFileRef.current?.click();
  };

  const handlePdfFileClick = (): void => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    pdfFileRef.current?.click();
  };

  const handleTxtFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file.name);
      if (!isLogged) {
        navigate("/login");
        return;
      }
      if (!title || !cardsNum) {
        return;
      }
      setSelectedTxtFile(file);
    }
  };

  const handlePdfFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file.name);
      if (!isLogged) {
        navigate("/login");
        return;
      }
      if (!title || !cardsNum) {
        return;
      }
      setSelectedPdfFile(file);
    }
  };

  const uploadText = async (): Promise<void> => {
    if (!text) return;
    
    setIsTxtLoading(true);
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("cards_num", parseInt(cardsNum).toString());
      
      const textBlob = new Blob([text], { type: 'text/plain' });
      const textFile = new File([textBlob], 'text.txt', { type: 'text/plain' });
      formData.append("file", textFile);

      const response = await fetch('/card_lists/upload_txt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data: UploadResponse = await response.json();

      console.log(data);
      navigate("/cards", {
        state: {
          cardListId: data.card_list_id,
          title: data.title
        } as LocationState
      });

      setTitle("");
      setCardsNum("");
      setText("");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsTxtLoading(false);
    }
  };

  const uploadTxtFile = async (file: File | null): Promise<void> => {
    if (!file) return;
    
    setIsTxtLoading(true);
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("cards_num", parseInt(cardsNum).toString());
      formData.append("file", file);

      const response = await fetch('/card_lists/upload_txt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data: UploadResponse = await response.json();

      console.log(data);
      navigate("/cards", {
        state: {
          cardListId: data.card_list_id,
          title: data.title
        } as LocationState
      });

      setTitle("");
      setCardsNum("");
      setSelectedTxtFile(null);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsTxtLoading(false);
    }
  };

  const uploadPdfFile = async (file: File | null): Promise<void> => {
    if (!file) return;
    
    setIsPdfLoading(true);
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("cards_num", parseInt(cardsNum).toString());
      formData.append("file", file);

      const response = await fetch('/card_lists/upload_pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data: UploadResponse = await response.json();

      console.log(data);
      navigate("/cards", {
        state: {
          cardListId: data.card_list_id,
          title: data.title
        } as LocationState
      });

      setTitle("");
      setCardsNum("");
      setSelectedPdfFile(null);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsPdfLoading(false);
    }
  };

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
            onClick={handleAuthClick}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            {isLogged ? "Log out" : "Log in"}
          </Link>
          <Link
            fontSize={16}
            color="rgb(4, 120, 87)"
            p={2}
            ml="auto"
            href="/history"
          >
            To history
          </Link>
          <Link
            fontSize={16}
            color="rgb(4, 120, 87)"
            p={2}
            href="/groups"
          >
            Groups
          </Link>
        </Flex>
      </Flex>
      <Flex
        h="100%"
        w="100%"
        bg="rgb(240, 240, 240)"
        flexDirection="column"
        justify="center"
        align="center"
      >
        <Flex
          h="20%"
          w="40%"
          bg="rgb(240, 240, 240)"
          justify="center"
          align="center"
          marginTop="12"
          flexDirection="column"
        >
          <Text
            fontSize={24}
            color="rgb(40, 40, 40)"
          >
            Enter the title and number of the cards
          </Text>
          <Flex
            w="30vw"
            flexDirection="column"
          >
            <Input
              value={title}
              onChange={changeTitle}
              size="sm"
              placeholder="Title"
              borderColor="rgb(220, 220, 220)"
              shadow="4"
              marginTop="6"
              _focus={{
                bg: "rgb(240, 240, 240)",
                borderColor: "rgb(200, 200, 200)"
              }}
            />
            <Input
              value={cardsNum}
              onChange={changeCardsNum}
              size="sm"
              placeholder="Num"
              borderColor="rgb(220, 220, 220)"
              shadow="4"
              marginTop="6"
              _focus={{
                bg: "rgb(240, 240, 240)",
                borderColor: "rgb(200, 200, 200)"
              }}
            />
          </Flex>
        </Flex>
        <Flex
          h="100%"
          w="100%"
          bg="rgb(240, 240, 240)"
          justify="center"
          align="center"
          flexDirection="column"
          marginTop="10"
        >
          <Text
            fontSize={24}
            color="rgb(40, 40, 40)"
          >
            Choose the download option
          </Text>
          <Text
            fontSize={14}
            color="rgb(100, 100, 100)"
            marginTop="2"
          >
            Enter the text or load file (.txt or .pdf) to get the cards
          </Text>
          <HStack
            h="100%"
            w="100%"
            bg="rgb(240, 240, 240)"
            justify="center"
            align="center"
            spaceX={8}
            marginTop={10}
          >
            <Flex
              h="42vh"
              w="16vw"
              bg="rgb(240, 240, 240)"
              shadow="0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
              borderRadius={16}
              align="center"
              flexDirection="column"
              paddingTop="4"
            >
              <Keyboard />
              <Textarea
                h="55%"
                w="80%"
                value={text}
                onChange={changeText}
                marginTop="4"
                placeholder="Enter your text here"
                alignContent="center"
                textAlign="center"
                whiteSpace="pre-wrap"
              />
              <Button
                h="12%"
                w="80%"
                bg="rgb(4, 120, 87)"
                marginTop="4"
                onClick={uploadText}
                loading={isTxtLoading}
              >
                Create
              </Button>
            </Flex>
            <Flex
              h="42vh"
              w="16vw"
              bg="rgb(240, 240, 240)"
              shadow="0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
              borderRadius={16}
              align="center"
              flexDirection="column"
              paddingTop="4"
            >
              <Input
                type="file"
                ref={txtFileRef}
                onChange={handleTxtFileChange}
                accept=".txt"
                display="none"
              />
              <FileTxt />
              <Button
                h="55%"
                w="80%"
                mt={4}
                colorScheme="rgb(4, 120, 87)"
                variant="outline"
                _hover={{
                  borderColor: "rgb(4, 120, 87)"
                }}
                onClick={handleTxtFileClick}
              >
                <Text
                  textAlign="center"
                  color="rgb(114, 114, 114)"
                  fontWeight={400}
                >
                  {!selectedTxtFile ? "Load your .txt file here" : selectedTxtFile.name}
                </Text>
              </Button>
              <Button
                h="12%"
                w="80%"
                bg="rgb(4, 120, 87)"
                marginTop="4"
                onClick={() => uploadTxtFile(selectedTxtFile)}
                loading={isTxtLoading}
              >
                Create
              </Button>
            </Flex>
            <Flex
              h="42vh"
              w="16vw"
              bg="rgb(240, 240, 240)"
              shadow="0 4px 20px -4px rgba(0, 0, 0, 0.1), 4px 0 10px -4px rgba(0, 0, 0, 0.03)"
              borderRadius={16}
              align="center"
              flexDirection="column"
              paddingTop="4"
            >
              <Input
                type="file"
                ref={pdfFileRef}
                onChange={handlePdfFileChange}
                accept=".pdf"
                display="none"
              />
              <FilePdf />
              <Button
                h="55%"
                w="80%"
                mt={4}
                onClick={handlePdfFileClick}
                colorScheme="rgb(4, 120, 87)"
                variant="outline"
                _hover={{
                  borderColor: "rgb(4, 120, 87)"
                }}
              >
                <Text
                  textAlign="center"
                  color="rgb(114, 114, 114)"
                  fontWeight={400}
                >
                  {!selectedPdfFile ? "Load your .pdf file here" : selectedPdfFile.name}
                </Text>
              </Button>
              <Button
                h="12%"
                w="80%"
                bg="rgb(4, 120, 87)"
                marginTop="4"
                onClick={() => uploadPdfFile(selectedPdfFile)}
                loading={isPdfLoading}
              >
                Create
              </Button>
            </Flex>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;