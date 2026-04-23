const socket = io();

const handleClick = (e) => {
    const { checked, id } = e.target;

    if (checked) socket.emit("socket:checked", id);
    else socket.emit("socket:unchecked", id);
}

socket.on("io:conn", (checkboxes, users) => {
    console.log("new socket connected");

    document.getElementById("users").innerText = users;

    const grid = document.getElementById("checkbox-grid");
    grid.innerHTML = "";

    checkboxes.forEach((_, i) => {
        const box = document.createElement("input");

        box.type = "checkbox";
        box.id = i;
        box.onclick = handleClick;
        box.checked = checkboxes[i];

        grid.appendChild(box);
    });
});

socket.on("socket:checked", (id) => {
    document.getElementById(id).checked = true;
});

socket.on("socket:unchecked", (id) => {
    document.getElementById(id).unchecked = false;
});

socket.on("io:diss", (users) => {
    document.getElementById("users").innerText = users;
});