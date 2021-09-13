import { parse } from "date-fns";

export const mountUrl = (seq: number, baseUrl:string) => {
  const url = new URL('/public/detalhe-leilao.xhtml', baseUrl)
  url.searchParams.append('seq', seq.toString())
  return url.toString()
}

export const parseDate = (text: string): Date => {
  const dateRegex = /(\d{2}\/){2}\d{4}/;
  const timeRegex = /\d{2}:\d{2}/;
  const date = dateRegex.exec(text);
  const time = timeRegex.exec(text);

  if (!date || !time) throw Error('Invalid date')

  return parse(`${date[0]} ${time[0]}`, "dd/MM/yyyy HH:mm", new Date());
};
