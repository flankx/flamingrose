import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Player } from 'video-react';
import { Translate } from 'react-jhipster';

export interface IVideoModalProps {
  showModal: boolean;
  // pic: string;
  url: string;
  handleClose: () => void;
}

const VideoModal = (props: IVideoModalProps) => {
  const { handleClose } = props;

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} fullscreen={true} backdrop="static" autoFocus={false}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="global.menu.entities.youtube">Midea Player Center</Translate>
      </ModalHeader>
      <ModalBody>
        <Player poster="/content/images/player_poster.png" src={props.url} autoPlay />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          <Translate contentKey="entity.action.back">Back</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VideoModal;
