const socket = io("http://localhost:5555");

const u = [];

socket.on("msgRe", (msg, usuario) => {
    const divMsg = document.getElementById('msgs');
    
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    if(usuario == u[0]) {
        h3.classList.add('eum');
        p.classList.add('eum');
        p.classList.add('p');
    }
    h3.innerHTML = usuario;
    p.innerHTML = msg;

    divMsg.appendChild(h3);
    divMsg.appendChild(p);
})

function entrar() {
    const user = document.getElementById("user");
    u.push(user.value);

    if(user.value.length > 0) {
        document.getElementById('usuario').style.display = "none";
        document.getElementById('chat').style.display = "flex";

        socket.emit("conectado", user.value);
    } else {
        alert("Digite seu nome de Usuário");
    };
}

function enviar() {
    const msg = document.getElementById("men");
    if(msg.value.length > 0) {
        socket.emit("msg", msg.value, u[0]);
        msg.value = "";
    } else {
        console.log("Escreva uma mensagem");
    };
}