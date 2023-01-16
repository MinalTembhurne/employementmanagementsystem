import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalBox = (props) => {
   
  return (
   <>
    <Modal show={props.modal} onHide={props.hide} >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.delete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={props.hide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  );
}

export default ModalBox;
