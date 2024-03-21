import Grid from '@mui/material/Grid'
import LeftMenu from '../components/menus/LeftMenu'
import Stack from '@mui/material/Stack'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import InputFileSearch from '../components/inputs/InputFileSearch'

import { useResizeDetector } from 'react-resize-detector'

import useModal from '../hooks/useModal'

// sx={{ width: '80%', maxWidth: '1200px !important', justifyContent: 'right', paddingBottom: '16px' }}

const MainPage = () => {

  const [open, setOpenSpriteSheetModal] = useModal("Sprite_Sheet")

  const { width: containerWidth, height: containerHeight, ref: containerRef } = useResizeDetector()

  const handleFileBrowser = (fr) => {
    localStorage.setItem("firstOpenImageFile", fr.result)
    setOpenSpriteSheetModal(true, { label: 'new' })
  }

  return (
    <Grid ref={containerRef} container sx={{ height: '100%' }}>
      <Grid item xs={8} pt={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'right', paddingRight: '30px' }}>
          <InputFileSearch icon={<AddPhotoAlternateIcon />} handleFileBrowser={handleFileBrowser}>Open Image</InputFileSearch>
        </Stack>
      </Grid>
      <Grid item xs={4} className={'left-menu-grid-setting'} sx={{ boxSizing: 'border-box' }}>
        <LeftMenu height={containerHeight} />
      </Grid>
    </Grid>
  )
}

export default MainPage
