import { useState } from 'react';

import useModal from '../hooks/useModal';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const TestPages = () => {
  const [open, setOpen] = useModal("Sprite_Sheet")

  return (
    <>
      <Box p={2}>
        <Button variant="contained" startIcon={<OpenInBrowserIcon />} onClick={() => { setOpen(true) }}>Open Modal</Button>
      </Box>
    </>
  )
}

export default TestPages
