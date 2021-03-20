import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useCreateSessionMutation, useMoviesQuery } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';



const AddSession = (props: any) => {
  const { data } = useMoviesQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createSession] = useCreateSessionMutation();
   

  if(!data?.movies){
    return <div>loading...</div>
  }


  
  const onLabel = (option:any) => option.Title
 
  const onChange = (item:any, event:any) =>{
    
    return [
      {
        title: item.templateOptions?.options![event.target.value].Title
      },
      {
        duration:item.templateOptions?.options![event.target.value].Length
      }]
  }

  const fields: any = [
    {
      key: 'title',
      type:'text',
      id:'title',
      required: true,
      templateOptions:{
        label:'Session title'
      }
    },
    {
      key: 'notes',
      type:'textarea',
      required: true,
      templateOptions:{
        label:'Notes about Session'
      }
    },
    {
      key: 'startDate',
      type:'datetime',
      required: true,
      templateOptions:{
        label:'Session start'
      }
    },
    {
      key: 'duration',
      type:'number',
      id:'duration',
      required: true,
      templateOptions:{
        label:'Session length'
      }
    },
    {
      key: 'search',
      type:'select',
      required: true,
      templateOptions:{
        label:'Movie description',
        options: data.movies,
        optionLabel: onLabel
      },
      expressions:{
        onChange: onChange
      }
    }
  
  ];

  const { refetchSessions, hall_name } = props;


  const onSubmit = (values: any) => {
    let { search, ...newValues} = values;
    newValues.duration=parseInt(values.duration);
    return createSession({ variables: { input: {
      hall: hall_name,
      ...newValues} }, refetchQueries: refetchSessions });
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
