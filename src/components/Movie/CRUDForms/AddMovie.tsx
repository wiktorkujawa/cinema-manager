import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreateMovieMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';

const fields: any = [
  {
    key: 'Title',
    type:'text',
    required: true,
    templateOptions:{
      label:'Movie title'
    }
  },
  {
    key: 'Year',
    type:'text',
    required: true,
    templateOptions:{
      label:'Movie Year'
    }
  },
  {
    key: 'Poster',
    type:'text',
    required: true,
    templateOptions:{
      label:'Movie Poster'
    }
  },
  {
    key: 'Description',
    type:'textarea',
    required: true,
    templateOptions:{
      label:'Movie description'
    }
  },
  {
    key: 'search',
    type:'select',
    required: true,
    templateOptions:{
      label:'Movie description',
      options:['a','b','c']
    }
  }
];

const AddMovie = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchMovies } = props;
  const [createMovie] = useCreateMovieMutation();

  const onSubmit = (values: any) => {
    return createMovie({ variables: { input: values }, refetchQueries: refetchMovies });
  };


  return (
    <>
    <Button marginBottom={10} onClick={onOpen}>Add Movie</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors=''/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddMovie
