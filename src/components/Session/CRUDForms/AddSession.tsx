import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreateSessionMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';

const fields: any = [
  {
    key: 'name',
    type:'text',
    required: true,
    templateOptions:{
      label:'Session name'
    }
  },
  {
    key: 'start_time',
    type:'datetime',
    required: true,
    templateOptions:{
      label:'Session start'
    }
  },
  {
    key: 'duration',
    type:'number',
    required: true,
    templateOptions:{
      label:'Session length'
    }
  },

];

const AddSession = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchSessions, hall_name } = props;
  const [createSession] = useCreateSessionMutation();

  const onSubmit = (values: any) => {
    values.duration=parseInt(values.duration);
    return createSession({ variables: { input: {
      hall: hall_name,
      ...values} }, refetchQueries: refetchSessions });
  };


  return (
    <>
    <Button size='sm' onClick={onOpen}>Add Session</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors=''/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddSession
