import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ModalBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "modalPosition" && prop !== 'modalSize',
})
(({ theme, modalPosition, modalSize }) => ({
    position: 'absolute',
    padding: '16px',
    paddingBottom: '0px',
    borderRadius: '5px',
    
    background: '#272727',
    border: '1px solid #50F287',
    boxShadow: 24,

    ...(modalSize == 'large' && {
        width: '80%',
        height: '80%',
        maxWidth: '1500px',
        maxHeight: '1200px',
    }),

    ...(modalPosition == 'center' && {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }),
}))

const ModalBase = ({open, handleClose, children, modalPosition, modalSize}) => {
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
              timeout: 500,
            },
        }}
    >
      <Fade in={open}>
        <ModalBox modalPosition={modalPosition} modalSize={modalSize}>
            {children}
        </ModalBox>
      </Fade>
    </Modal>
  )
}

ModalBase.propTypes = {
    modalPosition: PropTypes.string,
    modalSize: PropTypes.string,
}; 

ModalBase.defaultProps = {
    modalPosition: 'center',
    modalSize: 'large'
};
  
export default ModalBase
