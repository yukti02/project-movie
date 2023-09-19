const { default: puppeteer } = require('puppeteer')
const { writeFile, readFile } = require('fs/promises')
const { load } = require('cheerio')

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ['--enable-automation'],
        defaultViewport: {
            height: 768,
            width: 1440
        }
    })
    console.log("browser launched")

    const page = await browser.newPage()
    console.log("new page opened")

    await page.goto('https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm')
    console.log("visited imdb's most popular movies page")
    const moviesData = []
    const $ = load(await page.content())
    $('li[class="ipc-metadata-list-summary-item sc-59b6048d-0 jemTre cli-parent"]').each((_, el) => {
        moviesData.push({
            name: $(el).find('.ipc-title__text').text(),
            releaseyear: parseInt($(el).find('.sc-b51a3d33-6').text(), 10),
            rating: parseFloat($(el).find('.ipc-rating-star.ipc-rating-star--base.ipc-rating-star--imdb.ratingGroup--imdb-rating').text(), 10),
            reviewscount: $(el).find('.ipc-rating-star--voteCount').text()
        })
    })    
    await browser.close()
    await writeFile('movies.json', JSON.stringify(moviesData))

}

main();