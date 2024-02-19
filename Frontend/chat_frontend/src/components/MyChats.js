import React, {useState, useEffect} from "react";
import {ChatState} from "../Context/ChatProvider";
import axios from "axios";
import {Box, useToast} from "@chakra-ui/react";
import {Button, Text, Stack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import {getSender} from "./ChatLogics";
import GroupChatModel from "./GroupChatModel";

const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState(null); // Initialize to null
    const user = JSON.parse(localStorage.getItem("user")) || {}; // Initialize to an empty object
    const [chats, setChats] = useState([]);

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("/api/chats/", config);
            setChats(data);
            return data;
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return null;
        }
    };

    const [selectedChat, setSelectedChat] = useState();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("user"))); //userInfo
        fetchChats().then((result) => console.log(result));
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Box
            d={{base: selectedChat ? "none" : "flex", md: "flex"}}
            flexDir="column"
            alignItems="center"
            p={3}
            bgColor="gainsboro"
            w={{base: "100%", md: "31%"}}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{base: "28px", md: "30px"}}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModel>
                    <br/>
                    <Button
                        d="flex"
                        fontSize={{base: "17px", md: "10px", lg: "17px"}}
                        rightIcon={<AddIcon/>}
                    >
                        Create Group Chat
                    </Button>
                </GroupChatModel>
            </Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {console.log(chats)}

                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#51c9da" : "#b4dbe0"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(user, chat.users)  // Make sure getSender returns a valid string
                                        : chat.chatName}
                                </Text>
                                {chat.latestMessage && chat.latestMessage.sender && (
                                    <Text fontSize="xs">
                                        <b>{chat.latestMessage.sender.name || 'Unknown Sender'} : </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading/>
                )}

            </Box>
        </Box>
    );
};

export default MyChats;
