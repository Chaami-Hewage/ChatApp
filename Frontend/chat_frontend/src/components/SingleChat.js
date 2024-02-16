import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, IconButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./UpdateGroupChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    // Define fetchMessages if needed
    const fetchMessages = async () => {
        // Implement your logic to fetch messages
        // For example:
        // const response = await fetch("/api/messages");
        // const data = await response.json();
        // return data;
    };

    return (
        <>
            {selectedChat ? (
                // Render content when selectedChat is truthy
                <div>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        mb={3}
                        pb={3}
                        pt={3}
                        px={3}
                    >
                        <IconButton
                            d={{ base: "none", md: "flex" }}
                            aria-label="Back"
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat(null)}
                        />
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center" mb={3}>
                        {selectedChat.chatName.toUpperCase()}
                    </Text>
                    <UpdateGroupChatModal
                        fetchMessages={fetchMessages}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                    <Box
                        d={{ base: "none", md: "flex" }}
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                        h="100%"
                        p={3}
                        borderRadius="lg"
                        borderWidth="1px"
                        overflow={{ base: "auto", md: "hidden" }}
                        bg="green"
                    >
                        {/* Your Box content goes here */}
                    </Box>
                </div>
            ) : (
                // Render content when selectedChat is falsy
                <Box
                    d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                    alignItems={{ base: "center", md: "flex-start" }}
                    justifyContent="center"
                    w={{ base: "100%", md: "70%" }}
                    h={{ base: "100%", md: "100vh" }}
                    p={3}
                    borderRadius="lg"
                    borderWidth={{ base: "none", md: "1px" }}
                >
                    {/* Your Box content goes here */}
                </Box>
            )}
        </>
    );
};

export default SingleChat;
