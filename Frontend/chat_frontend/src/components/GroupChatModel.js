import React, { useState} from "react";
import { FormControl, Box, useDisclosure, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, } from "@chakra-ui/react";
import {ChatState} from "../Context/ChatProvider";
import {useToast} from "@chakra-ui/toast";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {user } = ChatState();
    const [chats, setChats] = useState([]);

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({ title: "User already added", status: "warning", duration: 5000, isClosable: true, position: "top", });
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}`, }, };
            const {data} = await axios.get(`/api/users?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({ title: "Error Occurred!", description: "Failed to Load the Search Results", status: "error", duration: 5000, isClosable: true, position: "bottom-left", });
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    }

    const handleSubmit = async () => {
        // Trim the groupChatName and filter out empty/whitespace users
        const trimmedGroupName = groupChatName.trim();
        const validUsers = selectedUsers
            .filter(u => typeof u === 'object' && u.hasOwnProperty('_id') && typeof u._id === 'string' && u._id.trim() !== "");
        if (!trimmedGroupName || validUsers.length === 0) {
            toast({ title: "Please fill all the fields", status: "warning", duration: 5000, isClosable: true, position: "top", });
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}`, }, };
            const { data } = await axios.post(
                "/api/chats/group",
                {
                    name: trimmedGroupName,
                    users: JSON.stringify(validUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast({ title: "New Group Chat Created!", status: "success", duration: 5000, isClosable: true, position: "bottom", });
        } catch (error) {
            toast({ title: "Failed to Create the Chat!", description: error.response && error.response.data.message ? error.response.data.message : error.message, status: "error", duration: 5000, isClosable: true, position: "bottom", });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize="35px" fontFamily="Work sans" d="flex" justifyContent="center" >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input placeholder="Chat Name" mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder="Search Users" mb={1} onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                            ))}
                        </Box>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <Box w="100%" d="flex" justifyContent="space-around" flexWrap="wrap" my="2" >
                                {searchResult.map((result) => (
                                    <UserListItem key={result._id} user={result} handleFunction={() => handleGroup(result)} />
                                ))}
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button colorScheme="teal" variant="ghost" mr={3} onClick={handleSubmit}>
                            Create Group
                        </Button>
                        <Button variant="ghost" colorScheme="red" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;
