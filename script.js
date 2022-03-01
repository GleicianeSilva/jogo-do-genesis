let order = Array();
let clickedOrder = Array();
let score = 0;
let difficulty = 150;
let colorsLeft = score;
let howManyColorsLeft = document.getElementById("quantasCoresRestam");
let elementGenius = document.querySelector(".genius");
let count = 1;


//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue'); //azul
const red = document.querySelector('.red'); //vermelho
const green = document.querySelector('.green'); //verde
const yellow = document.querySelector('.yellow'); //amarelo

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); //cor aleatória
    order[order.length] = colorOrder; //adiciona no array order

    for(let i in order) {     //loop para acender as cores no array order
        let elementColor = createColorElement(order[i]);
        setTimeout(() => {
        lightColor(elementColor, Number(i) + 1);
        }, 600);
    }

    setTimeout(() => {
        elementGenius.classList.toggle('disabled')
        count++;
    }, count * 1200);
    elementGenius.classList.toggle('disabled');
    howManyColorsLeft.innerHTML = score;
    colorsLeft = score;
    setColorNumber();

}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * difficulty;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 100);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 150);
    difficulty = difficulty - 2;
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {

            lose();
            break;
        }
    }
    if(clickedOrder.length == order.length) {

        // Som para GAME OVER
        somVitoria.play();
    
        alert(`Pontuação: ${score}\nParabéns, você ✔! Será iniciado o próximo nível!`);
        nextLevel();
    }
}

// função para aplicar cores nos números do visor
let setColorNumber = () => {
    switch (howManyColorsLeft.innerHTML) {
        case "0":
            howManyColorsLeft.style.color = "rgb(0 0 0)";
            howManyColorsLeft.style.fontSize = "20px";
            howManyColorsLeft.style.fontFamily = "Comic Sans MS";
            break;
        case "1":
            howManyColorsLeft.style.color = "rgb(239 68 68)";
            howManyColorsLeft.style.fontSize = "20px";
            howManyColorsLeft.style.fontFamily = "Comic Sans MS";
            break;
        case "2":
            howManyColorsLeft.style.color = "rgb(231, 199, 35)";
            howManyColorsLeft.style.fontSize = "20px";
            howManyColorsLeft.style.fontFamily = "Comic Sans MS";
            break;
        case "3":
            howManyColorsLeft.style.color = "rgb(34 197 94)";
            howManyColorsLeft.style.fontSize = "20px";
            howManyColorsLeft.style.fontFamily = "Comic Sans MS";

            break;
        case "4":
            howManyColorsLeft.style.color = "rgb(59 130 246)";
            howManyColorsLeft.style.fontSize = "20px";
            howManyColorsLeft.style.fontFamily = "Comic Sans MS";
            break;
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },150);
    
    colorsLeft--; // diminui as cores restantes
    howManyColorsLeft.innerHTML = colorsLeft;
    setColorNumber();
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++; //aumenta o score
    clickedOrder = Array(); // zera o array ao clicar
    shuffleOrder(); //embaralhar as cores
}

//funcao para game over
let lose = () => {

    // Som para GAME OVER
    somDerrota.play();

    // Mensagem para GAME OVER
    alert(`Pontuação: ${score}!\nQue pena, você perdeu o jogo!\nNão desânime, clique em OK para iniciar um novo jogo`);
    howManyColorsLeft.innerText = colorsLeft;

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Jogo do Gênesis! Iniciando novo 🎮!');
    score = 0; // zera o score
    order = Array(); // zera o array da ordem
    clickedOrder = Array(); // zera o array de clicados
    colorsLeft = 1; // default das cores restantes

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();