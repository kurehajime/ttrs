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
        constructor() {
        }
    }
    ttrs.Mino = Mino;
    class MinoHelper {
        static GetMino(minoType) {
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
        static Copy(grid) {
            let result = [];
            for (let r = 0; r < grid.length; r++) {
                result.push(grid[r].concat());
            }
            return result;
        }
        static Merge(base, mino, y, x) {
            let result = MinoHelper.Copy(base);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if (mino[h][w] == 0) {
                        continue;
                    }
                    if (h + y > MinoHelper.Height - 1
                        || w + x > MinoHelper.Width - 1
                        || h + y < 0
                        || w + x < 0) {
                        return [MinoHelper.Copy(base), false];
                    }
                    result[h + y][w + x] = 1;
                }
            }
            return [result, true];
        }
    }
    MinoHelper.Width = 10;
    MinoHelper.Height = 20;
    ttrs.MinoHelper = MinoHelper;
    class View {
        constructor() {
            this.Update = true;
            this.blockOff = "□";
            this.blockOn = "■";
            this.tick = 0;
            this.fps = 1000 / 30;
            this.Grid = [];
            for (let h = 0; h < MinoHelper.Height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    this.Grid[h].push(0);
                }
            }
        }
        DrawGrid() {
            let result = "";
            for (let h = 0; h < MinoHelper.Height; h++) {
                for (let w = 0; w < MinoHelper.Width; w++) {
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
var result = ttrs.MinoHelper.Merge(view.Grid, ttrs.MinoHelper.GetMino(ttrs.MinoType.T), 2, 5);
view.Grid = result[0];
function animate_handler() {
    if (view.Next()) {
        document.querySelector("#view").innerHTML = view.DrawGrid();
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();
