var ttrs;
(function (ttrs) {
    class foo {
    }
    ttrs.foo = foo;
    let MinoType;
    (function (MinoType) {
        MinoType[MinoType["I"] = 0] = "I";
        MinoType[MinoType["O"] = 1] = "O";
        MinoType[MinoType["S"] = 2] = "S";
        MinoType[MinoType["Z"] = 3] = "Z";
        MinoType[MinoType["J"] = 4] = "J";
        MinoType[MinoType["L"] = 5] = "L";
        MinoType[MinoType["T"] = 6] = "T";
    })(MinoType || (MinoType = {}));
    class Mino {
        constructor(minoType) {
            this.minoType = minoType;
            this.MinoType = minoType;
        }
    }
    class MinoHelper {
        static GenerateMinoMap(minoType) {
            switch (minoType) {
                case MinoType.I:
                    return [
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                    ];
                case MinoType.I:
                    return [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
                case MinoType.S:
                    return [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
                case MinoType.Z:
                    return [
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
                case MinoType.J:
                    return [
                        [1, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
                case MinoType.L:
                    return [
                        [1, 1, 1, 0],
                        [1, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
                case MinoType.T:
                    return [
                        [0, 1, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                    ];
            }
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
        }
    }
})(ttrs || (ttrs = {}));
var foo = new ttrs.foo();
console.log(foo);
