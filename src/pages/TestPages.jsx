import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const TestPages = () => {
  return (
    <Box p={2}>
      <Button variant="contained" startIcon={<OpenInBrowserIcon />} onClick={() => { alert('TEST') }}>Open Modal</Button>
    </Box>
  )
}

export default TestPages
