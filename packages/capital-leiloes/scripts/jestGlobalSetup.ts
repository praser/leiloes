import dotenv from "dotenv-safe"
import fetch from "node-fetch"
import fs from "fs"

dotenv.config()

const updateAuctionFixture = async () => {
  const url = process.env.AUCTION_SITE_URL || ""
  const res = await fetch(url)
  const text = await res.text()
  fs.writeFile("./src/scrappers/Auction/fixture.html", text, (err) =>
    console.error(err)
  )
}

export default async () => {
  console.log('Updating auction fixtures')
  await updateAuctionFixture()
}
