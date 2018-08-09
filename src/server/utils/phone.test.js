import { sanitizePhone, generateCode } from './phone';

describe('phone tests', () => {
  it('sanitizePhone +7 9165926645 correctly', () => {
    const phone = '+7 9165926645';
    const res = sanitizePhone(phone);
    expect(res).toBe('79165926645');
  });

  it('generates correct code', () => {
    const code = generateCode();
    const isCorrect = (code >= 1000 && code <= 9999);
    expect(isCorrect).toBeTruthy();
  });
});
