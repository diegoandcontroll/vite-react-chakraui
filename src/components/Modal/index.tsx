import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import { useAuth } from '~/hooks/authContext';
import { useHistory } from 'react-router-dom';
type ModalProps = {
  isChangePassword?: boolean;
};
export const ModalUpdateProfile = ({ isChangePassword }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cookies = new Cookies();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const idUser: string = cookies.get('id.user');
  const nameLocalStorage: string = window.localStorage.getItem('user.name');
  const photoUrlLocalStorage: string = window.localStorage.getItem('user.photoUrl');
  const [nameState, setName] = useState(nameLocalStorage || '');
  const [photoUrlState, setPhotoUrl] = useState(photoUrlLocalStorage || '');
  const [passwordState, setPassword] = useState<string>('');
  const { handleUpdate } = useAuth();
  const history = useHistory();
  const toast = useToast();
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      if (isChangePassword) {
        await handleUpdate({
          id: idUser,
          password: passwordState,
        });
        toast({
          title: 'Password update',
          description: 'Password successfully updated',
          status: 'success',
          duration: 3500,
          isClosable: true,
        });
        onClose();
        history.push('/profile');
      } else {
        await handleUpdate({
          id: idUser,
          name: nameState,
          photoUrl: photoUrlState,
        });
        toast({
          title: 'Profile update',
          description: 'Profile successfully updated',
          status: 'success',
          duration: 3500,
          isClosable: true,
        });
        onClose();
        history.push('/profile');
      }
    } catch (e) {
      toast({
        title: 'Profile update',
        description: 'Error to update',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
      console.log(e);
    }
  };
  return (
    <>
      <Button onClick={onOpen} mr='4'>
        {isChangePassword ? 'Change Password' : 'Update Profile'}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={(e: any) => handleSubmit(e)}>
          <ModalHeader>{isChangePassword ? 'Change Password' : 'Update Profile'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isChangePassword ? (
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Password'
                  value={passwordState}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder='Name'
                    value={nameState}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>PhotoUrl</FormLabel>
                  <Input
                    placeholder='PhotoUrl'
                    value={photoUrlState}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
