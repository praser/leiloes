import { findDates, findTimes, hasSecondCall, parseDate } from "./utils"

export const extractDescription = (el: any): string => {
  const selector: string = ".descricao"
  return el.find(selector).text().split("Descrição: ")[1].split("\n")[0]
}

export const extractFirstCall = (el: any): Date => {
  const selector: string = ".descricao"
  const text = el.find(selector).text()
  const dates = findDates(text)
  const times = findTimes(text)

  if (!dates || !times) throw Error('First call not found')
  
  return parseDate(dates[0], times[0])
}

export const extractLastCall = (el: any): Date | undefined => {
  const selector: string = ".descricao"
  const text = el.find(selector).text()

  if (!hasSecondCall(text)) return undefined

  const dates = findDates(text)
  const times = findTimes(text)

  if (!dates || !times) throw Error('Second call not found')

  return parseDate(dates[1], times[1])
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
