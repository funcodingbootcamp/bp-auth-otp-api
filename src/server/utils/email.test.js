import { normalizeEmail } from './email';

describe('email tests', () => {
  it('normalizeEmail EMAIL@Gmail.coM correctly', () => {
    const email = 'EMAIL@Gmail.coM';
    const res = normalizeEmail(email);
    expect(res).toBe('email@gmail.com');
  });
});
