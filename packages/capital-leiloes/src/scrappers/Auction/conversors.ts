import {
  AuctionModality,
  AuctionStatus,
  AuctionType,
} from "@auctions/auction-core"

export const convertModality = (modality: string): AuctionModality => {
  switch (modality.toUpperCase()) {
    case "ONLINE":
      return AuctionModality.Online
    default:
      return AuctionModality.InPerson
  }
}

export const convertStatus = (status: string): AuctionStatus => {
  switch (status.toUpperCase()) {
    case "ABERTO PARA LANCES":
      return AuctionStatus.OpenToBid
    case "SUSPENSO":
      return AuctionStatus.Suspended
    case "ENCERRADO":
      return AuctionStatus.Closed
    default:
      return AuctionStatus.Foreseen
  }
}

export const convertType = (type: string): AuctionType => {
  switch (type.toUpperCase()) {
    case "JUDICIAL":
      return AuctionType.Judicial
    default:
      return AuctionType.Extrajudicial
  }
}
