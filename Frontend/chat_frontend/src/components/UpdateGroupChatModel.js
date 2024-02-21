import React, { useContext } from "react";
import {
    Box,
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    FormControl,
    Input
} from "@chakra-ui/react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import UserBadgeItem from "./UserBadgeItem";
import { ChatState } from "../Context/ChatProvider"; // Import your ChatState context

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [loading, setLoading] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});
    const toast = useToast();
    const { user } = useContext(ChatState); // Assuming user is stored in the ChatState context

    const handleRemove = (user) => {
        const newUsers = selectedChat.users.filter((u) => u._id !== user._id);
        setSelectedChat({ ...selectedChat, users: newUsers });
    };

    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenaming(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chats/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                config
            );

            console.log(data._id);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenaming(false);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenaming(false);
        }
        setGroupChatName("");
    };

    return (
        <div>
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}>
                Open Model
            </IconButton>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display="flex"
                        alignItems="center"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users &&
                                selectedChat.users.map((user) => (
                                    <UserBadgeItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleRemove(user)}
                                    />
                                ))}
                        </Box>
                        <FormControl>
                            <Input
                                placeholder="Enter new group chat name"
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                onClick={handleRename}
                                ml={1}
                                isLoading={renaming}
                            >
                                Update
                            </Button>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="solid">Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateGroupChatModal;
