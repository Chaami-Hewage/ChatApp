import React from "react";
import { ChatState } from "../Context/ChatProvider";
import {
    Box, Button, FormControl,
    IconButton, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner,
    useDisclosure
} from "@chakra-ui/react";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { useToast } from "@chakra-ui/toast";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";


const UpdateGroupChat = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [renameloading, setRenameLoading] = React.useState(false);

    const toast = useToast();

    const handleDelete = (user) => {
        const newSelectedUsers = selectedChat.users.filter((u) => u._id !== user._id);
        setSelectedChat({ ...selectedChat, users: newSelectedUsers });

    }

    const handleAdd = async (user) => {
        if (selectedChat.users.some((u) => u._id === user._id)) {
            toast({
                title: "User already in chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        if (selectedChat.groupAdmin !== user._id) {
            toast({
                title: "User is not an admin",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/chats/add/${selectedChat._id}`,
                { user: user._id },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to add user",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setRenameLoading(false);
        }
    };

    const handleRename = async () => {
        setRenameLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chats/rename/${selectedChat._id}`,
                { chatName: groupChatName },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {

            toast({
                title: "An error occurred.",
                description: "Unable to rename chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setRenameLoading(false);
        }

        setGroupChatName("");
    }

    // const handleRemove = async (user) => {
    //     if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
    //         toast({
    //             title: "Only admins can remove someone!",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //         return;
    //     }
    //
    //     try {
    //         setLoading(true);
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         };
    //         const { data } = await axios.put(
    //             `/api/chats/leave/${selectedChat._id}`,
    //             {
    //                 chatId: selectedChat._id,
    //                 userId: user1._id,
    //             },
    //             config
    //         );
    //
    //         user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
    //         setFetchAgain(!fetchAgain);
    //         fetchMessages();
    //         setLoading(false);
    //     } catch (error) {
    //         toast({
    //             title: "Error Occured!",
    //             description: error.response.data.message,
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //         setLoading(false);
    //     }
    //     setGroupChatName("");
    // };

    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <Box>
                            {selectedChat.users.map((user) => (
                                <UserBadgeItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleDelete(user)}
                                />
                            ))}
                        </Box>
                    </ModalBody>
                    <FormControl d={{ base: "flex" }} >
                        <Input
                            placeholder="New Chat Name"
                            mb={3}
                            isLoading={renameloading}
                            onClick={handleRename}
                        />
                        <Button
                            onClick={handleRename}
                            colorScheme="teal"
                            variant={"solid"}
                            ml={1}
                            isLoading={renameloading}
                            />

                    </FormControl>
                    {loading ? (
                        <Spinner size="lg" />
                    ) : (
                    searchResult?.map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => handleAdd(user)}
                        />
                    ))
                    )
                    }

                    <ModalFooter>
                        {/*<Button onClick={() => handleRemove(user)} colorScheme="red">*/}
                        {/*    Leave Group*/}
                        {/*</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChat;
