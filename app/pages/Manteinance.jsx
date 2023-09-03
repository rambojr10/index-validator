import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from "@mui/material"
import { red, yellow, orange, blue } from '@mui/material/colors'
import { useState } from "react"

export function Manteinance() {

    const [activateLimitByColor, setActivateLimitByColor] = useState(false)
    const [limitValue, setLimitValue] = useState('')
    const [formData, setFormData] = useState({
        "whatExtract": {
            "errors": false,
            "stucks": false,
            "lastWarning": false,
            "matrix": {
                "blue": false,
                "red": false,
                "orange": false,
                "gray": false,
                "black": false,
                "yellow": false,
                "limitByColor": 'none'
            }
        },
        "indexers": {
            'Alex Calle': 0,
            'Andres Valencia': 0,
            'Christian Diaz': 0,
            'Duver Betancur': 0,
            'Miguel Garcia Henao': 0,
            'Samuel Posada': 0,
            'Sebastian Manco': 0,
            'Victoria Reyes': 0,
        }
    })

    const INDEXERS = [
        'Alex Calle',
        'Andres Valencia',
        'Christian Diaz',
        'Duver Betancur',
        'Miguel Garcia Henao',
        'Samuel Posada',
        'Sebastian Manco',
        'Victoria Reyes',
    ]

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        const toAssign = type === 'checkbox' ? checked : value

        const pathProperties = name.split('.')
        if (pathProperties.length === 2) {
            const newFormData = {
                ...formData,
                [pathProperties[0]]: {
                    ...formData[pathProperties[0]],
                    [pathProperties[1]]: toAssign
                }
            }
            setFormData(newFormData)
        }
        if (pathProperties.length === 3) {
            console.log(pathProperties)
            const newFormData = {
                ...formData,
                [pathProperties[0]]: {
                    ...formData[pathProperties[0]],
                    [pathProperties[1]]: {
                        ...formData[pathProperties[0]][pathProperties[1]],
                        [pathProperties[2]]: toAssign
                    }
                }
            }
            console.log(newFormData)
            setFormData(newFormData)
        }
    }

    const handleLimitValue = (e) => {
        const { value, flag } = e.target
        if (value.match(/^[0-9]+$/) || flag) {
            setLimitValue(value)
            handleChange(e)
        }
    }

    const handleActivateLimitValue = () => {
        setActivateLimitByColor(!activateLimitByColor)

        if (activateLimitByColor === false) {
            setLimitValue('')
        } else {
            setLimitValue('None')
            handleLimitValue({
                target: {
                    value: 'None',
                    flag: true,
                    name: 'whatExtract.matrix.limitByColor'
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault
        console.log('submit')
    }

    return (
        <section>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                }}
                mb='15px'
            >
                {/* General  */}
                <FormGroup
                    sx={{
                        padding: '10px',
                        backgroundColor: 'background.paper',
                        // display: 'grid',
                        // gridTemplateColumns: 'repeat(2, 1fr)',
                        // maxWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    <label style={{
                        color: 'text.primary',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>General</label>
                    <FormControlLabel
                        label="Errors"
                        control={<Checkbox
                            name="whatExtract.errors"
                            onChange={handleChange}
                            checked={formData.whatExtract.errors}
                        />}
                    />
                    <FormControlLabel
                        label="Stucks"
                        control={<Checkbox
                            name="whatExtract.stucks"
                            onChange={handleChange}
                            checked={formData.whatExtract.stucks}
                        />}
                    />
                    <FormControlLabel
                        label="Warnings"
                        control={<Checkbox
                            name="whatExtract.lastWarning"
                            onChange={handleChange}
                            checked={formData.whatExtract.lastWarning}
                        />}
                    />
                    <Button variant="contained" size="small" color="error" onClick={handleSubmit}>Generate</Button>
                </FormGroup>

                {/* Matrix */}
                <FormGroup
                    sx={{
                        padding: '10px',
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    <label style={{
                        color: 'text.primary',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Matrix</label>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                        }}
                    >
                        <FormControlLabel
                            label="Blue"
                            control={<Checkbox
                                sx={{
                                    color: blue[800],
                                    '&.Mui-checked': {
                                        color: blue[600],
                                    },
                                }}
                                name="whatExtract.matrix.blue"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.blue}
                            />}
                        />
                        <FormControlLabel
                            label="Red"
                            control={<Checkbox
                                sx={{
                                    color: red[800],
                                    '&.Mui-checked': {
                                        color: red[600],
                                    },
                                }}
                                name="whatExtract.matrix.red"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.red}
                            />}
                        />
                        <FormControlLabel
                            label="Orange"
                            control={<Checkbox
                                sx={{
                                    color: orange[800],
                                    '&.Mui-checked': {
                                        color: orange[600],
                                    },
                                }}
                                name="whatExtract.matrix.orange"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.orange}
                            />}
                        />
                        <FormControlLabel
                            label="Gray"
                            control={<Checkbox
                                color='default'
                                name="whatExtract.matrix.gray"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.gray}
                            />}
                        />
                        <FormControlLabel
                            label="Black"
                            control={<Checkbox
                                sx={{
                                    color: "#000000",
                                    '&.Mui-checked': {
                                        color: '#CCC',
                                    },
                                }}
                                name="whatExtract.matrix.black"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.black}
                            />}
                        />
                        <FormControlLabel
                            label="Yellow"
                            control={<Checkbox
                                sx={{
                                    color: yellow[800],
                                    '&.Mui-checked': {
                                        color: yellow[600],
                                    },
                                }}
                                name="whatExtract.matrix.yellow"
                                onChange={handleChange}
                                checked={formData.whatExtract.matrix.yellow}
                            />}
                        />
                        <FormControlLabel
                            label="Add limit"
                            control={<Checkbox
                                onChange={handleActivateLimitValue}
                            />}
                        />
                        <TextField
                            label="Limit by color"
                            id="limit-by-color"
                            placeholder="Only numbers"
                            value={limitValue}
                            size="small"
                            onChange={handleLimitValue}
                            inputProps={{
                                pattern: '^[0-9]*$',
                                title: 'Only numbers',
                                maxLength: '4',
                            }}
                            name="whatExtract.matrix.limitByColor"
                            disabled={!activateLimitByColor}
                        />
                    </Box>
                </FormGroup>

                {/* Indexers */}
                <FormGroup
                    sx={{
                        padding: '10px',
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    <label style={{
                        color: 'text.primary',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Indexers</label>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                        }}
                    >
                        {
                            INDEXERS.map((indexer, key) => (
                                <FormControlLabel
                                    label={indexer}
                                    key={key}
                                    control={<Checkbox
                                        name={`indexers.${indexer}`}
                                        onChange={handleChange}
                                        checked={Boolean(formData.indexers[indexer])}
                                    />}
                                />
                            ))
                        }
                    </Box>
                </FormGroup>
            </Box>
        </section>
    )
}
