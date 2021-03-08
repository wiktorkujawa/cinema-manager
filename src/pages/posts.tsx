import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
  // ModalFooter,
   ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ChakraForm from '../components/ChakraForm';

const fields: any = [
  {
    key: 'date',
    type:'datetime',
    required: true,
    templateOptions:{
      label:'Date'
    }
  },
  {
    key:'range',
    type: 'range',
    required: true,
    templateOptions:{
      label: 'Range'
    },
    validators:{
      min:5,
      max:10
    }
  },

];

const Posts = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Add Post</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Posts