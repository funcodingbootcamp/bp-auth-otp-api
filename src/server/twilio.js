import Twilio from 'twilio';

const accountSid = 'AC7d7f8742efd2327c8890d8fab70461c3';
const authToken = 'cee3bb56c063336e667d36feaade86a8';

const client = new Twilio(accountSid, authToken);
export default client;
