import { parse } from "date-fns";

export const mountUrl = (seq: number) => {
  const url: string = process.env.AUCTION_SITE_URL || ""
  return `${url}/public/detalhe-leilao.xhtml?seq=${seq}`
}

export const parseDate = (text: string): Date => {
  const dateRegex = /(\d{2}\/){2}\d{4}/;
  const timeRegex = /\d{2}:\d{2}/;
  const date = dateRegex.exec(text) || [];
  const time = timeRegex.exec(text) || [];

  return parse(`${date[0]} ${time[0]}`, "dd/MM/yyyy HH:mm", new Date());
};
