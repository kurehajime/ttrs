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
            this.Update = true;
            this.blockOff = "□";
            this.blockOn = "■";
            this.width = 10;
            this.height = 20;
            this.tick = 0;
            this.fps = 1000 / 30;
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
        Next() {
            let newTick = Date.now();
            let diff = newTick - this.tick;
            this.tick = newTick;
            if (diff / this.fps >= 1 || this.Update) {
                this.Update = false;
                return true;
            }
            return false;
        }
    }
    ttrs.View = View;
})(ttrs || (ttrs = {}));
var view = new ttrs.View();
function animate_handler() {
    if (view.Next()) {
        document.querySelector("#view").innerHTML = view.DrawGrid();
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();
