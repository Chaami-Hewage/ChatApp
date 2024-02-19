import {ChatState} from "../Context/ChatProvider";
import {Box} from "@chakra-ui/react";
import SideDrawer  from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import {useState} from "react";


const Chatpage = () => {
    const { user } = ChatState();
    const[fetchAgain, setFetchAgain] = useState(false); //when leaving a grp chat fetch the chats



    return (
        <div style={{ width: "100%" }}>
             {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                height="92vh"
                width="100%"
                p="10px"
            >
                 {user && <MyChats
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                 />}
                 {user && <ChatBox
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                 />}
            </Box>
        </div>
    );
};
export default Chatpage;
