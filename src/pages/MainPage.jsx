import Grid from '@mui/material/Grid'
import LeftMenu from '../components/menus/LeftMenu'
import Stack from '@mui/material/Stack'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import InputFileSearch from '../components/inputs/InputFileSearch'

import { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import useModal from '../hooks/useModal'
import useAnimationMenu from '../hooks/useAnimationMenu'

import SpriteAnimationCanvas from '../canvas/SpriteAnimationCanvas'
import SpriteInformationView from '../components/views/SpriteInformationView'

// sx={{ width: '80%', maxWidth: '1200px !important', justifyContent: 'right', paddingBottom: '16px' }}

const MainPage = () => {

  const [open, setOpenSpriteSheetModal] = useModal("Sprite_Sheet")
  const { defineAnimationMenuWidth, openAnimationMenu, handleCloseAnimationMenu } = useAnimationMenu()

  const { width: containerWidth, height: containerHeight, ref: containerRef } = useResizeDetector()
  const { width: animationContainerWidth, height: animationContainerHeight, ref: animationContainerRef } = useResizeDetector()
  const { width: leftMenuContainerWidth, ref: leftMenuContainerRef  } = useResizeDetector()

  const handleFileBrowser = (fr) => {
    localStorage.setItem("firstOpenImageFile", fr.result)
    setOpenSpriteSheetModal(true, { label: 'new' })
    handleCloseAnimationMenu()
  }

  useEffect(() => {
    if (leftMenuContainerWidth > 0) defineAnimationMenuWidth(leftMenuContainerWidth)
  }, [leftMenuContainerWidth])

  return (
    <Grid ref={containerRef} container sx={{ height: '100%' }}>
      <Grid item xs={8} pt={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'right', paddingRight: '30px' }}>
          <InputFileSearch icon={<AddPhotoAlternateIcon />} handleFileBrowser={handleFileBrowser}>Open Image</InputFileSearch>
        </Stack>
        <Grid container p={5} sx={{ flexGrow: 1 }}>
          <Grid ref={animationContainerRef} item xs={openAnimationMenu? 8 : 12}>
            <SpriteAnimationCanvas containerWidth={animationContainerWidth} containerHeight={animationContainerHeight} isAnimationMenuOpen={openAnimationMenu} />
          </Grid>
          { openAnimationMenu && (<Grid item xs={4} pl={5}>
            <SpriteInformationView open={openAnimationMenu} />
          </Grid>) }
        </Grid>
      </Grid>
      <Grid ref={leftMenuContainerRef} item xs={4} className={'left-menu-grid-setting'} sx={{ boxSizing: 'border-box' }}>
        <LeftMenu height={containerHeight} />
      </Grid>
    </Grid>
  )
}

export default MainPage
