import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { describe, expect, it } from '@jest/globals'
import { CheerioAPI, load } from "cheerio"
import { extractDescription, extractFirstCall, extractLastCall, extractModality, extractSeq, extractSponsor, extractStatus, extractType } from './extractors'
import * as utils from './utils'

const readFile = promisify(fs.readFile)

describe('Auction extractors', () => {
  let $: CheerioAPI;
  let el: any;

  beforeAll(async () => {
    try {
      const fileBuffer = await readFile(path.join(__dirname, 'fixture.html'))
      const fixture = fileBuffer.toString()
      const loadHtml = (html: string): CheerioAPI => load(fixture)
      $ = loadHtml(fixture)
    } catch (error) {
      throw error
    }
  })

  beforeEach(() => {
    const items = $(".boxLeiloes")
    el = $(items[0])
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Description', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractDescription(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to not be empty', () => {
      expect(sut.length).toBeGreaterThan(0)
    })
  })

  describe('First call', () => {
    it('is expected to call findDates once', () => {
      const spy = jest.spyOn(utils, 'findDates')
      extractFirstCall(el)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('is expected to call findTimes once', () => {
      const spy = jest.spyOn(utils, 'findTimes')
      extractFirstCall(el)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it ('is expected to throw when findDates return null', () => {
      jest.spyOn(utils, 'findDates').mockImplementationOnce(() => null)
      expect(() => {
        extractFirstCall(el)
      }).toThrow('First call not found')
    })

    it ('is expected to throw when findTimes return null', () => {
      jest.spyOn(utils, 'findTimes').mockImplementationOnce(() => null)
      expect(() => {
        extractFirstCall(el)
      }).toThrow('First call not found')
    })

    it('is expected to call parseDate once', () => {
      const spy = jest.spyOn(utils, 'parseDate')
      extractFirstCall(el)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Last call', () => {
    it('it is expected to call hasSecondCall once', () => {
      const spy = jest.spyOn(utils, 'hasSecondCall')
      extractLastCall(el)
      expect(spy).toBeCalledTimes(1)
    })

    describe('when it has a second call', () => {
      beforeEach(() => {
        jest
          .spyOn(utils, 'hasSecondCall')
          .mockImplementation(() => true)
      })

      it('is expected to call findDates once', () => {
        const spy = jest.spyOn(utils, 'findDates')
        extractLastCall(el)
        expect(spy).toBeCalledTimes(1)
      })

      it ('is expected to throw when findDates return null', () => {
        jest.spyOn(utils, 'findDates').mockImplementationOnce(() => null)
        expect(() => {
          extractLastCall(el)
        }).toThrow('Second call not found')
      })

      it ('is expected to throw when findTimes return null', () => {
        jest.spyOn(utils, 'findTimes').mockImplementationOnce(() => null)
        expect(() => {
          extractLastCall(el)
        }).toThrow('Second call not found')
      })

      it('is expected to call findTimes once', () => {
        const spy = jest.spyOn(utils, 'findTimes')
        extractLastCall(el)
        expect(spy).toBeCalledTimes(1)
      })

      it('is expected to call parseDate once', () => {
        const spy = jest.spyOn(utils, 'parseDate')
        extractLastCall(el)
        expect(spy).toBeCalledTimes(1)
      })
    })

    describe('when it does not have a second call', () => {
      it('expected to be undefined', () => {
        jest.spyOn(utils, 'hasSecondCall').mockImplementationOnce(() => false)
        const sut = extractLastCall(el)
        expect(sut).toBeUndefined()
      })
    })
  })

  describe('Modality', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractModality(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to not be empty', () => {
      expect(sut.length).toBeGreaterThan(0)
    })
  })

  describe('Sequence', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractSeq(el.attr('href'))
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to be a number', () => {
      expect(typeof sut).toBe('number')
    })
  })

  describe('Sponsor', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractSponsor(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to not be empty', () => {
      expect(sut.length).toBeGreaterThan(0)
    })
  })

  describe('Status', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractStatus(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to not be empty', () => {
      expect(sut.length).toBeGreaterThan(0)
    })
  })

  describe('Type', () => {
    let sut: any
  
    beforeEach(() => {
      sut = extractType(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to be "Judicial" or "Extra Judicial"', () => {
      expect(['Judicial', 'Extra Judicial']).toContain(sut)
    })
  })
})

