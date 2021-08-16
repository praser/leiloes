import { describe, expect, it } from "@jest/globals"
import faker from "faker"

import {
  AuctionModality,
  AuctionStatus,
  AuctionType,
} from "@auctions/auction-core"
import { convertModality, convertStatus, convertType } from "./conversors"

describe("Auction conversors", () => {
  describe("Modality", () => {
    it("is expect to convert 'Online' to AuctionModality.Online", () => {
      const modality = "Online"
      expect(convertModality(modality)).toBe(AuctionModality.Online)
    })

    it("is expect to convert any other value to AuctionModality.InPerson", () => {
      const modality = faker.random.word()
      expect(convertModality(modality)).toBe(AuctionModality.InPerson)
    })
  })

  describe("Status", () => {
    it("is expect to convert 'Aberto para lances' to AuctionStatus.OpenToBid", () => {
      const status = "Aberto para lances"
      expect(convertStatus(status)).toBe(AuctionStatus.OpenToBid)
    })

    it("is expect to convert 'Suspenso' to AuctionStatus.Suspended", () => {
      const status = "Suspenso"
      expect(convertStatus(status)).toBe(AuctionStatus.Suspended)
    })

    it("is expect to convert 'Encerrado' to AuctionStatus.Closed", () => {
      const status = "Encerrado"
      expect(convertStatus(status)).toBe(AuctionStatus.Closed)
    })

    it("is expect to convert any other value to AuctionStatus.Foreseen", () => {
      const status = faker.random.word()
      expect(convertStatus(status)).toBe(AuctionStatus.Foreseen)
    })
  })

  describe("Type", () => {
    it("is expect to convert 'Judicial' to AuctionType.Judicial", () => {
      const type = "Judicial"
      expect(convertType(type)).toBe(AuctionType.Judicial)
    })

    it("is expect to convert any other value to AuctionType.Extrajudicial", () => {
      const type = faker.random.word()
      expect(convertType(type)).toBe(AuctionType.Extrajudicial)
    })
  })
})
