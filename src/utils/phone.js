// eslint-disable-next-line
export function sanitizePhone(phone) {
  return phone.toString().replace(/[^\d]/g, '');
}

