import { chromium } from "playwright"
import cherio from "cherio"

const URLS = {
    loginPage: (scanid) => `https://www.talent.com/private/tools/content/scraper/spiderCodeTool.php?scanid=${scanid}`,
    crawlGroup: (scanid) => `https://www.talent.com/private/tools/content/scraper/ajax/viewScanidInfo.php?scanid=${scanid}&type=info`,
    spiderCode: (scanid, crawlGroup) => `https://www.talent.com/private/tools/content/scraper/services/loadSpiderCode.php?scanid=${scanid}&step=${crawlGroup}`,
    sourceDataTree: `https://talent.com/private/tools/content/sourceDataTree/index.php`,
    lastCrawlId: (scanid) => `https://talent.com/private/tools/content/sourceDataTree/ajax/drawTreeEntriesTable.php?scanid=${scanid}&length=25&page=1&lastEntry=1`,
    htmlWithTags: (scanid, lastCrawlId) => `https://talent.com/private/tools/content/sourceDataTree/ajax/drawJsonTree.php?viewMode=json&scanid=${scanid}&${lastCrawlId}`,
}
const CRAWL_GROUP_LIST = {
    32: "static-mapjobs",
    41: "api-mapjobs",
}

async function getDataIndexValidator({ email, password, scanid }) {

    // Launch
    const browser = await chromium.launch({
        headless: false,
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(URLS.loginPage(scanid), { timeout: 60000 })

    // Type data and sign in 
    const inputEmail = await page.locator('[name="email"]')
    const inputPassword = await page.locator('[name="password"]')

    await inputEmail.type(email)
    await inputPassword.type(password)

    await page.locator('[value="Login"]').click()

    // Get html with crawl gruop of scanid
    const htmlCrawlGroup = await page.evaluate(async (url) => {

        async function makeRequest({ url, method }) {
            return fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": null,
                "method": method,
            })
        }

        const requestCode = await makeRequest({ url, method: 'GET' })
        return requestCode.text()

    }, URLS.crawlGroup(scanid))

    // Get the number of crawl group of scanid
    const $htmlCrawlGroup = cherio.load(htmlCrawlGroup)
    const crawlGroup = CRAWL_GROUP_LIST[$htmlCrawlGroup('select[name="crawlGroup"] > option[selected]').val()]

    // If the spider is not Static or API we leave
    if (!crawlGroup) {
        await browser.close()
        const message = "The spider is not STATIC or API"
        console.log(message)
        return { message }
    }

    // Get spider code
    const { code } = await page.evaluate(async (url) => {

        async function makeRequest({ url, method }) {
            return fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": null,
                "method": method,
            })
        }

        const requestCode = await makeRequest({ url, method: 'GET' })
        return requestCode.json()
    }, URLS.spiderCode(scanid, crawlGroup))

    // Go to searchDataTree page
    await page.goto(URLS.sourceDataTree)

    // Get the html of the last crawl id
    const htmlCrawlId = await page.evaluate(async (urlToGetCrawlId) => {

        async function makeRequest({ url, method }) {
            return fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": null,
                "method": method,
            })
        }

        const response = await makeRequest({ url: urlToGetCrawlId, method: 'GET' })
        const { html } = await response.json()
        return html

    }, URLS.lastCrawlId(scanid))

    // Get the last crawl id
    const $htmlCrawlId = cherio.load(await htmlCrawlId)
    const lastCrawlId = $htmlCrawlId('table[class="hyperTable"] tbody tr:first-child > td:last-child > a')
        ?.attr('onclick')
        ?.split("&")
        ?.find(e => e.includes("crawlId"))

    // If there is no data_tree we leave
    if (!lastCrawlId) {
        await browser.close()
        const message = "There is not data_tree"
        console.log(message)
        return { message }
    }

    // Get the html with tags
    const htmlWithTags = await page.evaluate(async (urlToGetTags) => {

        async function makeRequest({ url, method }) {
            return fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": null,
                "method": method,
            })
        }

        const response = makeRequest({ url: urlToGetTags, method: 'GET' }).then(response => response.text())
        return response

    }, URLS.htmlWithTags(scanid, lastCrawlId))

    // Get the feed tags
    const $htmlWithTags = cherio.load(htmlWithTags)
    const feedTags = JSON.parse($htmlWithTags('textArea[name="jsonEditor"]').text().trim())
    const tags = Object.values(feedTags)[0]

    // Close the browser
    await browser.close()

    // Structured data for the compare
    const structuredData = JSON.parse(JSON.stringify({
        "code": code.replace(/\r\n/g, '').trim(),
        "tags": tags,
    }, null, 0))

    // console.log(`{"code": ${structuredData.code}, "tags": ${JSON.stringify(structuredData.tags)}}`)

    return structuredData
}

export default getDataIndexValidator