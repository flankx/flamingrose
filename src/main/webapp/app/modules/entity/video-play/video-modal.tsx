import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Player } from 'video-react';
import { Translate } from 'react-jhipster';
import YouTube, { YouTubeProps } from 'react-youtube';

export interface IVideoModalProps {
  showModal: boolean;
  // pic: string;
  type: string;
  code: string;
  url: string;
  handleClose: () => void;
}

const VideoModal = (props: IVideoModalProps) => {
  const { handleClose } = props;

  let video2play;
  if (props.type === 'normal') {
    video2play = <Player poster="/content/images/player_poster.png" src={props.url} autoPlay />;
  }
  if (props.type === 'youtube') {
    const opts = {
      height: '720',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const onPlayerReady: YouTubeProps['onReady'] = event => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    };
    video2play = <YouTube videoId={props.code} opts={opts} onReady={onPlayerReady} />;
  }

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} fullscreen={true} backdrop="static" autoFocus={false}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="global.menu.entities.youtube">Midea Player Center</Translate>
      </ModalHeader>
      <ModalBody>{video2play}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          <Translate contentKey="entity.action.back">Back</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VideoModal;
