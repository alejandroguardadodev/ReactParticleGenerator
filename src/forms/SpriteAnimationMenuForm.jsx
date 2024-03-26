import { useEffect } from 'react';
import { styled } from '@mui/material/styles'

import useClientForm from '../hooks/useClientForm'

import { SpriteAnimationSchema } from '../schemas'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import InputBase from '../fields/InputBase'

const MainForm = styled('form')({

})

const SpriteAnimationMenuForm = ({ schemaProps }) => {

    const { formPackage, onSubmit, resetFormByValues, data: formData } = useClientForm(SpriteAnimationSchema, schemaProps)

    return (
        <MainForm onSubmit={onSubmit}>
            <Stack sx={{ width: '100%' }}>
                <Grid container spacing={2} pt={2}>
                    <Grid item xs={6}>
                        <InputBase id="angle" label="Angle" placeholder="Only Numbers" type="number" min={0} formPackage={formPackage} borderColor="#252424" fontColor="black" onChange={() => {}} noBackground/>
                    </Grid>
                    <Grid item xs={6}>
                        <InputBase id="angleSpeed" label="Angle Speed" placeholder="Only Numbers" type="number" min={0} formPackage={formPackage} borderColor="#252424" fontColor="black" onChange={() => {}} noBackground/>
                    </Grid>
                    <Grid item xs={6} mt={2}>
                        <InputBase id="curve" label="Curve" placeholder="Only Numbers" type="number" min={0} formPackage={formPackage} borderColor="#252424" fontColor="black" onChange={() => {}} noBackground/>
                    </Grid>
                </Grid>
            </Stack>
        </MainForm>
    )
}

export default SpriteAnimationMenuForm