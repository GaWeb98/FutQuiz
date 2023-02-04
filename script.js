document.querySelector('.apresentacao button').addEventListener('click', () => {
    document.querySelector('.apresentacao').style.display = 'none';
    mostrarQuestoes();
});
let questaoAtual = 0;
let questaoCorreta = 0;

function mostrarQuestoes() {
    if(Questoes[questaoAtual]) {

    let pct = Math.floor((questaoAtual / Questoes.length) * 100);

    document.querySelector('.QuestoesArea').style.display = 'flex';
    document.querySelector('.Progresso').style.display = 'flex';
    document.querySelector('.QuantidadeQuestoes').style.display = 'flex';
    document.querySelector('.QuantidadeQuestoes').innerHTML = `Questão ${parseInt(questaoAtual)+1} de ${Questoes.length}`;

    document.querySelector('.Questao span').innerHTML = Questoes[questaoAtual].Questao;
    document.querySelector('.Progresso').style.width = `${pct}%`;


    let opcoesHTML = '';
    for(let i in Questoes[questaoAtual].Opcoes) {
        opcoesHTML += `<div class="Opcao"  data-op="${i}"><span>${parseInt(i)+1}</span>${Questoes[questaoAtual].Opcoes[i]}</div>`;
    }
    document.querySelector('.Opcoes').innerHTML = opcoesHTML;
    document.querySelector('.Opcoes').addEventListener('click', OpcaoSelected);
    } else {
    fim();
    };
};
//mecânica de selecionar e desselecionar elementos
function OpcaoSelected(e) {
    if(e.target.dataset.selected) {
        e.target.removeAttribute('data-selected', 'selected');
        
    } else {
        limpaSelected();
        e.target.setAttribute('data-selected', 'selected');
    }

};
function limpaSelected () {
   let opcoes = document.querySelectorAll('.Opcao');
   let opcoesArray = Array.from(opcoes);

   opcoesArray.map(el => {
    el.removeAttribute('data-selected', 'selected');
   });
};

//evento de click para a próxima questão
document.querySelector('.proximo').addEventListener('click', proximo);
function proximo() {
    let opcoes = document.querySelectorAll('.Opcao');
    let opcoesArray = Array.from(opcoes);

    let opcoesArrayIndex = opcoesArray.findIndex(el => {
        return (el.dataset.selected) ? true : false
    });

    let opcoesArrayRes = opcoesArrayIndex;

    if(opcoesArrayRes > -1) {
        try {
            opcoesArray.map(el => {
                let SelectedOp = parseInt(el.getAttribute('data-op'));
                if(el.dataset.selected && Questoes[questaoAtual].Correta === SelectedOp) {
                    questaoCorreta++;
                };
            });
            //adiciona uma cor verde na alternativa correta e vermelho nas demais
            opcoesArray.map(el => {
                let crt = Questoes[questaoAtual].Correta;
                let SelectedOp = parseInt(el.getAttribute('data-op'));
                if(SelectedOp === crt) {
                    el.classList.add('QuestaoCorreta');
                    el.classList.add('Correta');
                } else {
                    el.classList.add('QuestaoErrada');
                }
            });

            questaoAtual++;
            let Timer = setInterval(function() {
                mostrarQuestoes();
                clearInterval(Timer);
            }, 1000);
        }
        catch (error) {
            console.log(error);
        };
    };
};

function fim() {
    let pontos = Math.floor((questaoCorreta / Questoes.length) * 100);

    document.querySelector('.QuestoesArea').style.display = 'none';
    document.querySelector('.PlacarPontos').style.display = 'flex';
    document.querySelector('.Progresso').style.width = '100%';

    document.querySelector('.PlacarPontos h2').innerHTML = `Você acertou ${pontos}%`;
    document.querySelector('.PlacarPontos span').innerHTML = `Você respondeu ${questaoAtual} questões e acertou ${questaoCorreta}`;
}

document.querySelector('.PlacarPontos button').addEventListener('click', () => {
    questaoAtual = 0;
    questaoCorreta = 0;
    mostrarQuestoes();
    document.querySelector('.PlacarPontos').style.display = 'none'
});