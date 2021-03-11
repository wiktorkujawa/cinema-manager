import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useUpdatePostMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';



const UpdatePost = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchPosts, post } = props;

  const fields: any = [
    {
      key: 'content',
      type:'textarea',
      defaultValue: post.content,
      required: true,
      templateOptions:{
        label:'Content'
      }
    }
  ];
  const [updatePost] = useUpdatePostMutation();

  const onSubmit = (values: any) => {
    return updatePost({ variables: { id: post.id, input: values }, refetchQueries: refetchPosts });
  };


  return (
    <>
    <Button size="xs" onClick={onOpen}>Update Post</Button>

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

export default UpdatePost
