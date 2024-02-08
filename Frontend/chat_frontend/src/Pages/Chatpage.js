import React, {useState} from "react";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:5000";



const Chatpage = () => {
    const [chats, setChats] = useState([]);

    const fetchChat = async () => {
        try {
            const response = await axios.get("/api/chats");
            const data = response.data; // Access the data from the response
            setChats(data); // Update the state with the fetched data
        } catch (error) {
            console.error("Error fetching chat data:", error);
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id}>
                    <p>{chat.chatName}</p>
                </div>
            ))}
        </div>
    );
};

export default Chatpage;
