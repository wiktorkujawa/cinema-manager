import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import ChakraForm from '../ChakraForm';
import { useRegisterMutation } from '../../generated/graphql';

const fields: any = [
  {
    key: 'email',
    type:'text',
    required: true,
    templateOptions:{
      label:'Email'
    }
  },
  {
    key: 'displayName',
    type:'text',
    required: true,
    templateOptions:{
      label:'Name'
    }
  },
  {
    key: 'password',
    type:'password',
    required: true,
    templateOptions:{
      label:'Password'
    }
  },
  {
    key: 'password2',
    type:'password',
    required: true,
    templateOptions:{
      label:'Confirm Password'
    }
  }
];

const Register = () => {

  const [register, {data}] = useRegisterMutation();
  

  const onSubmit = (values: any) => {
    return register({ variables: { input: values } });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Button display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}
            onClick={onOpen}>Sign Up</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors={data?.register.errors!.map(({message},index) => <div key={index}> {message} </div>)}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default Register
