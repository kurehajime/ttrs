namespace ttrs{

    export enum MinoType{
        I,
        O,
        S,
        Z,
        J,
        L,
        T,
        None,
    }

    export enum Action{
        None,
        Put,
        Del,
    }

    export class Mino{
        public MinoType: MinoType;
        public Map:number[][];
        public X:number;
        public Y:number;
        constructor() {
        }
    }
    export class MinoHelper{
        public static Width : number =10;
        public static Height: number =20;
        private static minoArray:number[][][] = [];

        static GetRandMino():number[][]{
            if(this.minoArray.length == 0){
                this.minoArray = this.GetMinoSet();
            }

            return this.minoArray.pop();
        }

        static GetMinoSet():number[][][]{
            let result:number[][][] = [];
            for (let i = 0; i < 7; i++) {
                result.push(this.GetMino(i));
            }

            for(var i = result.length - 1; i > 0; i--){
                var r = Math.floor(Math.random() * (i + 1));
                var tmp = result[i];
                result[i] = result[r];
                result[r] = tmp;
            }

            return result;
        }

        static GetMino(minoType:MinoType):number[][] {
            switch (minoType) {
                case MinoType.I:
                        return [
                            [1,0,0,0],
                            [1,0,0,0],
                            [1,0,0,0],
                            [1,0,0,0],
                            ];
                case MinoType.O:
                    return [
                        [1,1,0,0],
                        [1,1,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        ];
                case MinoType.S:
                    return [
                        [0,1,1,0],
                        [1,1,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        ];
                case MinoType.Z:
                    return [
                            [1,1,0,0],
                            [0,1,1,0],
                            [0,0,0,0],
                            [0,0,0,0],
                            ];
                case MinoType.J:
                    return [
                            [1,0,0,0],
                            [1,1,1,0],
                            [0,0,0,0],
                            [0,0,0,0],
                            ];
                case MinoType.L:
                    return [
                            [1,1,1,0],
                            [1,0,0,0],
                            [0,0,0,0],
                            [0,0,0,0],
                            ];
                case MinoType.T:
                    return [
                            [0,1,0,0],
                            [1,1,1,0],
                            [0,0,0,0],
                            [0,0,0,0],
                            ];
            }
            return [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                ];
        }

        static Copy(grid:number[][]):number[][]{
            let result:number[][] =[];
            for (let r = 0; r < grid.length; r++) {
                result.push(grid[r].concat());                
            }
            return result;
        }

        static Merge(base:number[][],mino:number[][],y:number,x:number):[number[][],boolean]{
            let result = MinoHelper.Copy(base);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if(mino[h][w] == 0){
                        continue;
                    }
                    if(h+y > MinoHelper.Height -1 
                        || w+x > MinoHelper.Width -1 
                        || h+y < 0 
                        || w+x < 0 
                        ){
                        return [MinoHelper.Copy(base),false];
                    }
                    if(result[h+y][w+x] == 1){
                        return [MinoHelper.Copy(base),false];
                    }
                    result[h+y][w+x] = 1;
                }
            }
            return [result,true];
        }

        public static Falled(base:number[][],mino:number[][],y:number,x:number):boolean{
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if(mino[h][w] == 0){
                        continue;
                    }
                    if(h+y > MinoHelper.Height -1 
                        || w+x > MinoHelper.Width -1 
                        || h+y < 0 
                        || w+x < 0 
                        ){
                        return true;
                    }
                    if(h + y >= MinoHelper.Height -1){ //最下段
                        return true;
                    }
                    if(base[h + y + 1][w + x] == 1){ // 下にブロックがある
                        return true;
                    }
                }
            }
            return false;
        }

        public static IsGameOver(base:number[][],mino:number[][],y:number,x:number):boolean{
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if(mino[h][w] == 0){
                        continue;
                    }
                    if(base[h+y][w+x] == 1){
                        return true;
                    }
                }
            }
            return false;
        }

        public static Rotate(mino:number[][],y:number,x:number):number[][]{
            let result = MinoHelper.Copy(mino);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    result[h][w] = mino[mino.length -1 - w][h];
                }
            }
            return this.Pad(result);
        }

        public static Pad(mino:number[][]):number[][]{
            let x = mino.length;
            let y = mino.length;
            let result = this.GetMino(MinoType.None);
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if(mino[h][w]==1){
                        y = Math.min(y,h);
                        x = Math.min(x,w);
                    }
                }
            }
            for (let h = 0; h < mino.length; h++) {
                for (let w = 0; w < mino.length; w++) {
                    if(h+y >= mino.length ||
                        w+x >= mino.length){
                        continue;
                    }
                    if(mino[h+y][w+x]==1){
                        result[h][w] = mino[h+y][w+x];
                    }
                }
            }
            return result;
        }

        public static GetBlackBase():number[][]{
            let result:number[][] =[];
            for (let h = 0; h < MinoHelper.Height; h++) {
                result.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    result[h].push(0);
                }                
            }
            return result;
        }

        public static Delete(base:number[][]):[number[][],boolean]{
            let deleteLines:number[] =[]; 
            let result = this.Copy(base);
            for (let h = 0; h < MinoHelper.Height; h++) {
                let allBlock = true; 
                for (let w = 0; w < MinoHelper.Width; w++) {
                    if(base[h][w]==0){
                        allBlock = false;
                    }
                }
                if(allBlock){
                    deleteLines.push(h);
                }
            }

            if(deleteLines.length == 0){
                return [base,false];
            }

            for (let d = deleteLines.length-1; d >= 0 ; d--) {
                result.splice(deleteLines[d],1);
            }

            for (let d = 0; d < deleteLines.length ; d++) {
                let row :number[] = [];
                for (let w = 0; w < MinoHelper.Width; w++) {
                    row.push(0);
                }
                result.unshift(row);
            }

            return [result,true];
        }

    }
    export class Game{
        public Grid : number[][];
        public Update:boolean = true;

        private blockOff:string = "□";
        private blockOn:string = "■";

        private tick : number = 0;
        private fps:number = 1000/30;
        private frame :number = 0;
        private wait :boolean =false;
        private actionCount:number = 0;
        private prevAction:Action = Action.None;

        private minoX : number;
        private minoY : number;
        private plusX : number = 0;
        private plusY : number = 0;
        private plusRotate :number = 0;
        private mino : number[][];

        constructor(document:Document) {
            this.Grid = [];
            document.addEventListener("keydown",(e)=>{
                this.onKeyDown(this,e);
            });
            this.Init()
        }

        public Init(){
            this.Grid =[];
            for (let h = 0; h < MinoHelper.Height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    this.Grid[h].push(0);
                }                
            }
            this.mino = ttrs.MinoHelper.GetRandMino();
            this.minoX=MinoHelper.Width / 2;
            this.minoY=0;
        }

        public DrawGrid() : string{
            let result = "";
            let grid = MinoHelper.Merge(this.Grid,this.mino,this.minoY,this.minoX)[0];
            for (let h = 0; h < MinoHelper.Height; h++) {
                for (let w = 0; w < MinoHelper.Width; w++) {
                    result += grid[h][w] == 1 ? this.blockOn : this.blockOff;         
                }
                result += "<br/>";
            }

            return result;
        }

        public Next():[boolean,Action]{
            let newTick = Date.now();
            let diff = newTick - this.tick;
            if( diff / this.fps >= 1 || this.Update) {
                this.tick = newTick;
                this.Update =false;
                let action = this.nextScene();
                return [true,action];
            }
            return [false,Action.None];
        }

        private nextScene():Action{
            let action:Action = Action.None;
            this.frame += 1;

            if(this.plusRotate != 0){
                let i=0;
                let ok :boolean = false;
                for (i = 0; i < 4; i++) {
                    let rotate = MinoHelper.Rotate(this.mino,this.minoY - i,this.minoX);
                    let result = MinoHelper.Merge(this.Grid,rotate,this.minoY - i,this.minoX + this.plusX);
                    if(result[1] == true){
                        this.mino = rotate;
                        ok = true;
                        break;
                    }
                }
                if(ok){
                    this.minoY = this.minoY - i;
                }
                this.wait = true;
            }else if(this.plusX != 0){
                var result = MinoHelper.Merge(this.Grid,this.mino,this.minoY,this.minoX + this.plusX);
                if(result[1] == true){
                    this.minoX += this.plusX;
                }
                this.wait = true;
            }else if(MinoHelper.Falled(this.Grid,this.mino,this.minoY,this.minoX)){
                action = Action.Put;
                let result = MinoHelper.Merge(this.Grid,this.mino,this.minoY,this.minoX);
                let deleted = MinoHelper.Delete(result[0])[1];
                if(this.frame % 6 == 0 || deleted){
                    if(this.wait == true && deleted ==false){
                        this.wait = false;
                    }else{
                        this.Grid = result[0];
                        this.mino = MinoHelper.GetRandMino();
                        this.minoY = 0;
                        this.minoX = MinoHelper.Width / 2;
                        let del= MinoHelper.Delete(this.Grid);
                        this.Grid = del[0];
                        if(deleted){
                            this.prevAction = Action.Del;
                            this.actionCount = 18;
                        }
                        if(MinoHelper.IsGameOver(this.Grid,this.mino,this.minoY,this.minoX)){
                            this.Init();
                        }
                    }
                }
            }else {
                if(this.frame % 3 == 0 || this.plusY != 0){
                    this.minoY += 1;
                }
            }
            this.plusX = 0;
            this.plusY = 0;
            this.plusRotate = 0;
            if(this.actionCount > 0){
                this.actionCount += -1;
                action = this.prevAction;
            }else{
                this.prevAction = action;
            }
            return action;
        }

        private onKeyDown(game:Game,e: KeyboardEvent){
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
}

var view = new ttrs.Game(document);
var viewElement = document.querySelector("#view");
function animate_handler() {
    let result = view.Next();
    if(result[0]){
        viewElement.innerHTML = view.DrawGrid();
        if(result[1] == ttrs.Action.Put){
            viewElement.classList.add("puru");
        }else if(result[1] == ttrs.Action.Del){
            viewElement.classList.add("pika");
        }else{
            viewElement.classList.remove("puru");
            viewElement.classList.remove("pika");
        }
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();