'use strict';

function tokenGenerator(tokenLength) {
  let token = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (tokenLength == undefined || tokenLength == null) {
    tokenLength = 100;
  }
  for (let i = 0; i < tokenLength; ++i) {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return token;
}

exports.generate = tokenGenerator;
