let UUID;

UUID = (function () {
    'use strict';

    function UUID() { }

    UUID.generate = function () {
        let rand = UUID._getRandomInt;
        let hex = UUID._hexAligner;

        // ["timeLow", "timeMid", "timeHiAndVersion", "clockSeqHiAndReserved", "clockSeqLow", "node"]
        return hex(rand(32), 8) + // time_low
            '-' +
            hex(rand(16), 4) + // time_mid
            '-' +
            hex(0x4000 | rand(12), 4) + // time_hi_and_version
            '-' +
            hex(0x8000 | rand(14), 4) + // clock_seq_hi_and_reserved clock_seq_low
            '-' +
            hex(rand(48), 12); // node
    };

 
    UUID._getRandomInt = function (x) {
        if (x < 0) {
            return NaN;
        }
        if (x <= 30) {
            return (0 | Math.random() * (1 << x));
        }
        if (x <= 53) {
            return (0 | Math.random() * (1 << 30)) +
                (0 | Math.random() * (1 << x - 30)) * (1 << 30);
        }

        return NaN;
    };

 
    UUID._getIntAligner = function (radix) {
        return function (num, length) {
            let str = num.toString(radix);
            let i = length - str.length;
            let z = '0';

            for (; i > 0; i >>>= 1, z += z) {
                if (i & 1) {
                    str = z + str;
                }
            }
            return str;
        };
    };

    UUID._hexAligner = UUID._getIntAligner(16);

    UUID.prototype.toString = function () {
        return this.hexString;
    };

    return UUID;
})(UUID);

export default UUID;
