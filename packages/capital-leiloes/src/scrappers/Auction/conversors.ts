import {
  AuctionModality,
  AuctionStatus,
  AuctionType,
} from "@auctions/auction-core"

export const convertModality = (modality: string): AuctionModality =>
  modality.toUpperCase() === "ONLINE"
    ? AuctionModality.Online
    : AuctionModality.InPerson

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

export const convertType = (type: string): AuctionType =>
  type.toUpperCase() === "JUDICIAL"
    ? AuctionType.Judicial
    : AuctionType.Extrajudicial
