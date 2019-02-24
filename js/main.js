var ttrs;
(function (ttrs) {
    let MinoType;
    (function (MinoType) {
        MinoType[MinoType["I"] = 0] = "I";
        MinoType[MinoType["O"] = 1] = "O";
        MinoType[MinoType["S"] = 2] = "S";
        MinoType[MinoType["Z"] = 3] = "Z";
        MinoType[MinoType["J"] = 4] = "J";
        MinoType[MinoType["L"] = 5] = "L";
        MinoType[MinoType["T"] = 6] = "T";
    })(MinoType = ttrs.MinoType || (ttrs.MinoType = {}));
    class Mino {
        constructor(minoType) {
            this.minoType = minoType;
            this.MinoType = minoType;
        }
    }
    ttrs.Mino = Mino;
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
    ttrs.MinoHelper = MinoHelper;
    class View {
        constructor() {
            this.blockOff = "□";
            this.blockOn = "■";
            this.width = 10;
            this.height = 20;
            this.Grid = [];
            for (let h = 0; h < this.height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < this.width; w++) {
                    this.Grid[h].push(0);
                }
            }
        }
        DrawGrid() {
            let result = "";
            for (let h = 0; h < this.height; h++) {
                for (let w = 0; w < this.width; w++) {
                    result += this.Grid[h][w] == 1 ? this.blockOn : this.blockOff;
                }
                result += "<br/>";
            }
            return result;
        }
    }
    ttrs.View = View;
})(ttrs || (ttrs = {}));
var view = new ttrs.View();
document.querySelector("#view").innerHTML = view.DrawGrid();
