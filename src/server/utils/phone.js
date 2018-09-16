export function sanitizePhone(phone) {
  return phone.toString().replace(/[^\d]/g, '');
}

export function generateCode() {
  return Math.floor(1000 + (Math.random() * 9000));
}
