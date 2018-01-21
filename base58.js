var base58 = require('base58');

function encode(num) {
 var encoded =   base58.encode(num);
    return encoded;
}

function decode(str) {
    var decoded = base58.decode(str);
    return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;