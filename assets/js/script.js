function selecionaCarrinho(){
    if (!document.querySelector('.card.selected')) {
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
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('nextButton').disabled = false;
    });
});

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

function submitForm() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value;
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

    if (isValid) nextScreen('successScreen');
}

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
