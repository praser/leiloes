export const convertModality = (modality: string) => {
  // switch (modality.toUpperCase()) {
  //   case "ONLINE":
  //     return AuctionModality.Online
  //   default:
  //     return AuctionModality.InPerson
  // }
  return modality
}

export const convertStatus = (status: string) => {
  // switch (status.toUpperCase()) {
  //   case "ABERTO PARA LANCES":
  //     return AuctionLotStatus.OpenToBid
  //   case "SUSPENSO":
  //     return AuctionLotStatus.Suspended
  //   case "ENCERRADO":
  //     return AuctionLotStatus.Closed
  //   default:
  //     return AuctionLotStatus.Foreseen
  // }
  return status
}

export const convertType = (type: string) => {
  // switch (type.toUpperCase()) {
  //   case "Judicial":
  //     return AuctionType.Judicial
  //   default:
  //     return AuctionType.Extrajudicial
  // }
  return type
}
