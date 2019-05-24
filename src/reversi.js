let gameController;


class StartScene {
    constructor() {
        this.viewElement = document.getElementById("startView");
    }

    start() {
        this.viewElement.style.display = "";
        window.onclick = event => {
            let move = event.target.getAttribute("value");
            if (move == "random") {
                move = (Math.random() < 0.5) ? "black" : "white";
            }

            this.viewElement.style.display = "none";
            (new MainScene(move)).start();
        };
    }
}

class MainScene {
    constructor(move) {
        this.viewElement = document.getElementById("mainView");
    }

    start() {
        (new ResultScene(12, 34, "victory")).start();
    }
}

class ResultScene {
    constructor(numofBlack, numofWhite, result) {
        this.numofBlack = numofBlack;
        this.numofWhite = numofWhite;
        this.result = result;
        this.viewElement = document.getElementById("resultView");
        this.resultMessageElement = document.getElementById("resultMessage");
        this.victoryMessageElement = document.getElementById("victoryMessage");
        this.defeatMessageElement = document.getElementById("defeatMessage");
        this.mainViewElement = document.getElementById("mainView");
    }

    start() {
        this.viewElement.style.display = "";
        this.mainViewElement.style.display = "";
        this.resultMessageElement.style.display = "";
        this.victoryMessageElement.style.display = "none";
        this.defeatMessageElement.style.display = "none";
        let spanElements = this.resultMessageElement.getElementsByTagName("span");
        spanElements[0].textContent = this.numofBlack;
        spanElements[1].textContent = this.numofWhite;

        window.onclick = event => {
            this.resultMessageElement.style.display = "none";
            if (this.result == "victory") {
                this.victoryMessageElement.style.display = "";
            } else {
                this.defeatMessageElement.style.display = "";
            }

            window.onclick = event => {
                this.viewElement.style.display = "none";
                this.mainViewElement.style.display = "none";
                (new StartScene).start();
            }
        }
    }
}

window.onload = () => {
    document.getElementById("startView").style.display = "none";
    document.getElementById("mainView").style.display = "none";
    document.getElementById("resultView").style.display = "none";
    (new StartScene).start();
}
