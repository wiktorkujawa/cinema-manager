import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useLoginMutation } from '../../generated/graphql';
import ChakraForm from '../ChakraForm'

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
    key: 'password',
    type:'password',
    required: true,
    templateOptions:{
      label:'Password'
    }
  }
];

const Login = (props:any) => {

  const { refetchUser } = props;

  const [login, { error }] = useLoginMutation();
  

  const onSubmit = (values: any) => {
    return login({ variables: { input: values }, refetchQueries: refetchUser });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Button as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={onOpen}>Sign In</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button className='d-flex' as={'a'} href={'auth/google'}><i className="mx-2 fa fa-google"></i>Login with Google</Button>
            <ChakraForm fields={fields} onSubmit={onSubmit} errors={error?.message}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default Login
