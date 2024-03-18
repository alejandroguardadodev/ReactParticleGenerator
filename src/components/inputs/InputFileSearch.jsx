import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const InputFileSearch = ({ icon, handleFileBrowser, children }) => {

    const handleOpenFile = (e) => {
        let file = e.target.files[0]
    
        var fr = new FileReader()
    
        fr.onload = function () {
            handleFileBrowser(fr)
        }
    
        fr.readAsDataURL(file)
      }

    return (
        <Button variant="contained" component="label" startIcon={icon}>{children} <VisuallyHiddenInput onChange={handleOpenFile} required type="file" accept="image/png, image/gif, image/jpeg"  /></Button>
    )
}

export default InputFileSearch
