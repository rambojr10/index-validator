import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'
registerAllModules()

import { HotTable } from '@handsontable/react'
import { useState } from 'react'

export function Logbook () {
    
    const [indexers, setIndexers] = useState([])
    
    const afterChange = (changes) => {
        if (changes) {
            const list = [] // Array to fill the cmb with dynamic values
            changes.forEach(([row, prop, oldValue, newValue]) => {
                if (prop === 4) {
                    list.push(newValue)
                }
            })
            setIndexers(new Set(list))
        }
    }

    console.log(indexers)

    return (
        <HotTable
            height='auto'
            licenseKey='non-commercial-and-evaluation'
            stretchH='all'
            formulas={false}
            rowHeaders={false}
            contextMenu={false}
            manualRowMove={false}
            filters={false}
            dropdownMenu={false}
            maxRows={0}
            colHeaders={['Date', 'Strategy', 'Scanid', 'Empcode', 'Indexer']}
            afterChange={afterChange}
        />
    )
}
