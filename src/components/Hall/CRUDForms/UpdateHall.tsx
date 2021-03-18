import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useUpdateHallMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';



const UpdateHall = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchHalls, hall } = props;

  const fields: any = [
    {
      key: 'name',
      type:'textarea',
      defaultValue: hall.name,
      required: true,
      templateOptions:{
        label:'Hall name'
      }
    }
  ];
  const [updateHall] = useUpdateHallMutation();

  const onSubmit = (values: any) => {
    return updateHall({ variables: { id: hall.id, input: values }, refetchQueries: refetchHalls });
  };


  return (
    <>
    <Button size="sm" onClick={onOpen}>Update Hall</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hall</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors=''/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default UpdateHall
