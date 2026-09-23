let relogio = document.getElementById('relogio');

//atualiza relogio
function attRelogio(){
    const horaAtual = new Date();

    let hora = horaAtual.getHours();
    let minuto = horaAtual.getMinutes();

    hora = String(hora).padStart(2, '0');
    minuto = String(minuto).padStart(2, '0');

    relogio.textContent = `${hora}:${minuto}`;
}

//atualiza o relogio a cada 1 segundo
setInterval(attRelogio, 1000);

attRelogio();

//sincroniza os minutos
setTimeout(() => {
    attRelogio()
    setInterval(attRelogio, 60000);
}, 60 - new Date().getSeconds() * 1000);

//abre e fecha o pop up confirmacao
function abrirConfirmacaoQuiz(){
    document.getElementById('confirmacaoPopUp').classList.add('confirmacao-ativado');
}

function fecharConfirmacaoQuiz(){  
    document.getElementById('confirmacaoPopUp').classList.remove('confirmacao-ativado');
}