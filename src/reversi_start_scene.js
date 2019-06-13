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
