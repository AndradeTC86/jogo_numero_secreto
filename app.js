let listaNumeroSorteado = []
let limiteTentativas = 100
mensagemInicial()
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.2})
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto')
    let descricao = `Selecione um número entre 1 e ${limiteTentativas}`
    exibirTextoNaTela('p', descricao)
}

function verificarChute(){
    let chute = document.querySelector('input').value    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acerto')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa' 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')
    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor que o chute!')
        }
        else{
            exibirTextoNaTela('p','O número secreto é maior que o chute!')
        }
        tentativas++
        limparCampo()
    }       
}

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = ' '
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    mensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limiteTentativas + 1)
    let tamanhoMaximoLista = listaNumeroSorteado.length

    if(tamanhoMaximoLista === limiteTentativas){
        listaNumeroSorteado = []
    }

    if (listaNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    } else {
        listaNumeroSorteado.push(numeroEscolhido)
        return numeroEscolhido
    }
}