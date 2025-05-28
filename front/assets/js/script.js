let carrinhoSelecionado = null;

let dadosReserva = {
    carrinho: null,
    pessoa: null
};

// Função que busca os carrinhos no backend
async function carregarCarrinhos() {
    try {
        const response = await fetch('http://127.0.0.1:8000/carrinhos');
        const carrinhos = await response.json();

        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';

        carrinhos.forEach(carrinho => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = `${carrinho.nome} / ${carrinho.setor}`;

            card.addEventListener('click', () => {
                document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                carrinhoSelecionado = carrinho;
                dadosReserva.carrinho = carrinho;
                document.getElementById('nextButton').disabled = false;
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar carrinhos:', error);
        alert('Erro ao carregar carrinhos. Tente novamente mais tarde.');
    }
}

window.addEventListener('load', carregarCarrinhos);

function selecionaCarrinho() {
    if (!carrinhoSelecionado) {
        alert('Selecione um carrinho antes de continuar!');
        return;
    }
    nextScreen('screen2');
}

function nextScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'successScreen') {
        enviarReserva();
    }
}

// =========================
// Validação de CPF
// =========================

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[10])) return false;

    return true;
}

// =========================
// Captura dos dados
// =========================

function submitForm() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    let isValid = true;

    if (nome === '') {
        document.getElementById('nome').classList.add('error');
        document.getElementById('nomeError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nome').classList.remove('error');
        document.getElementById('nomeError').style.display = 'none';
    }

    if (!validateCPF(cpf)) {
        document.getElementById('cpf').classList.add('error');
        document.getElementById('cpfError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('cpf').classList.remove('error');
        document.getElementById('cpfError').style.display = 'none';
    }

    if (!isValid) return;

    // Salvar dados da pessoa
    dadosReserva.pessoa = {
        nome: nome,
        cpf: cpf,
        telefone: telefone
    };

    nextScreen('successScreen');
}

// =========================
// Envio da reserva para backend
// =========================

async function enviarReserva() {
    try {
        const response = await fetch('http://127.0.0.1:8000/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosReserva)
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log('Reserva enviada com sucesso:', resultado);
        } else {
            console.error('Erro ao enviar reserva:', response.status);
            nextScreen('errorScreen');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        nextScreen('errorScreen');
    }
}

// =========================
// Máscara de CPF e Telefone
// =========================

document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d)/, '$1.$2')
                 .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                 .replace(/(-\d{2})\d+?$/, '$1');
    e.target.value = value;
});

document.getElementById('telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '($1) $2')
                 .replace(/(\d{5})(\d)/, '$1-$2')
                 .substring(0, 16);
    e.target.value = value;
});

// =========================
// Validação ao perder foco
// =========================

document.getElementById('cpf').addEventListener('blur', function () {
    if (!validateCPF(this.value)) {
        this.classList.add('error');
        document.getElementById('cpfError').style.display = 'block';
    }
});

document.getElementById('nome').addEventListener('input', function () {
    if (this.value.trim() === '') {
        this.classList.add('error');
        document.getElementById('nomeError').style.display = 'block';
    } else {
        this.classList.remove('error');
        document.getElementById('nomeError').style.display = 'none';
    }
});
