import { useEffect } from 'react';
import { styled } from '@mui/material/styles'

import useClientForm from '../hooks/useClientForm';

import { SpriteSheetSchema } from '../schemas';

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

import InputBase from '../fields/InputBase';

const MainForm = styled('form')({
    height: '100%'
})

const SpriteSheetForm = ({spriteProps, onChange}) => {

    const { formPackage, onSubmit, resetFormByValues, data: formData } = useClientForm(SpriteSheetSchema, spriteProps)

    useEffect(() => {
        resetFormByValues(spriteProps)
    }, [spriteProps])

    return (
        <MainForm onSubmit={onSubmit}>
            <Stack sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} pt={2} >
                        <Grid item xs={6}>
                            <InputBase id="columns" label="Columns" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <InputBase id="rows" label="Rows" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                            <InputBase id="numberOfFrames" label="Number Of Frames" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                            <InputBase id="framesPerRows" label="Frames Per Rows" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                            <InputBase id="boxWidth" label="Box Width" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                            <InputBase id="boxHeight" label="Box Height" placeholder="Only Numbers" type="number" min={1} formPackage={formPackage} borderColor="#50F287" onChange={onChange} />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', 'justifyContent': 'flex-end' }}>
                    <Button variant="contained" type="submit" startIcon={<BrowserUpdatedIcon />} variantion="g1">Save</Button> 
                </Box>
            </Stack>
        </MainForm>
    )
}

export default SpriteSheetForm
