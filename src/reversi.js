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

    contains(x, y) {
        return 0 <= x && x <= this.width && 0 <= y && y <= this.height;
    }

    get(x, y) {
        return contains(x, y) ? this[x + y * this.width] : Piece.none;
    }

    set(x, y, piece) {
        this[x + y * this.width] = piece;
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
        this.nodes = nodes;     // type of this.nodes is NodeList.
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
}
