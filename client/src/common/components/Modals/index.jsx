import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { Button, Modal } from 'react-daisyui';

export default function ModalComponent({
  children,
  title,
  onClose,
  onShow,
  actions,
  parentClass,
  buttonClass,
  buttonLabel,
  ...args
}) {
  const ref = useRef(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleHide = useCallback(() => {
    ref.current?.close();
  }, [ref])

  return <div className={`${parentClass} z-[1100!important]`}>
    <Button className={buttonClass} onClick={handleShow}>
      {buttonLabel}
    </Button>
    <Modal {...args} ref={ref} className='z-[1100!important]'>
      <Modal.Header className="font-bold ">
        <div className="flex items-center justify-between">
          {title}
          <Button onClick={handleHide}>Close</Button>
        </div>
        <div className="divider"></div>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Actions>
        <form method="dialog">
          {actions}
        </form>
      </Modal.Actions>
    </Modal>
  </div>
}


