import React, { useState } from "react";
import {
    Box,
    Button,
    Tooltip,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuDivider,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    ChakraProvider,
    useToast,
} from "@chakra-ui/react";
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import { ChatIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./profileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "./UserListItem";


function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const logout= () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("user");
        navigate("/");
    };

    const searchUser = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/users?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chats`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <ChakraProvider>
            <>
                <Box
                    d={{ base: "none", md: "flex" }}
                    alignItems="center"
                    bg={"#96dee7"}
                    p="10px 20px 10px 10px"
                >
                    <Tooltip label="Search users...." hasArrow placement="bottom-end">
                        <Button variant="ghost" mr={2} onClick={onOpen}>
                            <PersonSearchRoundedIcon />
                            <Text d={{ base: "none", md: "flex" }}>Search in chats..</Text>
                        </Button>
                    </Tooltip>

                    <Menu>
                        <MenuButton as={Button} p={1} mr={2}>
                            <ChatIcon />
                        </MenuButton>
                        <MenuList pl={2}>
                            <MenuItem>Option 1</MenuItem>
                            <MenuItem>Option 2</MenuItem>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton
                            as={Button}
                            bg="white"
                            rightIcon={<ChevronDownIcon />}
                            ml={0}
                            style={{ marginLeft: 0 }}
                        >
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                {/* Use ProfileModal like a regular component */}
                                <ProfileModal user={user}>
                                    My Profile
                                </ProfileModal>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="2px">Search for a Name...</DrawerHeader>
                        <DrawerBody>
                            <Box d="flex" pb={2} w="100%" justifyContent="space-between" alignItems="center">
                                <Box flex="1">
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search..."
                                    />
                                </Box>
                                <Button onClick={searchUser} colorScheme="teal" marginTop="5px" alignItems="center">
                                    Search
                                </Button>
                            </Box>
                            {loading ? (
                                <Text mt={5}>Loading...</Text>
                            ) : (
                                searchResults.map((resultUser) => (
                                    <UserListItem
                                        key={resultUser._id}
                                        user={resultUser}
                                        handleFunction={() => accessChat(resultUser._id)}
                                    />
                                ))
                            )}

                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        </ChakraProvider>
    );
};

export default SideDrawer;
