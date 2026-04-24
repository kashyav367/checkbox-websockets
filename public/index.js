const socket = io();

const handleClick = (e) => {
    const { checked, id } = e.target;

    if (checked) socket.emit("socket:checked", id);
    else socket.emit("socket:unchecked", id);
}

socket.on("io:conn", (checkboxes, users) => {
    console.log("new socket connected");

    const userBox = document.getElementById("users");
    userBox.innerText = users;

    checkboxes.forEach((_, i) => {
        const box = document.createElement("input");

        box.type = "checkbox";
        box.id = i;
        box.onclick = handleClick;
        box.checked = checkboxes[i];

        document.getElementById("checkbox-grid").appendChild(box);
    })
})

socket.on("socket:checked", (id) => {
    const box = document.getElementById(id);
    box.checked = true;
})

socket.on("socket:unchecked", (id) => {
    const box = document.getElementById(id);
    box.checked = false;
})

socket.on("io:diss", (users) => {
    const userBox = document.getElementById("users");
    userBox.innerText = users;
})