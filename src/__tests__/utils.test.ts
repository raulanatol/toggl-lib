import { humanizeMilliseconds } from '../utils';

describe('utils', () => {
  describe('humanizeMilliseconds', () => {
    test('should return a valid humanized milliseconds', () => {
      expect(humanizeMilliseconds(33889000)).toBe('09:24:49');
      expect(humanizeMilliseconds(1315000)).toBe('00:21:55');
      expect(humanizeMilliseconds(106982000)).toBe('05:43:02');
    });
  });
});
