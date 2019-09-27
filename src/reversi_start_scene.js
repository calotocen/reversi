class StartScene {
    constructor() {
        this.viewElement = document.getElementById("startView");
    }

    start() {
        this.viewElement.style.display = "";
        window.onclick = event => {
            // 選択した手番を取得して、これをチェックする。
            let move = event.target.getAttribute("value");
            if (move != "black" && move != "white" && move != "random") {
                // 手番選択がなされていないため、処理を中止する。
                return;
            }

            // 手番選択が「おまかせ」である場合は、先手・後手を決める。
            if (move == "random") {
                move = (Math.random() < 0.5) ? "black" : "white";
            }

            // 本シーンで表示したビューを非表示化後、次のシーンを実行する。
            this.viewElement.style.display = "none";
            (new MainScene(move)).start();
        };
    }
}
