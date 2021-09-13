import { describe, expect, it } from '@jest/globals';
import { mountUrl, parseDate } from "./utils";
import faker from "faker";
import { format } from 'date-fns';

describe('Utils', () => {
  describe('mountUrl', () => {
    let sut: URL;
    let origin: string;
    let seq: number;
    

    beforeEach(() => {
      origin = faker.internet.url()
      seq = faker.datatype.number()
      sut = new URL(mountUrl(seq, origin))
    })

    it('is expected to return a valid url', () => {
      expect(sut.toString()).toMatch(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
    })

    it('is expected to have correct seq in query params', () => {
      expect(sut.searchParams.get('seq')).toBe(seq.toString())
    })

    it('is expected to have "/public/detalhe-leilao.xhtml" as path', () => {
      expect(sut.pathname).toBe('/public/detalhe-leilao.xhtml')
    })

    it('is expectect to have correct basepath', () => {
      expect(sut.origin).toBe(origin)
    })
  })

  describe('parseDate', () => {
    it('is expected to parse dates strings to Date', () => {
      const date = format(faker.date.past(), 'dd/MM/yyyy HH:mm');
      const sut = parseDate(date);
      expect(sut).toBeInstanceOf(Date);
    });

    it('is expected to throws "Invalid date" when date is in the wrong format', () => {
      const date = faker.lorem.sentence()
      expect(() => { parseDate(date) }).toThrow('Invalid date')
    })
  });
});
