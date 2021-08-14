enum AuctionModality {
  Online,
  InPerson,
}

enum AuctionType {
  Judicial,
  Extrajudicial,
}

enum AuctionSiteStatus {
  Active,
  Inactive,
}

enum AuctionLotStatus {
  Foreseen,
  OpenToBid,
  Suspended,
  Closed,
}

export type AuctionSite = {
  id: string
  name: string
  url: string
  status: AuctionSiteStatus
}

export type AuctionLot = {
  id: string
  auctionSiteId: string
  url: string
  status: AuctionLotStatus
  modality: AuctionModality
  type: AuctionType
}
