import * as dotenv from "dotenv-safe"
import fetch, { Response } from "node-fetch"
import * as cheerio from "cheerio"

dotenv.config()

const getIndexHtml = async (): Promise<string> => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  const res: Response = await fetch(url)
  const html: string = await res.text()
  return html
}

const parse = (html: string): cheerio.CheerioAPI => cheerio.load(html)

const getSeq = (href: string = "") => parseInt(href.split("seq=")[1])

const detailUrl = (seq: number) => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  return `${url}/public/detalhe-leilao.xhtml?seq=${seq}`
}

const run = async () => {
  const html: string = await getIndexHtml()
  const $: cheerio.CheerioAPI = parse(html)
  const links: string[] = []
  $(".boxLeiloes").each((i, el) => {
    const seq = getSeq($(el).attr("href"))
    const url = detailUrl(seq)
    links.push(url)
  })

  return links
}

;(async () => {
  const links = await run()
  console.log(links)
})()
