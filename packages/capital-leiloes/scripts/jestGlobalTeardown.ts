import fs from "fs"

const removeAuctionFixture = () =>
  fs.rm("./src/scrappers/Auction/fixture.txt", (err) => console.error(err))

export default async () => {
  removeAuctionFixture()
}
