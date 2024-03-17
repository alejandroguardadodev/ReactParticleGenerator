import { useState, useEffect } from 'react';

import useModal from '../hooks/useModal';
import useClientForm from '../hooks/useClientForm';

import { SpriteSheetSchema } from '../schemas';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import BackupIcon from '@mui/icons-material/Backup';

import InputBase from '../fields/InputBase';

const TestPages = () => {
  const [open, setOpen] = useModal("Sprite_Sheet")

  const { formPackage, onSubmit, data: formData } = useClientForm(SpriteSheetSchema, { numberOfFrames: "1" });
  
  useEffect(() => {
    if (formData) {
      
    }
  }, [formData])

  return (
    <form onSubmit={onSubmit}>
      <Box p={3} pt={4}>
        {/* <Button variant="contained" startIcon={<OpenInBrowserIcon />} onClick={() => { setOpen(true) }}>Open Modal</Button> */}
        <Grid container spacing={2}>
          <Grid item xs={4}><InputBase id="numberOfFrames" label="Number Of Frames" placeholder="Only Numbers" type="number" formPackage={formPackage} /></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}><Button variant="contained" type="submit" startIcon={<BackupIcon />}>Submit</Button></Grid>
        </Grid>
      </Box>
    </form>
  )
}

export default TestPages
