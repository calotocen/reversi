class MainScene {
    constructor(humanPiece) {
        this.viewElement = document.getElementById("mainView");
        this.model = new ReversiModel();
        this.view = new ReversiView(this.model, this.viewElement.querySelectorAll(".stone.empty-for-black"));
    }

    start() {
        this.model.setUp();
        this.view.update();
        this.viewElement.style.display = "";
        window.onclick = event => {
            this.view.onclick(event);
        }
    }
}
