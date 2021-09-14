import * as dotenv from "dotenv-safe"
import fetch, { Response } from "node-fetch"
import { Cheerio, CheerioAPI, load } from "cheerio"
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
import { mountUrl } from "./utils"
import { Auction } from "@auctions/auction-core"

dotenv.config()

const getIndexHtml = async (): Promise<string> => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  const res: Response = await fetch(url)
  const html: string = await res.text()
  return html
}

const loadHtml = (html: string): CheerioAPI => load(html)

const extractAuction = (el: any, seq: number): Auction => {
  return {
    description: extractDescription(el),
    firstCall: extractFirstCall(el),
    lastCall: extractLastCall(el),
    modality: convertModality(extractModality(el)),
    sponsor: extractSponsor(el),
    status: convertStatus(extractStatus(el)),
    type: convertType(extractType(el)),
    url: mountUrl(seq, process.env.AUCTION_SITE_URL || '')
  }
}

const run = async () => {
  const html: string = await getIndexHtml()
  const $: CheerioAPI = loadHtml(html)
  const auctions: Auction[] = []
  
  $(".boxLeiloes").each((i, boxLeilao) => {
    const el = $(boxLeilao)
    const seq = extractSeq(el.attr("href") || '0')
    auctions.push(extractAuction(el, seq))
  })

  return auctions
}

;(async () => {
  const links = await run()
  console.log(links)
})()
