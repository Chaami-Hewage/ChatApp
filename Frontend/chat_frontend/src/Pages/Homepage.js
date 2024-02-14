import React, { useEffect, useState } from "react";
import { ChakraProvider, Container, Box, Tabs, TabList, Tab, TabPanel, TabPanels, Text } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        setUser(userInfo);

        if (userInfo) {
            // User is logged in, redirect to /chats
            navigate('/chats');
        }
    }, [navigate]);

    return (
        <Container maxW="xl" centerContent style={{ background: "#29eecb", marginBottom: "2px" }}>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="teal.500"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans" fontWeight="bold" color="white" m="10px">
                    <center> Welcome To ChatAPP!</center>
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab style={{ color: "teal" }}>Login</Tab>
                        <Tab style={{ color: "teal" }}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {<Login />}
                        </TabPanel>
                        <TabPanel>
                            {<Signup />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default Homepage;
