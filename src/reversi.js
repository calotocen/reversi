let elements;
let index;

window.onload = () => {
    elements = [];
    ["startView", "mainView", "resultView", "resultMessage", "victoryMessage", "defeatMessage"].forEach(id => {
        elements.push(document.getElementById(id));
    });
    elements.forEach(e => {
        e.style.display = "none";
    });
    index = 0;
}

window.onclick = () => {
    elements.forEach((e, i) => {
        if (i == index) {
            if (i >= 3) {
                e.parentNode.style.display = "";
            }
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    });
    index = (index + 1) % elements.length;
}