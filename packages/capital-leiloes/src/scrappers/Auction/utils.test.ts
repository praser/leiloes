import { describe, expect, it } from '@jest/globals';
import { findDates, findTimes, hasSecondCall, mountUrl, parseDate } from "./utils";
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

  describe('find dates', () => {
    it('is expected to find two dates if there is two dates in the text', () =>{
      const firstDate = format(faker.date.past(), 'dd/MM/yyyy HH:mm')
      const lastDate = format(faker.date.past(), 'dd/MM/yyyy HH:mm')
      const text = `${faker.lorem.sentence()} ${firstDate} ${faker.lorem.sentence()} ${lastDate}`
      const sut = findDates(text)
      expect(sut).toHaveLength(2)
    })
  })

  describe('find times', () => {
    it('is expected to find two times if there is two times in the text', () =>{
      const firstDate = format(faker.date.past(), 'dd/MM/yyyy HH:mm')
      const lastDate = format(faker.date.past(), 'dd/MM/yyyy HH:mm')
      const text = `${faker.lorem.sentence()} ${firstDate} ${faker.lorem.sentence()} ${lastDate}`
      const sut = findTimes(text)
      expect(sut).toHaveLength(2)
    })
  })

  describe('parseDate', () => {
    it('is expected to parse dates strings to Date', () => {
      const date = format(faker.date.past(), 'dd/MM/yyyy');
      const time = format(faker.date.past(), 'HH:mm');
      const sut = parseDate(date, time);
      expect(sut).toBeInstanceOf(Date);
    });

    it('is expected to throws "Invalid date" when date is in the wrong format', () => {
      const date = faker.lorem.word()
      const time = faker.lorem.word()
      expect(() => {
        const sut = parseDate(date, time)
      }).toThrow('Invalid Date')
    })
  });

  describe('has second call', () => {
    it('is expected to be truthy if there is second call', () => {
      const text = `${faker.lorem.sentence()} 2ª Data ${faker.lorem.sentence}`
      expect(hasSecondCall(text)).toBeTruthy()
    })

    it('is expected to be falsy if there is no scond call', () => {
      const text = faker.lorem.sentence().replace('2ª Data', '')
      expect(hasSecondCall(text)).toBeFalsy()
    })
  })
});
