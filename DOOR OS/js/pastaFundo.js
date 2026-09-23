function pastaFundoAberto(){
    document.getElementById('pastaFundo').classList.add('fundo-ativo');
}

function pastaFundoFechado(xizinhu){
    document.getElementById('pastaFundo').classList.remove('fundo-ativo');

    if(xizinhu === 'x'){
        document.getElementById('pastaFundo').classList.remove('ajuste-de-tela')
    }
}

function ajustarTela(){
    document.getElementById('pastaFundo').classList.toggle('ajuste-de-tela');
}

//alterar o fundo

let corpo = document.getElementById('body');

function limparFundo(){
    corpo.classList.remove(
        'cachorros',
        'cachorro-feo',
        'backrooms'
    );
}

function alterarNormal(){
    limparFundo();
}

function alterarCachorros(){
    limparFundo();
    corpo.classList.add('cachorros');
    
}

function alterarCachorroFeo(){
    limparFundo();
    corpo.classList.add('cachorro-feo');
}

function alterarBackrooms(){
    limparFundo();
    corpo.classList.add('backrooms');
}