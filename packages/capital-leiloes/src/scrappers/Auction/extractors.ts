import { parseDate } from "./utils"

export const extractDescription = (el: any): string => {
  const selector: string = ".descricao"
  return el.find(selector).text().split("Descrição: ")[1].split("\n")[0]
}

export const extractFirstCall = (el: any): Date => {
  const selector: string = ".descricao"
  const text = el.find(selector).text()
  return parseDate(text)
}

export const extractLastCall = (el: any): Date => {
  const selector: string = ".descricao"
  const text = el.find(selector).text().split("2ª Data")[1]
  return parseDate(text)
}

export const extractModality = (el: any): string => {
  const selector: string = "h2"
  return el.find(selector).text().split("\n\t\t\t\t\t\t\t\t")[0]
}

export const extractSeq = (href: string) => parseInt(href.split("seq=")[1])

export const extractSponsor = (el: any): string => {
  const selector: string = "h1"
  return el.find(selector).text().split("\n")[0]
}

export const extractStatus = (el: any): string => {
  const selector: string = "h2"
  return el
    .find(selector)
    .text()
    .split("\n\t\t\t\t\t\t\t\t")[1]
    .replace("\n\t\t\t\t\t\t", "")
}

export const extractType = (el: any): string => {
  const selector: string = ".bordaBase img"
  return el.find(selector).hasClass("jud") ? "Judicial" : "Extra Judicial"
}
