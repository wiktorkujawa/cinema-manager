import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreatePostMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';

const fields: any = [
  {
    key: 'content',
    type:'textarea',
    required: true,
    templateOptions:{
      label:'Content'
    }
  }
];

const AddPost = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchPosts } = props;
  const [createPost] = useCreatePostMutation();

  const onSubmit = (values: any) => {
    return createPost({ variables: { input: values }, refetchQueries: refetchPosts });
  };


  return (
    <>
    <Button onClick={onOpen}>Add Post</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors=''/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddPost
