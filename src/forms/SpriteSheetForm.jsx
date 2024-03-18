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

const SpriteSheetForm = () => {

    const { formPackage, onSubmit, data: formData } = useClientForm(SpriteSheetSchema, { numberOfFrames: "1", framesPerRows: "1" })

    return (
        <MainForm onSubmit={onSubmit}>
            <Stack sx={{ width: '100%', height: '100%' }}>
                <Grid container spacing={2} pt={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={6}>
                        <InputBase id="numberOfFrames" label="Number Of Frames" placeholder="Only Numbers" type="number" formPackage={formPackage} borderColor="#50F287" />
                    </Grid>
                    <Grid item xs={6}>
                        <InputBase id="framesPerRows" label="Frames Per Rows" placeholder="Only Numbers" type="number" formPackage={formPackage} borderColor="#50F287" />
                    </Grid>
                </Grid>
                <Box sx={{ width: '100%', display: 'flex', 'justifyContent': 'flex-end' }}>
                    <Button variant="contained" type="submit" startIcon={<BrowserUpdatedIcon />}>Save</Button>
                </Box>
            </Stack>
        </MainForm>
    )
}

export default SpriteSheetForm
