import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useMoveSessionMutation, useHallsQuery } from '../../../generated/graphql';
import ChakraForm from '../../ChakraForm';
import { EditIcon } from '@chakra-ui/icons'



const UpdateSession = (props: any) => {
  const { data } = useHallsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [moveSession, {data:errors}] = useMoveSessionMutation();
   

  if(!data?.halls){
    return <div>loading...</div>
  }

  const onLabel = (option:any) => option.name;

  const { refetchSessions, session, user } = props;

  const fields: any = [
    {
      key: 'title',
      type:'text',
      id:'title',
      defaultValue: session.title,
      required: true,
      templateOptions:{
        label:'Session title'
      }
    },
    {
      key: 'notes',
      type:'textarea',
      defaultValue: session.notes,
      required: true,
      templateOptions:{
        label:'Notes about Session'
      }
    },
    {
      key: 'startDate',
      type:'datetime',
      required: true,
      defaultValue: session.startDate,
      templateOptions:{
        label:'Session start'
      }
    },
    {
      key: 'endDate',
      type:'datetime',
      defaultValue: session.endDate,
      required: true,
      templateOptions:{
        label:'Session end'
      }
    },
    {
      key: 'hall',
      type:'select',
      required: true,
      templateOptions:{
        label:'Hall',
        options: data.halls,
        optionLabel: onLabel
      }
    }
  
  ];


  const onSubmit = (values: any) => {
    
    const { hall, ...input} = values;
    const new_hall_id = data!.halls![hall].id;

    return moveSession({variables:{
      input: {
        id: parseInt(session.id),
        hallId: new_hall_id,
        ...input
      }
    }, refetchQueries: refetchSessions
  })

  };


  return (
    <>
    <Button colorScheme="messenger" size='xs' disabled={!user} onClick={onOpen}><EditIcon/></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors={errors?.moveSession.errors?.message}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default UpdateSession
