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

const UpdateGroupChat = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [renameloading, setRenameLoading] = React.useState(false);

    const toast = useToast();

    const handleRemove = async (user) => {
        // Implement your logic to handle user removal
    };

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
                                <UserBadgeItem key={user.id} user={user} handleFunction={() => handleRemove(user)} />
                            ))}
                        </Box>
                    </ModalBody>
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
