buttons = ["jugar", "stats", "ranking"]
buttons.forEach(button => {document.getElementById(button).addEventListener("click", function () { test() }, false)});

function test() {
    console.log("clicked")
}