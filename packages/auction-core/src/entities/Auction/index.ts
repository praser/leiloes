import { AuctionModality } from "./AuctionModality"
import { AuctionStatus } from "./AuctionStatus"
import { AuctionType } from "./AuctionType"

type Auction = {
  description: string
  firstCall: Date
  lastCall: Date | undefined
  modality: AuctionModality
  sponsor: string
  status: AuctionStatus
  type: AuctionType
  url: string
}

export { AuctionModality, AuctionStatus, AuctionType, Auction }
