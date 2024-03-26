import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import List from '@mui/material/List'

import AnimationOptionItemCard from './cards/AnimationOptionItemCard'

import SpriteAnimationMenuForm from '../../forms/SpriteAnimationMenuForm'

const Container = styled(Box)(() => ({
    width: '100%',
    flexGrow: 1,
    padding: '0px 1%',
}))

const initAnimationCurveOptions = {
    angle: '0',
    angleSpeed: '0',
    curve: '0'
}

const AnimationMenuOptionsList = ({}) => {
  return (
    <Container>
        <List sx={{ width: '100%' }}>
            <AnimationOptionItemCard title="Curve Setting">
                <SpriteAnimationMenuForm schemaProps={initAnimationCurveOptions} />
            </ AnimationOptionItemCard>
        </List>
    </Container>
  )
}

export default AnimationMenuOptionsList