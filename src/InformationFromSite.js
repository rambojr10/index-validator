import { chromium } from "playwright"
import cherio from "cherio"

const URLS = {
    loginPage: (scanid) => `https://www.talent.com/private/tools/content/scraper/spiderCodeTool.php?scanid=${scanid}`,
    spiderCode: (scanid) => `https://www.talent.com/private/tools/content/scraper/services/loadSpiderCode.php?scanid=${scanid}&step=static-mapjobs`,
    sourceDataTree: `https://talent.com/private/tools/content/sourceDataTree/index.php`,
    lastCrawlId: (scanid) => `https://talent.com/private/tools/content/sourceDataTree/ajax/drawTreeEntriesTable.php?scanid=${scanid}&length=25&page=1`,
    htmlWithTags: (scanid, lastCrawlId) => `https://talent.com/private/tools/content/sourceDataTree/ajax/drawJsonTree.php?viewMode=json&scanid=${scanid}&${lastCrawlId}`,
}
async function login({ email, password, scanid }) {

    // Launch
    const browser = await chromium.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto(URLS.loginPage(scanid))

    // Type data and sign in 
    const inputEmail = await page.locator('[name="email"]')
    const inputPassword = await page.locator('[name="password"]')

    await inputEmail.type(email)
    await inputPassword.type(password)

    await page.locator('[value="Login"]').click()

    // Get spider code
    const code = await page.evaluate(async (url) => {

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
        const { code } = await requestCode.json()
        return code

    }, URLS.spiderCode(scanid))

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
        .attr('onclick')
        .split("&")
        .find(e => e.includes("crawlId"))

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

    // Close the browser
    await browser.close()

    // Structured data for the compare
    const structuredData = JSON.stringify({
        code: await code.replace(/\r\n/g, "").trim(),
        tags: feedTags,
    }, null, 2)
    console.log(structuredData)
    // return dataForIA
}

login({
    email: "",
    password: "",
    scanid: ""
})