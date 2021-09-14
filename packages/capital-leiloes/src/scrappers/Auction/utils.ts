import { parse } from "date-fns";

export const mountUrl = (seq: number, baseUrl:string) => {
  const url = new URL('/public/detalhe-leilao.xhtml', baseUrl)
  url.searchParams.append('seq', seq.toString())
  return url.toString()
}

export const parseDate = (date: string, time: string): Date => {
  const d = parse(`${date} ${time}`, "dd/MM/yyyy HH:mm", new Date());
  if(d.toString() === 'Invalid Date') throw Error(d.toString())

  return d
};

export const hasSecondCall = (text: string): boolean => {
  return text.indexOf('2ª Data') >= 0
}

export const dateRegex = /(\d{2}\/){2}\d{4}/g
export const timeRegex = /\d{2}:\d{2}/g
