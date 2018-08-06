import { sanitizePhone } from './phone';

describe('phone tests', () => {
  it('sanitizePhone +7 9165926645 correctly', () => {
    const phone = '+7 9165926645';
    const res = sanitizePhone(phone);
    expect(res).toBe('79165926645');
  });
});
