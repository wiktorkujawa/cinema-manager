import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreateHallMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';

const fields: any = [
  {
    key: 'name',
    type:'text',
    required: true,
    templateOptions:{
      label:'Hall name'
    }
  }
];

const AddHall = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchHalls } = props;
  const [createHall, {data}] = useCreateHallMutation();

  const onSubmit = (values: any) => {
    return createHall({ variables: { input: values },  refetchQueries: refetchHalls });
  };

  // console.log(error);

  return (
    <>
    <Button marginBottom={10} onClick={onOpen}>Add Hall</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hall</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors={data?.createHall.errors?.message}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddHall
