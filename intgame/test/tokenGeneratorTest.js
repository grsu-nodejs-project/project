'use strict';
let tokenGenerator = require('../lib/tokenGenerator');

for (let i = 0; i < 10; i++) {
  let token = tokenGenerator.generate();
  console.log(token);
}
