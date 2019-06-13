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
