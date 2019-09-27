class Piece {
    static get none() {
        return 0;
    }
    static get black() {
        return 1;
    }
    static get white() {
        return 2;
    }
    static get wall() {
        return 3;
    }
    static opposite(piece) {
        const oppositePiece = {
            [this.none]: this.none,
            [this.black]: this.white,
            [this.white]: this.black,
        };
        return oppositePiece[piece];
    }
}

class Board extends Array {
    constructor() {
        super(64);       // 64 = this.width * this.height
        this.width = 8;
        this.height = 8;
        this.fill(Piece.none);
    }

    toIndex(x, y) {
        return x + y * this.width;
    }

    toX(index) {
        return index % this.width;
    }

    toY(index) {
        return Math.floor(index / this.height);
    }

    contains(x, y) {
        return 0 <= x && x <= this.width && 0 <= y && y <= this.height;
    }

    get(x, y) {
        return this.contains(x, y) ? this[x + y * this.width] : Piece.wall;
    }

    set(x, y, piece) {
        this[x + y * this.width] = piece;
    }

    // 指定されたマスに、指定された石を置いた場合に、裏返せる相手石の個数を数える。
    // 方向を指定した場合は、指定された方向についてのみ、裏返せる相手石の個数を数える。
    countTurnablePieces(x, y, piece, directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]) {
        // 当該マスに石を置けるかチェックする。
        if (this.get(x, y) != Piece.none) {
            return 0;
        }

        // 指定された方向について、裏返せる石の個数を数える。
        let sum = 0;
        let opposite = Piece.opposite(piece);
        for (let [dx, dy] of directions) {
            // 当該方向について、相手石以外の石(Piece.none、Piece.wallを含む)が最初に現れるマスを探す。
            // 当該マスにある石が自石であり、かつ間に相手石があったならば、当該方向の相手石を裏返せる。
            let n = 0;                          // 裏返せる石の個数。
            let s;
            for (let px = x + dx, py = y + dy;; px += dx, py += dy, n++) {
                s = this.get(px, py);
                if (s != opposite) {
                    break;
                }
            }
            if (s == piece && n > 0) {
                sum += n;
            }
        }

        // 裏返せる相手石の個数を返す。
        return sum;
    }

    listCountingTurnablePieces(piece) {
        let countList = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let n = this.countTurnablePieces(x, y, piece);
                if (n > 0) {
                    countList[this.toIndex(x, y)] = n;
                }
            }
        }
    }

    // 相手石を裏返す。
    put(x, y, piece) {
        let turned = false;

        // 裏返せる相手石を裏返す。
        for (let direction of [[[-1, -1]], [[0, -1]], [[1, -1]], [[-1, 0]], [[1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]]]) {
            let n = this.countTurnablePieces(x, y, piece, direction);
            if (n > 0) {
                let [[dx, dy]] = direction;
                for (let px = x + dx, py = y + dy; n > 0; px += dx, py += dy, n--) {
                    this.set(px, py, piece);
                }
                turned = true;
            }
        }

        // 相手石を裏返せたので、自石を置く。
        if (turned) {
            this.set(x, y, piece);
        }

        // 自石を置けたかを返す。
        return turned;
    }
}

class ReversiModel {
    constructor() {
        this.currentMove = Piece.none;
        this.board = new Board();
    }

    setUp() {
        this.currentMove = Piece.black;
        this.board.fill(Piece.none);
        this.board.set(3, 3, Piece.white);
        this.board.set(4, 3, Piece.black);
        this.board.set(3, 4, Piece.black);
        this.board.set(4, 4, Piece.white);
    }
}

class ReversiView {
    constructor(model, nodes) {
        this.model = model;
        this.nodes = nodes;     // this.nodesは、NodeList型でなければならない。
        this.messageView = null;
    }

    update() {
        const className = {
            [Piece.black]: {
                [Piece.none]: "stone empty-for-black",
                [Piece.black]: "stone black",
                [Piece.white]: "stone white",
            },
            [Piece.white]: {
                [Piece.none]: "stone empty-for-white",
                [Piece.black]: "stone black",
                [Piece.white]: "stone white",
            },
        };
        const currentMove = this.model.currentMove;
        const board = this.model.board;
        board.forEach((p, i) => {
            this.nodes[i].className = className[currentMove][board[i]];
        });
    }

    onclick(event) {
        const index = event.target.getAttribute("value");
        const board = this.model.board;
        let currentMove = this.model.currentMove;

        let turned = board.put(board.toX(index), board.toY(index), currentMove);
        if (!turned) {
            return;
        }
        currentMove = Piece.opposite(currentMove);
        this.model.currentMove = currentMove;
        this.update();
    }
}
