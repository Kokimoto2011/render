let pontuacao = null; //pontuacao do quiz

//abrir e fechar pop up
function abrirPopUp(){
    document.getElementById('popUp').classList.add('ativo');
    pontuacao = 1;
}

function fecharPopUp(e){
    document.getElementById(e).classList.remove('ativo');
    clearInterval(counter);
    tempoLimite = 30;
        
    document.getElementById('caixa-de-respostas').innerHTML = backup;
        
    textos.perg = document.getElementById('pergunta');
    textos.altA = document.getElementById('alternativaA');
    textos.altB = document.getElementById('alternativaB');
    textos.altC = document.getElementById('alternativaC');
    textos.altD = document.getElementById('alternativaD');
    easterEggs.respGoldenFreddy = null;
    
    easterEggs.bug = false;
    easterEggs.goldenFreddy = false;
}

let cliqueUsuario = false; //identificar clique e evitar que seja possivel clicar varias vezes

//todos os valores usados para a criacao dos calculos
let valQuiz = {
    n1: null,
    n2: null,
    ope: '',
    opeExibido: '',
    resultado: null,
    altCorreta: ''
}

//pega os elementos do html para editar e colocar as perguntas e alternativas
let textos = {
    perg: document.getElementById('pergunta'),
    altA: document.getElementById('alternativaA'),
    altB: document.getElementById('alternativaB'),
    altC: document.getElementById('alternativaC'),
    altD: document.getElementById('alternativaD')
}

//ver se algum dos easter egg foi sorteado
let easterEggs = {
    bug: false,
    goldenFreddy: false,
    respGoldenFreddy: null
}

//backup das perguntas caso cair o freddy
let backup = document.getElementById('caixa-de-respostas').innerHTML;

//para guardar e editar valor da onde aparece os numeros no caso do freddy
let jsvar = {
    v1: 0,
    v2: 0,
    v3: 0,
    v4: 0
};

//define tempo
let tempoLimite = 1;
let counter;
//inicia e vai cronometrando até chegar em 0
function tempo(){
    document.getElementById('tempoExibir').textContent = tempoLimite;
    counter = setInterval(() => {
        tempoLimite--;
        document.getElementById('tempoExibir').textContent = tempoLimite;
        if(tempoLimite < 0){
            clearInterval(counter);
            tempoZerado();
            tempoLimite = 31;
        }
    }, 1000);
}

//gera a pergunta
function pergunta(){
    //a partir do "random" gera todos os valores que vao ser usados para a pergunta
    let perg = Math.floor(Math.random() * 5) + 1;
    valQuiz.ope = Math.floor(Math.random() * 4) + 1;
    valQuiz.n1 = Math.floor(Math.random() * 100) + 1;
    valQuiz.n2 = '';
    
    //gera uma chance cair no caso de algum easter egg
    let pergImp = Math.floor(Math.random() * 20) + 1;
    let jumpscare = Math.floor(Math.random() * 20) + 1;

    //colocar as alternativas do rick roll
    if(pergImp === 1){
        textos.perg.textContent = 'Qual é o valor de 9Ж4A中7Б3あX5Ω2K8ЛQ6文1ZЯ0ΔM中8Б7T5あ3Ω9Ж4C2汉6R1Φ0NЖ7中5あ3Б8Ω2K4L9文6Z1Δ0X';
        textos.altA.textContent = 'Bolo de Cenoura';
        textos.altB.textContent = '67';
        textos.altC.textContent = 'Comiticrimi';
        textos.altD.textContent = '40666';

        easterEggs.bug = true;
    
    }else if(jumpscare === 1 && pergImp !== 1){
        //colocar as alternativas do freddy (no caso os botoes etc)
        easterEggs.goldenFreddy = true;
        textos.perg.textContent = 'Quanto é 1900 + 87?';
        const caixa = document.getElementById('caixa-de-respostas');
        //codigo para editar o html
        caixa.innerHTML = `
        <div class="jumpscare-org">
            <button class="setinhas" onclick="ValoresJumpscare('aum1')">↑</button>
            <button class="setinhas" onclick="ValoresJumpscare('aum2')">↑</button>
            <button class="setinhas" onclick="ValoresJumpscare('aum3')">↑</button>
            <button class="setinhas" onclick="ValoresJumpscare('aum4')">↑</button>

            <p class="jumpscare-text" id="jumpscareText1"></p>
            <p class="jumpscare-text" id="jumpscareText2"></p>
            <p class="jumpscare-text" id="jumpscareText3"></p>
            <p class="jumpscare-text" id="jumpscareText4"></p>

            <button class="setinhas" onclick="ValoresJumpscare('dim1')">↓</button> 
            <button class="setinhas" onclick="ValoresJumpscare('dim2')">↓</button>        
            <button class="setinhas" onclick="ValoresJumpscare('dim3')">↓</button>
            <button class="setinhas" onclick="ValoresJumpscare('dim4')">↓</button>

            <button class="jumpscare-confirm" onclick="atualizarValoresJumpscare('confirm')">Pronto!</button>
        </div>

        `;
        
        atualizarValoresJumpscare();

    }else{
        //resolve o calculo gerado anteriormente para obter o resultado
        switch(valQuiz.ope){
            case 1:
                valQuiz.ope = '+';
                valQuiz.n2 = Math.floor(Math.random() * 100) + 1;
                valQuiz.resultado = valQuiz.n1 + valQuiz.n2;
                valQuiz.opeExibido = '+';
                break;
            case 2:
                valQuiz.ope = '-';
                valQuiz.n2 = Math.floor(Math.random() * valQuiz.n1) + 1;
                valQuiz.resultado = valQuiz.n1 - valQuiz.n2;
                valQuiz.opeExibido = '-';
                break;
            case 3:
                valQuiz.ope = '*';
                valQuiz.n2 = Math.floor(Math.random() * 10) + 1;
                valQuiz.n1 = Math.floor(Math.random() * 10) + 1;
                valQuiz.resultado = valQuiz.n1 * valQuiz.n2;
                valQuiz.opeExibido = 'x';
                break;
            case 4:
                valQuiz.ope = '/';
                valQuiz.resultado = Math.floor(Math.random() * 10) + 1;
                valQuiz.n2 = Math.floor(Math.random() * 10) + 1;
                valQuiz.n1 = valQuiz.resultado * valQuiz.n2;
                valQuiz.opeExibido = '÷';
                break;
        }
        //gera a pergunta em si
        switch(perg){
            case 1:
                textos.perg.textContent = `Qual é o valor de ${valQuiz.n1} ${valQuiz.opeExibido} ${valQuiz.n2}?`;
                break;
            case 2:
                textos.perg.textContent = `Qual é o resultado de ${valQuiz.n1} ${valQuiz.opeExibido} ${valQuiz.n2}?`;
                break;
            case 3:
                textos.perg.textContent = `Diga quanto é ${valQuiz.n1} ${valQuiz.opeExibido} ${valQuiz.n2}:`;
                break;
            case 4:
                textos.perg.textContent = `Resolva: ${valQuiz.n1} ${valQuiz.opeExibido} ${valQuiz.n2}`;
                break;
            case 5:
                if(valQuiz.opeExibido === '+'){
                    textos.perg.textContent = `A soma de ${valQuiz.n1} + ${valQuiz.n2} é:`;
                }else if(valQuiz.opeExibido === '-'){
                    textos.perg.textContent = `A diferença de ${valQuiz.n1} para ${valQuiz.n2} é:`;
                }else if(valQuiz.opeExibido === 'x'){
                    textos.perg.textContent = `O produto de ${valQuiz.n1} por ${valQuiz.n2} é:`;
                }else if(valQuiz.opeExibido === '÷'){
                    textos.perg.textContent = `A razão entre ${valQuiz.n1} e ${valQuiz.n2} é:`;
                }
                break;
        }
        gerarAlternativa();
    }

}

//gera as alternativas
function gerarAlternativa(){
        let alternativaCorreta = Math.floor(Math.random() * 4) + 1;//randomizador da ordem das alternativas
        let errado = new Set();//cria conjunto vazio
        //gera alternativas erradas
        while(errado.size < 3){//executa até 'errado' possuir tres numeros salvos
            let alternativa = valQuiz.resultado + Math.floor(Math.random() * 21) - 10;
            if(alternativa !== valQuiz.resultado){
                errado.add(alternativa);//caso o resultado do 'random' for diferente de todos os numeros incluindo o resultado, inclui na variavel 'errado'
            }
        }
        let arrayErrado = [...errado];//transforma errado em array

        //exibe de acordo com o numero que caiu no randomizador 'alternativa correta'
        switch(alternativaCorreta){
            case 1:
                textos.altA.textContent = valQuiz.resultado;
                textos.altB.textContent = arrayErrado[0];
                textos.altC.textContent = arrayErrado[1];
                textos.altD.textContent = arrayErrado[2];
                    
                valQuiz.altCorreta = 'a';
                break;
            case 2:
                textos.altB.textContent = valQuiz.resultado;
                textos.altA.textContent = arrayErrado[0];
                textos.altC.textContent = arrayErrado[1];
                textos.altD.textContent = arrayErrado[2];

                valQuiz.altCorreta = 'b';    
                break;
            case 3:
                textos.altC.textContent = valQuiz.resultado;
                textos.altB.textContent = arrayErrado[0];
                textos.altA.textContent = arrayErrado[1];
                textos.altD.textContent = arrayErrado[2];
                    
                valQuiz.altCorreta = 'c';
                break;
            case 4:
                textos.altD.textContent = valQuiz.resultado;
                textos.altB.textContent = arrayErrado[0];
                textos.altC.textContent = arrayErrado[1];
                textos.altA.textContent = arrayErrado[2];
                    
                valQuiz.altCorreta = 'd';
                break;
        }
}

//faz os bloquinhos para inserir numero da parte do freddy funcionar
function ValoresJumpscare(qualSeta){
        switch(qualSeta){
            case 'aum1':
                if(jsvar.v1 >= 9){
                    jsvar.v1 = 0;
                }else{
                    jsvar.v1++;
                }
                break;
            case 'dim1':
                if(jsvar.v1 <= 0){
                    jsvar.v1 = 9;
                }else{
                    jsvar.v1--;
                }
                break;
            case 'aum2':
                if(jsvar.v2 >= 9){
                    jsvar.v2 = 0;
                }else{
                    jsvar.v2++;
                }
                break;
            case 'dim2':
                if(jsvar.v2 <= 0){
                    jsvar.v2 = 9;
                }else{
                    jsvar.v2--;
                }
                break;
            case 'aum3':
                if(jsvar.v3 >= 9){
                    jsvar.v3 = 0;
                }else{
                    jsvar.v3++;
                }
                break;
            case 'dim3':
                if(jsvar.v3 <= 0){
                    jsvar.v3 = 9;
                }else{
                    jsvar.v3--;
                }
                break;
            case 'aum4':
                if(jsvar.v4 >= 9){
                    jsvar.v4 = 0;
                }else{
                    jsvar.v4++;
                }
                break;
            case 'dim4':
                if(jsvar.v4 <= 0){
                    jsvar.v4 = 9;
                }else{
                    jsvar.v4--;
                }
                break;
        }

    atualizarValoresJumpscare();

}

//atualiza o valor exibido 
function atualizarValoresJumpscare(e){
    let t1 = document.getElementById('jumpscareText1');
    let t2 = document.getElementById('jumpscareText2');
    let t3 = document.getElementById('jumpscareText3');
    let t4 = document.getElementById('jumpscareText4');

    t1.textContent = jsvar.v1;
    t2.textContent = jsvar.v2;
    t3.textContent = jsvar.v3;
    t4.textContent = jsvar.v4;

    if(e === 'confirm'){
        t1 = String(document.getElementById('jumpscareText1').textContent);
        t2 = String(document.getElementById('jumpscareText2').textContent);
        t3 = String(document.getElementById('jumpscareText3').textContent);
        t4 = String(document.getElementById('jumpscareText4').textContent);

        easterEggs.respGoldenFreddy = t1 + t2 + t3 + t4;

        alternativa();
    }
}

//exibe a carinha que representa a pontuacao
let textPonto = document.getElementById('ponto');
textPonto.textContent = ':)';

let pontoEtec = 'B';//pontuacao final do usuario

//baixa os audios da tela azul
const audioTelaAzulRick = new Audio('arquivos/audio-rick.mp3');
const audioTelaAzulGoldenFreddy = new Audio('arquivos/audio-tela-azul.mp3');

//vê se a alternativa está correta
function alternativa(alt){

    //verifica se easter egg do rick roll foi sorteado
    if(easterEggs.bug === true){
        document.body.innerHTML = `
        <video class="video" id="v1" autoplay muted>
            <source src="arquivos/rickroll.mp4" type="video/mp4">
        </video>`;
        const v1 = document.getElementById('v1');
        v1.muted = false;
        v1.play();

        setTimeout(() => {
            document.body.innerHTML = '<img src="arquivos/tela-azul-rick.jpeg" class="tela-azul">';            
            audioTelaAzulRick.currentTime = 0;
            audioTelaAzulRick.play();
        }, 6500);
        return;
    }

    //verifica se easter egg do golden freddy foi sorteado
    if(easterEggs.goldenFreddy === true){
        document.body.innerHTML = `
        <video class="video" id="v1" autoplay muted>
            <source src="arquivos/goldenfreddy.mp4" type="video/mp4">
        </video>
        `;
        const v1 = document.getElementById('v1');
        v1.muted = false;
        v1.play();

        setTimeout(() => {
            document.body.innerHTML = '<img src="arquivos/tela-azul-golden-freddy.jpeg" class="tela-azul">';
            audioTelaAzulGoldenFreddy.currentTime = 0.2;
            audioTelaAzulGoldenFreddy.play();
        }, 2500);
        
        return;

    }

    //impede varios cliques nas respostas
    if(cliqueUsuario === true){    
        return;//sai da funcao caso ja tenha clicado
    }    

    cliqueUsuario = true;//marca que o usuario clicou

    let certo = valQuiz.altCorreta;//atalho para o objeto

    //adiciona pontuacao e tempo bonus para acertos
    if(certo === alt){
        pontuacao++;
        tempoLimite += 2;
    }else{
        pontuacao--;
    }
        
    //exibe a cor azul para a alternativa correta e vermelha para a incorreta
    if(certo === 'a'){
        textos.altA.classList.add('certo');
        textos.altB.classList.add('errado');
        textos.altC.classList.add('errado');
        textos.altD.classList.add('errado');

        setTimeout(() => {//faz com que a cor suma em 1 segundo, atualize a pergunta e atualiza o estado do clique para falso
            textos.altA.classList.remove('certo');
            textos.altB.classList.remove('errado');
            textos.altC.classList.remove('errado');
            textos.altD.classList.remove('errado');
            
            pergunta();
            cliqueUsuario = false;
        }, 1000);
        
    }else if(certo === 'b'){
        textos.altB.classList.add('certo');
        textos.altA.classList.add('errado');
        textos.altC.classList.add('errado');
        textos.altD.classList.add('errado');  

        setTimeout(() => {
            textos.altB.classList.remove('certo');
            textos.altA.classList.remove('errado');
            textos.altC.classList.remove('errado');
            textos.altD.classList.remove('errado');
            pergunta();
            cliqueUsuario = false;
        }, 1000);
        
    }else if(certo === 'c'){
        textos.altC.classList.add('certo');
        textos.altB.classList.add('errado');
        textos.altA.classList.add('errado');
        textos.altD.classList.add('errado');

        setTimeout(() => {
            textos.altC.classList.remove('certo');
            textos.altB.classList.remove('errado');
            textos.altA.classList.remove('errado');
            textos.altD.classList.remove('errado');
            pergunta();
            cliqueUsuario = false;
        }, 1000);
        
    }else if(certo === 'd'){
        textos.altD.classList.add('certo');
        textos.altB.classList.add('errado');
        textos.altC.classList.add('errado');
        textos.altA.classList.add('errado'); 

        setTimeout(() => {
            textos.altD.classList.remove('certo');
            textos.altB.classList.remove('errado');
            textos.altA.classList.remove('errado');
            textos.altC.classList.remove('errado');
            pergunta();
            cliqueUsuario = false;
        }, 1000);
            

    }

    //exibe a pontuacao (carinha) do usuario durante o quiz
    if(pontuacao > 3){
        textPonto.textContent = ':D';
        pontoEtec = 'MB';
    }else if([1,2,3].includes(pontuacao)){
        textPonto.textContent = ':)';
        pontoEtec = 'B';
    }else if([0, -1].includes(pontuacao)){
        textPonto.textContent = ':I';
        pontoEtec = 'R';
    }else if([-2,-3].includes(pontuacao)){
        textPonto.textContent = ':c';
        pontoEtec = 'I';
    }else if(pontuacao <= -4){
        textPonto.textContent = '>:c';
        pontoEtec = 'I';
    }
    


}

//verifica se o usuario passou ou nao no quiz no momento que o tempo zera
function tempoZerado(){
    //quando passa, exibe que o usuario passou no quiz, espera 4 segundos e manda para a calculadora
    if(pontuacao > -1){
        document.getElementById('popUp').classList.remove('ativo');
        document.getElementById('popUpPassou').classList.add('ativo');
        document.getElementById('pontuacaoPass').textContent += pontuacao;
        document.getElementById('pontuacaoPEtec').textContent += pontoEtec;

        setTimeout(() => {
            document.getElementById('popUpPassou').classList.remove('ativo');
            document.getElementById('janela').classList.add('aberto');
        }, 4000);
    }else{//quando reprova, exibe que o usuario reprovou, espera 4 segundos e fecha o pop up
        document.getElementById('popUp').classList.remove('ativo');
        document.getElementById('popUpReprovou').classList.add('ativo');
        document.getElementById('pontuacaoRepr').textContent += pontuacao;
        document.getElementById('pontuacaoREtec').textContent += pontoEtec;

        setTimeout(() => {
            document.getElementById('popUpReprovou').classList.remove('ativo');
        }, 4000);
    }
}
