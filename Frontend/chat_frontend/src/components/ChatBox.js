import React from "react";
import {ChatState} from "../Context/ChatProvider";
import {Box} from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
   const {selectedChat} = ChatState();



    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent="center"
            w={{ base: "100%", md: "70%" }}
            h={{ base: "100%", md: "100vh" }}
            bgImage={{ base: "none", md: "url('https://cdn.wallpapersafari.com/46/27/ZWbv3h.jpg')" }}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius="lg"
            borderWidth={{ base: "none", md: "1px" }}
            marginRight={{ base: "0", md: "5px" }}
            marginLeft={{ base: "0", md: "10px" }}
        >
            <SingleChat />
        </Box>
    );
}

    export default ChatBox;
