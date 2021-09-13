import { describe, expect, it } from '@jest/globals';
import { parseDate } from "./utils";
import faker from "faker";
import { format } from 'date-fns';

describe('Parsers', () => {
  describe('parseDate', () => {
    it('is expected to parse dates strings to Date', () => {
      const date = format(faker.date.past(), 'dd/MM/yyyy HH:mm');
      const sut = parseDate(date);
      expect(sut).toBeInstanceOf(Date);
    });
  });
});
