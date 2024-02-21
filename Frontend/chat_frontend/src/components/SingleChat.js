import React, {useState} from "react";
import {ChatState} from "../Context/ChatProvider";
import {Box, IconButton} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import UpdateGroupChatModal from "./UpdateGroupChatModel";
import ProfileModal from "./profileModal";
import {getSender, getSenderFull} from "./ChatLogics";

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = useState(); //if any chat is selected, it will be available in selectedChat

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
                            d={{base: "none", md: "flex"}}
                            aria-label="Back"
                            icon={<ArrowBackIcon/>}
                            onClick={() => setSelectedChat("")}
                        />
                        {(!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        ))}
                    </Text>

                    <Box
                        d={{base: "none", md: "flex"}}
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                        h="100%"
                        p={3}
                        borderRadius="lg"
                        borderWidth="1px"
                        overflow={{base: "auto", md: "hidden"}}
                        bg="lightsalmon"
                    >
                        {/* Messages */}
                    </Box>



                    <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center" mb={3}>
                        {selectedChat.chatName.toUpperCase()}
                    </Text>
                    <UpdateGroupChatModal
                        fetchMessages={fetchMessages}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                    <Box
                        d={{base: "none", md: "flex"}}
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                        h="100%"
                        p={3}
                        borderRadius="lg"
                        borderWidth="1px"
                        overflow={{base: "auto", md: "hidden"}}
                        bg="green"
                    >
                        {/* Your Box content goes here */}
                    </Box>
                </div>
            ) : (
                // Render content when selectedChat is falsy
                <Box
                    d={{base: selectedChat ? "flex" : "none", md: "flex"}}
                    alignItems={{base: "center", md: "flex-start"}}
                    justifyContent="center"
                    w={{base: "100%", md: "70%"}}
                    h={{base: "100%", md: "100vh"}}
                    p={3}
                    borderRadius="lg"
                    borderWidth={{base: "none", md: "1px"}}
                >
                    <Text
                        fontSize={{base: "md", md: "lg", lg: "xl"}}
                        fontWeight="bold"
                        color="black"
                        textAlign="center"
                        verticalAlign="middle"
                        bg="White"
                        p="20px"
                        m="200px"
                        marginLeft={{base: "0", md: "100px"}}
                    >
                        Select a chat to start messaging
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
