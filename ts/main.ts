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
        constructor(public minoType: MinoType) {
            this.MinoType = minoType;
        }
    }
    export class MinoHelper{
        static GenerateMinoMap(minoType:MinoType):number[][] {
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

    }
    export class View{
        public Grid : number[][];
        private blockOff:string = "□";
        private blockOn:string = "■";

        private width : number =10;
        private height: number =20;
        constructor() {
            this.Grid = [];
            for (let h = 0; h < this.height; h++) {
                this.Grid.push([]);
                for (let w = 0; w < this.width; w++) {
                    this.Grid[h].push(0);
                }                
            }
        }
        public DrawGrid() : string{
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
}
  
var view = new ttrs.View();

document.querySelector("#view").innerHTML = view.DrawGrid();