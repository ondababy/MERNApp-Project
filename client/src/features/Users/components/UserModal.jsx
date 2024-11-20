import React from 'react';
import {
  Button,
  Modal
} from 'react-daisyui';
import { useSelector } from 'react-redux';
import UserForm from './UserForm';

export default function UserModal() {
  const { showProfile, userInfo } = useSelector(state => state.auth);
  const id = userInfo?.id;
  const {
    Dialog,
    handleShow
  } = Modal.useDialog();

  React.useEffect(() => {

    if (showProfile) {
      handleShow();
    }
  }, [showProfile]);

  const handleClose = () => {
    onClose();
  }

  const handleSave = () => { }


  return id && <div className="font-sans">
    <Dialog className='w-11/12 max-w-5xl border border-red-400 animate__animated animate__fadeInDown '>
      <Modal.Header className="font-bold">
        Your Profile
      </Modal.Header>
      <Modal.Body>


        <UserForm id={id} action='edit' />

        <div className="divider"></div>
      </Modal.Body>
      <Modal.Actions>
        <form method="dialog">
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} className='btn-success'>Save</Button>
        </form>
      </Modal.Actions>
    </Dialog>
  </div>

}
