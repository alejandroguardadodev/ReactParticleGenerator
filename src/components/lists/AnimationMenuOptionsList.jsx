import { useState, useEffect } from 'react'
import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import List from '@mui/material/List'

import alertify from 'alertifyjs'

import AnimationOptionItemCard from './cards/AnimationOptionItemCard'
import SpriteAnimationMenuForm from '../../forms/SpriteAnimationMenuForm'

import useAnimationMenu from '../../hooks/useAnimationMenu'

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

const AnimationMenuOptionsList = ({sprite}) => {

    const [animationCurveOpts, setAnimationCurveOpts] = useState(initAnimationCurveOptions)
    const { animationPath, setAnimationPath, hasAnimationPath } = useAnimationMenu()

    const getJSONCurveAnimation = () => {
        let strCurveAnimations = null, jsonCurveAnimations = {}

        if ((strCurveAnimations = localStorage.getItem("curveAnimations")) !== null && strCurveAnimations !== undefined && strCurveAnimations !== "")
            jsonCurveAnimations = JSON.parse(strCurveAnimations)

        return jsonCurveAnimations
    }

    // UPDATE ANIMATION BY FIELDS CHANGES
    const onChange = (id, value) => {
        let newProps = {
            [id]: value
        }

        setAnimationPath({
            ...animationPath,
            ...newProps
        });
    }

    // WHEN WE REALIZE ANY CHANGE
    const onUpdate = (data) => {
        
        const { id: spriteId } = sprite

        const curveSpriteKey = `curve_anim_${spriteId}`
        let strCurveAnimations = null, jsonCurveAnimations = {}

        if ((strCurveAnimations = localStorage.getItem("curveAnimations")) !== null && strCurveAnimations !== undefined && strCurveAnimations !== "")
            jsonCurveAnimations = JSON.parse(strCurveAnimations)

        jsonCurveAnimations[curveSpriteKey] = {
            angle: `${data.angle}`,
            angleSpeed: `${data.angleSpeed}`,
            curve: `${data.curve}`
        }

        setAnimationPath({
            ...jsonCurveAnimations[curveSpriteKey]
        });

        localStorage.setItem("curveAnimations", JSON.stringify(jsonCurveAnimations))

        alertify.success('Curve Settings Updated'); 
    }

    // UPDATE ANIMATION PATH
    useEffect(() => {
        if (sprite === null || Object.keys(sprite).length === 0) return

        const { id: spriteId } = sprite

        const curveSpriteKey = `curve_anim_${spriteId}`
        const jsonCurveAnimations = getJSONCurveAnimation()

        if(jsonCurveAnimations[curveSpriteKey]) { // THERE IS ANY OPTION
            const objCurve = jsonCurveAnimations[curveSpriteKey]

            const dataCurve = {
                angle: objCurve.angle,
                angleSpeed: objCurve.angleSpeed,
                curve: objCurve.curve
            }

            setAnimationCurveOpts(dataCurve)
            setAnimationPath(dataCurve)

        } else {
            setAnimationCurveOpts({ ...initAnimationCurveOptions })
            setAnimationPath({ ...initAnimationCurveOptions })
        }

    }, [sprite])

    return (
        <Container>
            <List sx={{ width: '100%' }}>
                <AnimationOptionItemCard title="Curve Setting">
                    <SpriteAnimationMenuForm schemaProps={animationCurveOpts} sprite={sprite} onUpdate={onUpdate} onChange={onChange} />
                </ AnimationOptionItemCard>
            </List>
        </Container>
    )
}

export default AnimationMenuOptionsList