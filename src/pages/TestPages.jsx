import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'

import useModal from '../hooks/useModal'

import Box from '@mui/material/Box'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import InputFileSearch from '../components/inputs/InputFileSearch';

const TestPages = () => {
  const [open, setOpenSpriteSheetModal] = useModal("Sprite_Sheet")

  const handleFileBrowser = (fr) => {
    localStorage.setItem("firstOpenImageFile", fr.result)
    setOpenSpriteSheetModal(true, { label: 'new' })
  }
  
  // useEffect(() => {
  //   if (formData) {
      
  //   }
  // }, [formData])

  return (
    <>
    {/* <form onSubmit={onSubmit}> */}
      <Box p={3} pt={4}>
        <InputFileSearch icon={<AddPhotoAlternateIcon />} handleFileBrowser={handleFileBrowser}>Open Image</InputFileSearch>
        {/* <Grid container spacing={2}>
          <Grid item xs={4}><InputBase id="numberOfFrames" label="Number Of Frames" placeholder="Only Numbers" type="number" formPackage={formPackage} /></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}><Button variant="contained" type="submit" startIcon={<BackupIcon />}>Submit</Button></Grid>
        </Grid> */}
      </Box>
    {/* </form> */}
    </>
  )
}

export default TestPages
