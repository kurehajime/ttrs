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

    }
    export class View{
        public Grid : number[][];
        public Update:boolean = true;

        private blockOff:string = "□";
        private blockOn:string = "■";

        private tick : number = 0;
        private fps:number = 1000/30;

        constructor() {
            this.Grid = [];
            for (let h = 0; h < MinoHelper.Height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < MinoHelper.Width; w++) {
                    this.Grid[h].push(0);
                }                
            }
        }

        public DrawGrid() : string{
            let result = "";
            for (let h = 0; h < MinoHelper.Height; h++) {
                for (let w = 0; w < MinoHelper.Width; w++) {
                    result += this.Grid[h][w] == 1 ? this.blockOn : this.blockOff;         
                }
                result += "<br/>";
            }
            return result;
        }

        public Next():boolean{
            let newTick = Date.now();
            let diff = newTick - this.tick;
            this.tick = newTick;
            if( diff / this.fps >= 1 || this.Update) {
                this.Update =false;
                return true;
            }
            return false;
        }
    }
}

var view = new ttrs.View();
var result = ttrs.MinoHelper.Merge(view.Grid,ttrs.MinoHelper.GetMino(ttrs.MinoType.T),2,5);
view.Grid = result[0];
function animate_handler() {
    if(view.Next()){
        document.querySelector("#view").innerHTML = view.DrawGrid();
    }
    window.requestAnimationFrame(animate_handler);
}
animate_handler();