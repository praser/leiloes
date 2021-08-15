import { AuctionModality } from "./AuctionModality"
import { AuctionStatus } from "./AuctionStatus"
import { AuctionType } from "./AuctionType"

export type Auction = {
  description: string
  firstCall: Date
  lastCall: Date
  modality: AuctionModality
  sponsor: string
  status: AuctionStatus
  type: AuctionType
  url: string
}
