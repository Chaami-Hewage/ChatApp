import React from "react";
import {
    Button, IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";





const UpdateGroupChatModal = ({fetchMessages, fetchAgain, setFetchAgain}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()


    return (
        <div>
            <IconButton aria-label="Update Group Chat" icon={<EditIcon/>} onClick={onOpen}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Add your form here */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default UpdateGroupChatModal;
