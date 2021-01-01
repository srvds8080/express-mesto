const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const OK_CODE = 200;
const CREATE_CODE = 201;
const BAD_REQUEST_CODE = 400;
const NOTFUOND_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const urlBD = 'mongodb://localhost:27017/mestodb';

module.exports = {
  REGEX_URL,
  BAD_REQUEST_CODE,
  OK_CODE,
  CREATE_CODE,
  NOTFUOND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  urlBD,
};
