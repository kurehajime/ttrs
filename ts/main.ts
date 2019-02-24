namespace ttrs{
    export class foo{}

    enum MinoType{
        I,
        O,
        S,
        Z,
        J,
        L,
        T,
    }

    class Mino{
        public MinoType: MinoType;
        constructor(public minoType: MinoType) {
            this.MinoType = minoType;
        }
    }
    class MinoHelper{
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

    
    

    
}
  
var foo = new ttrs.foo();
console.log(foo);