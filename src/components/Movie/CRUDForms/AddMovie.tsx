import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreateMovieMutation, useSearchMoviesMutation } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';


const AddMovie = (props: any) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { refetchMovies } = props;
  const [createMovie,{data:errors}] = useCreateMovieMutation();

  const [searchMovies, {data}] = useSearchMoviesMutation();


  const onSearch = (event:any) => {
    return searchMovies({variables: {
      movie: event
      }
    })
  };

  const onLabel = (option:any) => `${option.Title} (${option.Year})`

  const onChange = (values:any, item:any, event:any) =>{
    values.Title = `${item.templateOptions?.options![event.target.value].Title} (${item.templateOptions?.options![event.target.value].Year})`;
    values.Poster = item.templateOptions?.options![event.target.value].Poster;
  }


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
      key: 'Poster',
      type:'text',
      required: true,
      templateOptions:{
        label:'Movie Poster',
        previewImage: true
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
      key: 'Length',
      type:'number',
      required: true,
      templateOptions:{
        label:'Movie length'
      }
    },
    {
      key: 'search',
      type:'select',
      required: true,
      templateOptions:{
        label:'Choose movie',
        optionLabel: onLabel,
        options: data?.searchMovies
      },
      expressions:{
        onFocus: onSearch,
        onChange: onChange
      }
    }
  ];

  const onSubmit = (values: any) => {
    const { search, Length, ...newValues} = values;
    return createMovie({ variables: { input: {
      Length: parseInt(Length),
      ...newValues} }, refetchQueries: refetchMovies });
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
            <ChakraForm fields={fields} onSubmit={onSubmit} errors={errors?.createMovie.errors?.message}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddMovie
