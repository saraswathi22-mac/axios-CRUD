import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
  FormLabel,
  Input,
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { addNewUser, updateUser, deleteUser } from "../../store/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import DeleteUserModel from "./DeleteUserModel";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddUser = () => {
  const modalAddButton = useDisclosure();
  const modalDeleteButton = useDisclosure();
  const modalErrorButton = useDisclosure();

  const cancelRefError = React.useRef<HTMLDivElement>(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const [user_name, setUserName] = useState<string | undefined>("");
  const [user_email, setUserEmail] = useState<string | undefined>("");
  const [user_address, setUserAddress] = useState<string | undefined>("");
  const [ids, setId] = useState<string | undefined>("");
  const [selectedId, setSelectedId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const isError = user_name === "";

  const userList = useAppSelector((state) => state.user.userList);

  const handleOnSubmit = () => {
    if (ids) {
      modalAddButton.onClose();
      dispatch(
        updateUser({ user_name, user_address, user_email, user_id: ids })
      );
      clearInputs();
      return;
    } else {
      if (user_name && user_email && user_address) {
        const user = {
          user_name,
          user_email,
          user_address,
          user_id: uuidv4(),
        };
        let oldData = JSON.parse(localStorage.getItem("user") as string) || [];

        localStorage.setItem("user", JSON.stringify([...oldData, user]));
        dispatch(addNewUser(user));
        clearInputs();
        modalAddButton.onClose();
      } else {
        modalErrorButton.onOpen();
        setShowAlert(true);
      }
    }
  };

  const clearInputs = () => {
    setUserName("");
    setUserEmail("");
    setUserAddress("");
    setId("");
  };

  const openDeleteAlert = (id: any) => {
    setSelectedId(id);
    modalDeleteButton.onOpen();
  };

  const something = (event: any) => {
    if (event.keyCode === 13) {
      handleOnSubmit();
    }
  };

  const editData = (user: any) => {
    modalAddButton.onOpen();
    setUserName(user.user_name);
    setUserEmail(user.user_email);
    setUserAddress(user.user_address);
    setId(user.id);
    return;
  };

  const handleDelete = (id: any) => {
    dispatch(deleteUser(id));
    modalDeleteButton.onClose();
    clearInputs();
  };

  const onCancel = () => {
    modalAddButton.onClose();
    clearInputs();
  };

  return (
    <Box>
      <Box>
        {showAlert && (
          <AlertDialog
            isOpen={modalErrorButton.isOpen}
            leastDestructiveRef={cancelRefError}
            onClose={modalErrorButton.onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Alert
                </AlertDialogHeader>
                <AlertDialogBody>
                  Please fill all required fields
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    colorScheme="red"
                    onClick={modalErrorButton.onClose}
                    ml={3}
                  >
                    Ok
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Box>
      <Box w="100%">
        <Box marginTop={"20px"} textAlign={"center"}>
          <Text
            fontSize={"25"}
            textDecoration={"underline"}
            textDecorationColor={"gray"}
            textDecorationThickness={"4px"}
            fontWeight="bold"
            marginBottom={"5"}
          >
            Book Details
          </Text>
        </Box>
        <Box margin="20px">
          <Box
            display={"flex"}
            flexDirection="column"
            justifyItems={"flex-start"}
            px="15px"
            py="15px"
            w="100%"
          >
            <Box textAlign={"end"} marginBottom={"5"}>
              <Button onClick={modalAddButton.onOpen} colorScheme="green">
                ADD
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={modalAddButton.isOpen}
                onClose={modalAddButton.onClose}
                isCentered={true}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Your Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isRequired isInvalid={isError}>
                      <FormLabel>User Name</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        ref={initialRef}
                        value={user_name}
                        placeholder="Enter Title"
                        onChange={(e) => setUserName(e.currentTarget.value)}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={isError}>
                      <FormLabel>User Email</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        value={user_email}
                        placeholder="Enter Author"
                        blur={user_email}
                        onChange={(e) => setUserEmail(e.currentTarget.value)}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={isError}>
                      <FormLabel>User Address</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        value={user_address}
                        placeholder="Enter Author"
                        blur={user_address}
                        onChange={(e) => setUserAddress(e.currentTarget.value)}
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleOnSubmit}>
                      Save
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <TableContainer
              w="100%"
              display="block"
              height="550px"
              overflowY="auto"
            >
              <Table
                borderBlock={"2px solid"}
                variant="striped"
                colorScheme="teal"
              >
                <Thead borderBlockEnd={"2px solid"}>
                  <Tr>
                    <Th textAlign={"center"} fontSize={"16"}>
                      User Name
                    </Th>
                    <Th textAlign={"center"} fontSize={"16"}>
                      User Email
                    </Th>
                    <Th textAlign={"center"} fontSize={"16"}>
                      User Address
                    </Th>
                    <Th textAlign={"end"} fontSize={"16"}>
                      ACTIONS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userList?.map((user) => (
                    <Tr key={user.user_id}>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {user.user_name}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {user.user_email}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {user.user_address}
                      </Td>
                      <Td textAlign={"end"} fontSize={"16"}>
                        <IconButton
                          color="#fff"
                          backgroundColor={"blackAlpha.600"}
                          aria-label=""
                          icon={<EditIcon />}
                          marginRight="1rem"
                          onClick={() => editData(user)}
                        />
                        <IconButton
                          color="#1a202c"
                          backgroundColor={"whitesmoke"}
                          border={"1px solid"}
                          aria-label=""
                          icon={<DeleteIcon />}
                          onClick={() => openDeleteAlert(user.user_id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <DeleteUserModel
              isOpen={modalDeleteButton.isOpen}
              onClose={modalDeleteButton.onClose}
              handleDelete={handleDelete}
              selectedId={selectedId}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
