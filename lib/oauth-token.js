var oauthToken = 'UKI2X2HLBWJIZT5LVG7ZT5WSRJIFEIKLFMJJOMUW2YCGSN7HEHJT37MMJT7EBB6QP3R22EWZBPV5RBENRGV3OSRFCPWQQDOGSGSQ4RQ';

function setToken(token) {
  oauthToken=token;
}

function getToken() {
  return oauthToken;
}

module.exports = {
  get:getToken,
  set:setToken
}
