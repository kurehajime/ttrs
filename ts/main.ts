namespace ttrs{

    export enum MinoType{
        I,
        O,
        S,
        Z,
        J,
        L,
        T,
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
        static GetMino(minoType:MinoType):number[][] {
            switch (minoType) {
                case MinoType.I:
                        return [
                            [1,0,0,0],
                            [1,0,0,0],
                            [1,0,0,0],
                            [1,0,0,0],
                            ];
                case MinoType.I:
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
                    if(h + y == MinoHelper.Height -1){ //最下段
                        return true;
                    }
                    if(base[h + y + 1][w + x] == 1){ // 下にブロックがある
                        return true;
                    }
                }
            }
            return false;
        }

    }
    export class Game{
        public Grid : number[][];
        public Update:boolean = true;

        private blockOff:string = "□";
        private blockOn:string = "■";

        private tick : number = 0;
        private fps:number = 1000/30;

        private minoX : number;
        private minoY : number;
        private plusX : number = 0;
        private plusY : number = 0;
        private mino : number[][];

        constructor(document:Document) {
            this.Grid = [];
            document.addEventListener("keydown",(e)=>{
                this.onKeyDown(this,e);
            });
            this.Init()
        }

        public Init(){
            for (let h = 0; h < MinoHelper.Height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    this.Grid[h].push(0);
                }                
            }
            this.mino = ttrs.MinoHelper.GetMino(ttrs.MinoType.T)
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

        public Next():boolean{
            let newTick = Date.now();
            let diff = newTick - this.tick;
            if( diff / this.fps >= 1 || this.Update) {
                this.tick = newTick;
                this.Update =false;
                this.nextScene();
                return true;
            }
            return false;
        }

        private nextScene(){
            if(MinoHelper.Falled(this.Grid,this.mino,this.minoY,this.minoX)){
                var result = MinoHelper.Merge(this.Grid,this.mino,this.minoY,this.minoX);
                this.Grid = result[0];
                this.minoY = 0;
                this.minoX = MinoHelper.Width / 2;
            }else{
                if(this.plusX != 0){
                    var result = MinoHelper.Merge(this.Grid,this.mino,this.minoY,this.minoX + this.plusX);
                    if(result[1] == true){
                        this.minoX += this.plusX;
                    }
                }
                this.minoY += 1;
            }
            this.plusX = 0;
            this.plusY = 0;
        }

        private onKeyDown(game:Game,e: KeyboardEvent){
            switch (e.keyCode) {
                case 37: //←
                    this.plusX = -1;
                    break;
                case 38: //←
                    this.plusY = -1;
                    break;
                case 39: //→
                    this.plusX = +1;
                    break;
                case 40: //↓
                    this.plusY = +1;
                    break;
                default:
                    break;
            }
            game.Update = true;　
        }
    }
}

var view = new ttrs.Game(document);
function animate_handler() {
    if(view.Next()){
        document.querySelector("#view").innerHTML = view.DrawGrid();
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();