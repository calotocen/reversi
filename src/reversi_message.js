class MessageView {
    constructor(node) {
        this.node = node;
    }

    // メッセージを表示する。
    show(text) {
        this.originalOnClick = window.onclick;
        window.onclick = event => {
            this.onclick(event);
        }
        this.node.innerText = text;
        this.node.style.display = "";
    }

    // メッセージを消す。
    onclick(event) {
        this.node.style.display = "none";
        this.node.innerText = "";
        window.onclick = this.originalOnClick;
    }
}
