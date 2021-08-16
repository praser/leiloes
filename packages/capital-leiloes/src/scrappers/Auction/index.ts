import * as dotenv from "dotenv-safe"
import fetch, { Response } from "node-fetch"
import { CheerioAPI, load } from "cheerio"
import { isValid } from "date-fns"

import { convertModality, convertStatus, convertType } from "./conversors"
import {
  extractDescription,
  extractFirstCall,
  extractLastCall,
  extractModality,
  extractSeq,
  extractSponsor,
  extractStatus,
  extractType,
} from "./extractors"
import { mountUrl } from "./mounters"
import { Auction } from "@auctions/auction-core"

dotenv.config()

const getIndexHtml = async (): Promise<string> => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  const res: Response = await fetch(url)
  const html: string = await res.text()
  return html
}

const loadHtml = (html: string): CheerioAPI => load(html)

const run = async () => {
  const html: string = await getIndexHtml()
  const $: CheerioAPI = loadHtml(html)
  const auctions: Auction[] = []
  $(".boxLeiloes").each((i, boxLeilao) => {
    const el = $(boxLeilao)
    const seq = extractSeq(el.attr("href"))

    const description = extractDescription(el)
    const firstCall = extractFirstCall(el)
    const lastCall = isValid(extractLastCall(el))
      ? extractLastCall(el)
      : undefined
    const modality = convertModality(extractModality(el))
    const sponsor = extractSponsor(el)
    const status = convertStatus(extractStatus(el))
    const type = convertType(extractType(el))
    const url = mountUrl(seq)

    auctions.push({
      description,
      firstCall,
      lastCall,
      modality,
      sponsor,
      status,
      type,
      url,
    })
  })

  return auctions
}

;(async () => {
  const links = await run()
  console.log(links)
})()
