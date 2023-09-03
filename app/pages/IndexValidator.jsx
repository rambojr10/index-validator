import PropTypes from "prop-types"
import { useState } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { Editor } from "../components/Editor"
import { Loader } from "../components/Loader"

import { Delete as DeleteIcon } from "@mui/icons-material"
import '../styles/IndexValidator.css'

export function IndexValidator() {

    const [scanid, setScanid] = useState(null)
    const [scanidWithData, setScanidWithData] = useState(null)
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [jsonData, setJsonData] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const ClearOption = ({ id }) => {
        const handleClick = (e) => {
            e.preventDefault
            setScanid(0)
            setScanidWithData(null)
            setJsonData(null)
            setShowAlert(false)
        }
        return (
            <>
                <Typography variant="span" color="white">{id}</Typography>
                <Button variant="outlined" startIcon={<DeleteIcon />} size='small' onClick={handleClick}>
                    Clear
                </Button>
            </>
        )
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        const onlyNumbers = value.replace(/[^0-9]/g, '')
        e.target.value = onlyNumbers
        setScanid(value)
        setError(false)
    }

    const handleClick = async (e) => {
        e.preventDefault
        if (scanid && !scanidWithData) {
            setLoader(true)
            const request = await fetch(`http://localhost:5173/api/iv/${scanid}`)
            const data = await request.json()
            if (data.type === 'error') {
                setError(true)
                setLoader(false)
                setShowAlert(data)
                setTimeout(() => {
                    setShowAlert(false)
                }, 5000)
                return
            } 

            if (data.AssignedTags && data.UnassignedTags) {
                console.log(data)
                setLoader(false)
                setScanidWithData(scanid)
                setJsonData(data)
                return
            }

            setError(true)

        } else {
            setError(true)
        }
    }

    return (
        <Stack
            spacing={2}
            direction='column'
            mb={2}
        >

            <Box
                component='form'
                id='form_index_validator'
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                >
                    <TextField
                        id="filled-basic"
                        label="Scanid"
                        variant="filled"
                        size="small"
                        color="warning"
                        inputProps={{ pattern: '[0-9]*' }}
                        onChange={handleInputChange}
                        error={error}
                    />
                    <Button
                        variant="outlined"
                        size="large"
                        color="warning"
                        onClick={handleClick}
                    >
                        Validate
                    </Button>

                </Stack>
                
                {/* Agrega un button cancelar para cancelar la petición */}
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                >
                    {scanidWithData && <ClearOption id={scanidWithData} />}
                </Stack>
            </Box>

            {loader && <Loader />}
            {showAlert && !loader && <Alert severity={showAlert.type}>{showAlert.message}</Alert>}
            {
                jsonData && scanidWithData &&
                <Stack
                    gap={2}
                    direction='column'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    id='container_editors_index_validator'
                >
                    <Paper elevation={2} sx={{
                        p: .5,
                        flexGrow: 1,
                    }}>
                        <Stack direction='column' textAlign='center'>
                            <Typography variant='span'>Asssigned Tags</Typography>
                            <Editor
                                mode="json"
                                name="ASSIGNED_TAGS"
                                value={JSON.stringify(jsonData?.AssignedTags, null, 2)}
                            />
                        </Stack>
                    </Paper>
                    <Paper elevation={2} sx={{
                        p: .5,
                        flexGrow: 1,
                    }}>
                        <Stack direction='column' textAlign='center'>
                            <Typography variant='span'>Unasssigned Tags</Typography>
                            <Editor
                                mode="json"
                                name="UNASSIGNED_TAGS"
                                value={JSON.stringify(jsonData?.UnassignedTags, null, 2)}
                            />
                        </Stack>
                    </Paper>
                </Stack>
            }

        </Stack>
    )

}

IndexValidator.propTypes = {
    id: PropTypes.string
}