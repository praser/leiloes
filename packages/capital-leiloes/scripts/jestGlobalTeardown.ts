import fs from "fs"

const removeAuctionFixture = () =>
  fs.rm("./src/scrappers/Auction/fixture.html", (err) => console.error(err))

export default async () => {
  removeAuctionFixture()
}
