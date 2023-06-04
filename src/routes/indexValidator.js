import { Router, json } from 'express'
import configs from '../configs.js'
import getResultIndexValidator from '../getResultIndexValidator.js'
import cors from 'cors'

const validateScanid = (scanid) => {
    return scanid.match(/^[0-9]+$/)
}

const { email, password } = configs

const indexRouter = Router()

indexRouter.use(json())
indexRouter.use(cors())

indexRouter.get('/api/iv/:scanid', async (req, res) => {
    const { scanid } = req.params
    if (!validateScanid(scanid)) {
        res.sendStatus(404)
        return
    }
    const props = {
        email,
        password,
        scanid
    }
    const jsonData = {
        "AssignedTags": {
            "id": "$job['reqid']",
            "title": "$job['title']",
            "company": "$job['source_empname']",
            "description": ["$job['html']", "$job['jobdesc']"],
            "url": "$job['url']",
            "location": "$job['source_city']",
            "region": "$job['source_state']",
            "Country": "$job['source_country']"
        },
        "UnassignedTags": {
            "function": [null, null, null, null, null, null],
            "parentLocationName": null,
            "parentLocationId": null,
            "GeoCoordinates": {
                "latitude": null,
                "longitude": null
            },
            "language": null
        }
    }

    // const jsonData = await getResultIndexValidator(props)
    res.status(200).json(jsonData)
})

export default indexRouter