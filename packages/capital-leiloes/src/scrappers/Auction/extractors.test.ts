import fs from 'fs'
import { promisify } from 'util'
import { describe, expect, it } from '@jest/globals'
import { CheerioAPI, load } from "cheerio"
import { extractDescription, extractFirstCall, extractLastCall, extractModality, extractSeq, extractSponsor, extractStatus, extractType } from './extractors'
const readFile = promisify(fs.readFile)

describe('Auction extractors', () => {
  let $: CheerioAPI;
  let el: any;

  beforeAll(async () => {
    try {
      const fileBuffer = await readFile(`${__dirname}/fixture.html`)
      const fixture = fileBuffer.toString()
      const loadHtml = (html: string): CheerioAPI => load(fixture)
      $ = loadHtml(fixture)
    } catch (error) {
      throw error
    }
  })

  beforeEach(() => {
    const items = $(".boxLeiloes")
    const i = Math.floor(Math.random()*items.length)
    el = $(items[i])
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
    let sut: any

    beforeEach(() => {
      sut = extractFirstCall(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to be a date', () => {
      expect(sut).toBeInstanceOf(Date)
    })
  })

  describe('Last call', () => {
    let sut: any

    beforeEach(() => {
      sut = extractLastCall(el)
    })

    it('is expected to not be null', () => {
      expect(sut).not.toBeNull()
    })

    it('is expected to not be undefined', () => {
      expect(sut).not.toBeUndefined()
    })

    it('expected to be a date', () => {
      expect(sut).toBeInstanceOf(Date)
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

