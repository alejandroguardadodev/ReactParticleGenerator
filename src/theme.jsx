import { createTheme, styled } from '@mui/material/styles'

import FontLenktonRegular from './assets/fonts/lekton/Lekton-Regular.ttf'
import AudiowideRegular from './assets/fonts/audiowide/Audiowide-Regular.ttf'

const theme = createTheme({
    palette: {
        background: {
          default: "#083359",
        },
        primary: {
            main: '#2678BF',
            light: '#50B4F2',
        },
        ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
          },
    },
    typography: {
        h4: {
            fontSize: 18,
            fontWeight: 400,
            fontFamily: "'Lekton', sans-serif",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Lekton';
                    font-display: swap;
                    font-weight: 400;
                    src: local('Lekton'), local('Lekton-Regular'), url(${FontLenktonRegular}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'Audiowide';
                    font-display: swap;
                    font-weight: 400;
                    src: local('Audiowide'), local('Audiowide-Regular'), url(${AudiowideRegular}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
            `
        },
        MuiContainer: {
            variants: [
                {
                    props: { variant: 'no-space' },
                    style: {
                        margin: '0px !important',
                        padding: '0px !important'
                    }
                }
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "'Audiowide', sans-serif",
                    textTransform: 'capitalize',
                    fontSize: "15px",
                },
                contained: ({ variantion }) => ({
                    background: '#2678BF !Important',
                    color: 'black',

                    boxShadow: 'none !important',

                    padding: '7px 35px',

                    borderRadius: '10px 2px 10px 2px',

                    boxSizing: 'border-box !important',
                    border: '1px solid #2678BF',
                    
                    '&:hover': {
                        background: '#2678BF',

                        borderBottom: '1px solid #50B4F2',
                        borderRight: '1px solid #50B4F2',
                    },

                    ...(variantion === 'g1' && {
                        background: '#50F287 !Important',
                        border: '1px solid #50F287',

                        '&:hover': {
                            background: '#50F287',
    
                            borderBottom: '1px solid #BC51DB',
                            borderRight: '1px solid #BC51DB',
                        },
                    })
                })
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '.MuiOutlinedInput-root': {
                        fontFamily: `"Lekton", sans-serif !important`,
                        fontWeight: 400,
                        color: 'white',
                        fontSize: '.9rem',
                        background: 'rgba(0,0,0,.05)'
                    },
                    '& .MuiFormHelperText-root': {
                        fontFamily: "'Audiowide', sans-serif",
                        textTransform: 'capitalize',
                        fontSize: ".7rem"
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    boxShadow: 'none',
                    borderBottom: '1px dashed rgba(255, 255, 255, .35)'
                }
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 400,
                    fontFamily: "'Lekton', sans-serif",
                    background: 'transparent',
                }
            }
        },
    }
})

export default theme