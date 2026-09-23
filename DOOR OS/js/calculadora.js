let telaCheiaCount = 0;


//funcao de maximizar ou deixar a tela em janela
function maximizarOuMinimizarTela(){
    document.getElementById('janela').classList.toggle('tela-cheia');
    document.getElementById('janela').classList.add('aberto');
    telaCheiaCount ++;
    if(telaCheiaCount % 2 === 1){
        document.getElementById('historico').classList.add('exibir-historico');
    }else if(telaCheiaCount % 2 === 0){
        document.getElementById('historico').classList.remove('exibir-historico');
    }
    
}

//variaveis da calculadora
let valCalc = {
    numeroUm: '',
    ope: '',
    contaExibida: '',
    numeroExibido: '',
    resExibido: false,
    numUmUsado: false
};

//pega o audio da tela azul
const audioTelaAzulDivisao = new Audio('arquivos/audio-tela-azul.mp3');

//exibe o numero digitado
function exibirNumero() {
    const mostrar = document.getElementById('exibir');
    mostrar.innerText = valCalc.numeroExibido;
}

//exibe a conta que está sendo realizado
function exibirConta() {
    const mostrar = document.getElementById('exibir-calculo');
    mostrar.innerText = valCalc.contaExibida;
}

//faz os botoes da calculadora funcionarem
function inserirNumero(valor) {

    if ('0123456789'.includes(valor)) {
        if (valCalc.resExibido === true) {
            valCalc.contaExibida = '';
            valCalc.numeroExibido = valor;
            exibirNumero();
            exibirConta();
            valCalc.resExibido = false;
        } else {
            valCalc.numeroExibido += valor;
            exibirNumero();
        }


    } else if ('+-*/'.includes(valor)) {
        if (valCalc.numUmUsado === false) {
            valCalc.numeroUm = Number(valCalc.numeroExibido);
            valCalc.numUmUsado = true;
        }
        if (valCalc.resExibido === true) {
            valCalc.numeroUm = Number(valCalc.numeroExibido);
            valCalc.resExibido = false;
        }
        valCalc.ope = valor;
        valCalc.contaExibida = valCalc.numeroUm + valor;
        exibirConta();
        valCalc.numeroExibido = '';



    } else if (valor === 'quad') {
        valCalc.numeroUm = Number(valCalc.numeroExibido);
        valCalc.numeroExibido = valCalc.numeroUm ** 2;
        exibirNumero();
        adicionarHistorico('quad');

    } else if (valor === 'backspace') {
        valCalc.numeroExibido = valCalc.numeroExibido.slice(0, -1);
        exibirNumero();

    } else if (valor === '=') {
        valCalc.resExibido = true;
        let n1 = valCalc.numeroUm;
        let n2 = Number(valCalc.numeroExibido);
        let operacao = valCalc.ope;

        if (operacao === '+') {
            valCalc.contaExibida += n2;
            valCalc.numeroExibido = n1 + n2;
        } else if (operacao === '-') {
            valCalc.contaExibida += n2;
            valCalc.numeroExibido = n1 - n2;
        } else if (operacao === '*') {
            valCalc.contaExibida += n2;
            valCalc.numeroExibido = n1 * n2;
        } else if (operacao === '/') {
            if (n2 === 0) {
                audioTelaAzulDivisao.currentTime = 0.5;
                audioTelaAzulDivisao.play();
                document.body.innerHTML = '<img src="arquivos/tela-azul-calculadora.jpeg" class="tela-azul">';

            } else {
                valCalc.contaExibida += n2;
                valCalc.numeroExibido = n1 / n2;
            }
        }


        exibirNumero();
        exibirConta();
        adicionarHistorico();

    } else if (valor === 'c') {
        valCalc.contaExibida = "";
        valCalc.numeroExibido = "";
        valCalc.numeroUm = "";
        valCalc.ope = "";
        exibirConta();
        exibirNumero();
        valCalc.numUmUsado = false;

    } else if (valor === 'maisOuMenos') {
        if (valCalc.numeroExibido.includes('-')) {
            valCalc.numeroExibido = valCalc.numeroExibido.slice(1);
        } else {
            valCalc.numeroExibido = '-' + valCalc.numeroExibido;
        }
        exibirNumero();


    } else if (valor === ',') {
        if (!valCalc.numeroExibido.includes('.') && valCalc.numeroExibido != '') {
            valCalc.numeroExibido += '.';
            exibirNumero();
        }
    }

    
}
//o 'x', fecha a janela
function voltar(){
    document.getElementById('janela').classList.remove('tela-cheia');
    document.getElementById('janela').classList.remove('aberto');
}

//adiciona historico
function adicionarHistorico(e){
    let exibirHistorico = document.getElementById('lista-historico');

    if(e === 'quad'){
        exibirHistorico.innerHTML += `<p class="texto-historico">${valCalc.numeroUm}^2=</p><p class="resultado-historico">${valCalc.numeroExibido}</p>`;
    }else{
        exibirHistorico.innerHTML += `<p class="texto-historico">${valCalc.contaExibida}=</p><p class="resultado-historico">${valCalc.numeroExibido}</p>`;
    }
}