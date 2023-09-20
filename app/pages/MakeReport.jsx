import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'
registerAllModules()

import { HotTable } from '@handsontable/react'
import { Toaster, toast } from 'sonner'
import {
    Box,
    Button,
    Stack,
    TextField
} from '@mui/material'
import { useRef, useState } from 'react'

import { withoutSpace, makeTemplate } from '../utils/MakeReport'

export function MakeReport() {
    const hotRef = useRef(null)
    const [rows, setRows] = useState(null)

    const colHeaders = [
        'Scanid', 'Empcode', 'Indexer', 'Type', 'Feedtype',
        'Status', 'Reported', 'To report', 'States of dates',
        'Comment', 'QA Owner', 'Warning', 'Print'
    ]
    const columns = [
        {
            data: 'scanid',
            type: 'text',
        },
        {
            data: 'empcode',
            type: 'text',
        },
        {
            data: 'indexer',
            type: 'text',
        },
        {
            data: 'type',
            type: 'text'
        },
        {
            data: 'feedtype',
            type: 'text'
        },
        {
            data: 'status',
            type: 'text'
        },
        {
            data: 'reported',
            type: 'text'
        },
        {
            data: 'toReport',
            type: 'text'
        },
        {
            data: 'dates',
            type: 'text'
        },
        {
            data: 'comment',
            type: 'text'
        },
        {
            data: 'qa',
            type: 'text',
        },
        {
            data: 'warning',
            type: 'text',
        },
        {
            data: 'print',
            type: 'text',
        }
    ]

    const handleInputRows = async (e) => {
        const { value } = e.target
        if (value < 1) {
            e.target.value = 0
            setRows(null)
            return
        }

        const newRows = value
        setRows(newRows)

        await new Promise(resolve => setTimeout(resolve, 10))
        
        const hot = hotRef.current.hotInstance
        hot?.updateSettings({
            minRows: newRows,
            maxRows: newRows
        })
    }

    const handleButtonGenerate = () => {
        const hot = hotRef.current.hotInstance

        const data = hot.getSourceData()
        const toReport = data.filter(e => e.toReport?.match(/si/i))
        const string = makeTemplate(toReport)
        const report = withoutSpace(string)

        if (!report) {
            toast.error('There is no data to report')
            return
        }

        navigator.clipboard.writeText(report)
        .then(() => {
            toast.success('Report successfully generated and copied to clipboard')
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '1.5rem',
            }}
        >
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='stretch'
            >
                <TextField
                    id="txtRows"
                    label="Rows"
                    type="number"
                    variant="standard"
                    size='small'
                    sx={{
                        flexGrow: 1,
                    }}
                    onChange={handleInputRows}
                />
                <Button
                    variant='contained'
                    sx={{
                        // height: '30px',
                    }}
                    onClick={handleButtonGenerate}
                >
                    Generate
                </Button>
            </Stack>

            {rows && (
                <HotTable
                    ref={hotRef}
                    data={[]}
                    height='auto'
                    licenseKey='non-commercial-and-evaluation'
                    stretchH='all'
                    formulas={false}
                    rowHeaders={false}
                    contextMenu={false}
                    manualRowMove={false}
                    filters={false}
                    dropdownMenu={false}
                    colHeaders={colHeaders}
                    columns={columns}
                />
            )}

            <Toaster richColors />

        </Box>
    )
}