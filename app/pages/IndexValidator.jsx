import { useState, useEffect } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Editor } from "../components/Editor"
import { Loader } from "../components/Loader"

import { Delete as DeleteIcon } from "@mui/icons-material"
import '../styles/IndexValidator.css'


export function IndexValidator() {

    const ClearOption = ({ ivScanid, resetStatus }) => {

        const handleClick = (e) => {
            e.preventDefault
            localStorage.removeItem('ivJsonData')
            localStorage.removeItem('ivScanid')
            resetStatus()
        }
        
        return (
            <>
                <Typography variant="span" color="white">{ivScanid}</Typography>
                <Button variant="outlined" startIcon={<DeleteIcon />} size='small' onClick={handleClick}>
                    Clear
                </Button>
            </>
        )
    }

    const [scanid, setScanid] = useState(null)
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [jsonData, setJsonData] = useState(null)
    const ivScanid = localStorage.getItem('ivScanid')
    const ivJsonData = localStorage.getItem('ivJsonData')

    const resetStatus = () => {
        setScanid(0)
        setJsonData(null)
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        const onlyNumbers = value.replace(/[^0-9]/g, '')
        e.target.value = onlyNumbers
        setScanid(onlyNumbers)
    }

    const handleClick = async (e) => {
        e.preventDefault
        setLoader(true)
        if (scanid) {
            const request = await fetch(`http://localhost:5173/api/iv/${scanid}`)
            const data = await request.json()
            console.log(data)
            if (data) {
                localStorage.setItem('ivScanid', scanid)
                localStorage.setItem('ivJsonData', jsonData)
                setLoader(false)
                setJsonData(data)
            }
        } else {
            setError(true)
            setLoader(false)
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

                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                >
                    {ivScanid && <ClearOption ivScanid={ivScanid} resetStatus={resetStatus} />}
                </Stack>
            </Box>

            {loader && <Loader />}
            {
                ivJsonData && ivScanid &&
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