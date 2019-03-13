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
        MinoType[MinoType["None"] = 7] = "None";
    })(MinoType = ttrs.MinoType || (ttrs.MinoType = {}));
    let Action;
    (function (Action) {
        Action[Action["None"] = 0] = "None";
        Action[Action["Put"] = 1] = "Put";
        Action[Action["Del"] = 2] = "Del";
    })(Action = ttrs.Action || (ttrs.Action = {}));
    class Mino {
        constructor() {
        }
    }
    ttrs.Mino = Mino;
    class MinoHelper {
        static GetRandMino() {
            if (this.minoArray.length == 0) {
                this.minoArray = this.GetMinoSet();
            }
            return this.minoArray.pop();
        }
        static GetMinoSet() {
            let result = [];
            for (let i = 0; i < 7; i++) {
                result.push(this.GetMino(i));
            }
            for (var i = result.length - 1; i > 0; i--) {
                var r = Math.floor(Math.random() * (i + 1));
                var tmp = result[i];
                result[i] = result[r];
                result[r] = tmp;
            }
            return result;
        }
        static GetMino(minoType) {
            switch (minoType) {
                case MinoType.I:
                    return [
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                    ];
                case MinoType.O:
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
                    if (result[h + y][w + x] == 1) {
                        return [MinoHelper.Copy(base), false];
                    }
                    result[h + y][w + x] = 1;
                }
            }
            return [result, true];
        }
        static Falled(base, mino, y, x) {
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if (mino[h][w] == 0) {
                        continue;
                    }
                    if (h + y > MinoHelper.Height - 1
                        || w + x > MinoHelper.Width - 1
                        || h + y < 0
                        || w + x < 0) {
                        return true;
                    }
                    if (h + y >= MinoHelper.Height - 1) { //最下段
                        return true;
                    }
                    if (base[h + y + 1][w + x] == 1) { // 下にブロックがある
                        return true;
                    }
                }
            }
            return false;
        }
        static IsGameOver(base, mino, y, x) {
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if (mino[h][w] == 0) {
                        continue;
                    }
                    if (base[h + y][w + x] == 1) {
                        return true;
                    }
                }
            }
            return false;
        }
        static Rotate(mino, y, x) {
            let result = MinoHelper.Copy(mino);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    result[h][w] = mino[mino.length - 1 - w][h];
                }
            }
            return this.Pad(result);
        }
        static Pad(mino) {
            let x = mino.length;
            let y = mino.length;
            let result = this.GetMino(MinoType.None);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if (mino[h][w] == 1) {
                        y = Math.min(y, h);
                        x = Math.min(x, w);
                    }
                }
            }
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if (h + y >= mino.length ||
                        w + x >= mino.length) {
                        continue;
                    }
                    if (mino[h + y][w + x] == 1) {
                        result[h][w] = mino[h + y][w + x];
                    }
                }
            }
            return result;
        }
        static GetBlackBase() {
            let result = [];
            for (let h = 0; h < MinoHelper.Height; h++) {
                result.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    result[h].push(0);
                }
            }
            return result;
        }
        static Delete(base) {
            let deleteLines = [];
            let result = this.Copy(base);
            for (let h = 0; h < MinoHelper.Height; h++) {
                let allBlock = true;
                for (let w = 0; w < MinoHelper.Width; w++) {
                    if (base[h][w] == 0) {
                        allBlock = false;
                    }
                }
                if (allBlock) {
                    deleteLines.push(h);
                }
            }
            if (deleteLines.length == 0) {
                return [base, false];
            }
            for (let d = deleteLines.length - 1; d >= 0; d--) {
                result.splice(deleteLines[d], 1);
            }
            for (let d = 0; d < deleteLines.length; d++) {
                let row = [];
                for (let w = 0; w < MinoHelper.Width; w++) {
                    row.push(0);
                }
                result.unshift(row);
            }
            return [result, true];
        }
    }
    MinoHelper.Width = 10;
    MinoHelper.Height = 20;
    MinoHelper.minoArray = [];
    ttrs.MinoHelper = MinoHelper;
    class Game {
        constructor(document) {
            this.Update = true;
            this.blockOff = "□";
            this.blockOn = "■";
            this.tick = 0;
            this.fps = 1000 / 30;
            this.frame = 0;
            this.wait = false;
            this.actionCount = 0;
            this.prevAction = Action.None;
            this.plusX = 0;
            this.plusY = 0;
            this.plusRotate = 0;
            this.Grid = [];
            document.addEventListener("keydown", (e) => {
                this.onKeyDown(this, e);
            });
            this.Init();
        }
        Init() {
            this.Grid = [];
            for (let h = 0; h < MinoHelper.Height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    this.Grid[h].push(0);
                }
            }
            this.mino = ttrs.MinoHelper.GetRandMino();
            this.minoX = MinoHelper.Width / 2;
            this.minoY = 0;
        }
        DrawGrid() {
            let result = "";
            let grid = MinoHelper.Merge(this.Grid, this.mino, this.minoY, this.minoX)[0];
            for (let h = 0; h < MinoHelper.Height; h++) {
                for (let w = 0; w < MinoHelper.Width; w++) {
                    result += grid[h][w] == 1 ? this.blockOn : this.blockOff;
                }
                result += "<br/>";
            }
            return result;
        }
        Next() {
            let newTick = Date.now();
            let diff = newTick - this.tick;
            if (diff / this.fps >= 1 || this.Update) {
                this.tick = newTick;
                this.Update = false;
                let action = this.nextScene();
                return [true, action];
            }
            return [false, Action.None];
        }
        nextScene() {
            let action = Action.None;
            this.frame += 1;
            if (this.plusRotate != 0) {
                let i = 0;
                let ok = false;
                for (i = 0; i < 4; i++) {
                    let rotate = MinoHelper.Rotate(this.mino, this.minoY - i, this.minoX);
                    let result = MinoHelper.Merge(this.Grid, rotate, this.minoY - i, this.minoX + this.plusX);
                    if (result[1] == true) {
                        this.mino = rotate;
                        ok = true;
                        break;
                    }
                }
                if (ok) {
                    this.minoY = this.minoY - i;
                }
                this.wait = true;
            }
            else if (this.plusX != 0) {
                var result = MinoHelper.Merge(this.Grid, this.mino, this.minoY, this.minoX + this.plusX);
                if (result[1] == true) {
                    this.minoX += this.plusX;
                }
                this.wait = true;
            }
            else if (MinoHelper.Falled(this.Grid, this.mino, this.minoY, this.minoX)) {
                action = Action.Put;
                let result = MinoHelper.Merge(this.Grid, this.mino, this.minoY, this.minoX);
                let deleted = MinoHelper.Delete(result[0])[1];
                if (this.frame % 6 == 0 || deleted) {
                    if (this.wait == true && deleted == false) {
                        this.wait = false;
                    }
                    else {
                        this.Grid = result[0];
                        this.mino = MinoHelper.GetRandMino();
                        this.minoY = 0;
                        this.minoX = MinoHelper.Width / 2;
                        let del = MinoHelper.Delete(this.Grid);
                        this.Grid = del[0];
                        if (deleted) {
                            this.prevAction = Action.Del;
                            this.actionCount = 18;
                        }
                        if (MinoHelper.IsGameOver(this.Grid, this.mino, this.minoY, this.minoX)) {
                            this.Init();
                        }
                    }
                }
            }
            else {
                if (this.frame % 3 == 0 || this.plusY != 0) {
                    this.minoY += 1;
                }
            }
            this.plusX = 0;
            this.plusY = 0;
            this.plusRotate = 0;
            if (this.actionCount > 0) {
                this.actionCount += -1;
                action = this.prevAction;
            }
            else {
                this.prevAction = action;
            }
            return action;
        }
        onKeyDown(game, e) {
            switch (e.keyCode) {
                case 37: //左
                    this.plusX = -1;
                    break;
                case 38: //上
                    this.plusY = -1;
                    break;
                case 39: //右
                    this.plusX = +1;
                    break;
                case 40: //下
                    this.plusY = +1;
                    break;
                case 32: //Space
                    this.plusRotate = 1;
                    break;
                default:
                    this.plusRotate = 1;
                    break;
            }
            e.preventDefault();
            game.Update = true;
        }
    }
    ttrs.Game = Game;
})(ttrs || (ttrs = {}));
var view = new ttrs.Game(document);
var viewElement = document.querySelector("#view");
function animate_handler() {
    let result = view.Next();
    if (result[0]) {
        viewElement.innerHTML = view.DrawGrid();
        if (result[1] == ttrs.Action.Put) {
            viewElement.classList.add("puru");
        }
        else if (result[1] == ttrs.Action.Del) {
            viewElement.classList.add("pika");
        }
        else {
            viewElement.classList.remove("puru");
            viewElement.classList.remove("pika");
        }
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();
