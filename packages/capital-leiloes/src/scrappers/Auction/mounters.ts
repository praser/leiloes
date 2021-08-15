export const mountUrl = (seq: number) => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  return `${url}/public/detalhe-leilao.xhtml?seq=${seq}`
}
