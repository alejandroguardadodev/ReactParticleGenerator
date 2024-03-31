import { useResizeDetector } from 'react-resize-detector'

import { useMemo } from 'react'

import useCanvas from '../../hooks/useCanvas'
import useDrawCanvasSprite from '../../hooks/useDrawCanvasSprite'
import useAnimationMenu from '../../hooks/useAnimationMenu'

import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Canvas = styled('canvas') (({ theme }) => ({
    borderRadius: '3px',
    boxShadow: '0px 0px 30px -11px rgba(0,0,0,0.55)',
    border: '1px solid rgba(255,255,255,.3)',
}))

const ShowInfoTypography = styled(Typography) (({ theme }) => ({
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    paddingLeft: '10px',
}))

const SpriteInformationView = ({open}) => {

    const { currentSprite } = useAnimationMenu()
    const { width: containerWidth, height: containerHeight, ref: containerRef } = useResizeDetector()

    const realContainerHeight = useMemo(() => Math.floor(containerWidth * .7), [containerWidth])

    const { drawBackground, drawSpriteForFullBox, spriteBoxWidth, spriteBoxHeight } = useDrawCanvasSprite({ sprite: currentSprite, isAnimated: true })

    const { canvasRef } = useCanvas(containerWidth, realContainerHeight, open, ctx => {
        drawBackground(ctx, '#143D61')

        drawSpriteForFullBox(ctx)
    })

    return (
        <Box ref={containerRef} sx={{ width: '100%' }}>
            <Canvas ref={canvasRef} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography color="white" variant="subtitle1" gutterBottom>Box Width:</Typography>
                    <ShowInfoTypography color="white" variant="body1" gutterBottom>{spriteBoxWidth}px</ShowInfoTypography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color="white" variant="subtitle1" gutterBottom>Box Height:</Typography>
                    <ShowInfoTypography color="white" variant="body1" gutterBottom>{spriteBoxHeight}px</ShowInfoTypography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SpriteInformationView