// Navegação entre seções
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.nav-item.active').classList.remove('active');
        item.classList.add('active');
        const target = item.getAttribute('href').substring(1);
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        if (target === 'abertura') window.location.reload(); // Reset abertura
    });
});

// Validação CPF real via API (Receita Federal)
async function validarCPF() {
    const cpf = document.getElementById('cpf-input').value;
    if (!cpf) return alert('Digite o CPF');
    try {
        const response = await fetch(`https://api.cpfcnpj.com/consultas?token=YOUR_TOKEN_HERE&cnpj=${cpf}`); // Substitua YOUR_TOKEN_HERE por token grátis de cpfcnpj.com.br (cadastre-se lá)
        const data = await response.json();
        const res = document.getElementById('resultado-cpf');
        if (data.status === 'OK') {
            res.innerHTML = `<p>CPF Válido: ${data.nome} | Situação: ${data.situacao_cadastral} | Inscrição: ${data.data_inscricao}</p>`;
            // Avança para próxima seção
            document.getElementById('abertura').classList.remove('active');
            document.getElementById('dados-pessoais').classList.add('active');
        } else {
            res.innerHTML = '<p>CPF Inválido ou Irregular</p>';
        }
    } catch (e) {
        alert('Erro na consulta. Use token real da API.');
    }
}

// Verificar idade
function verificarIdade() {
    const nascimento = new Date(document.getElementById('nascimento').value);
    const idade = new Date().getFullYear() - nascimento.getFullYear();
    const info = document.getElementById('idade-info');
    if (idade < 18) {
        info.innerHTML = '<p>Menor de idade: Cadastre responsável.</p><input type="text" placeholder="Nome do Responsável">';
    } else {
        info.innerHTML = '<p>Maior de idade: OK.</p>';
    }
}

// Próxima etapa
function proximaEtapa() {
    document.getElementById('dados-pessoais').classList.remove('active');
    document.getElementById('documento').classList.add('active');
}

// Câmera para selfie
let stream;
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
        stream = s;
        video.srcObject = stream;
    });
});
function tirarSelfie() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const img = canvas.toDataURL('image/png');
    document.getElementById('selfie-input').value = img; // Mock upload
    // Para detecção facial real: Integre AWS Rekognition
    // Exemplo: fetch('https://rekognition.us-east-1.amazonaws.com', { body: { Image: { Bytes: img } } }) // Requer AWS SDK e chave
}

// Verificar identidade (mock + API exemplo)
async function verificarIdentidade() {
    const res = document.getElementById('verificacao-result');
    res.innerHTML = '<p>Verificando...</p>';
    // Mock: Assume match
    setTimeout(() => {
        res.innerHTML = '<p>Identidade confirmada! Conta aberta.</p>';
        document.getElementById('documento').classList.remove('active');
        document.getElementById('inicio').classList.add('active');
    }, 2000);
    // Para real: Compare selfie com foto do doc via API facial
}

// Gerar QR Pix (demo)
function gerarPix() {
    const chave = document.getElementById('pix-chave').value;
    const qrcode = document.getElementById('qrcode');
    QRCode.toCanvas(qrcode, `pix:${chave}`, { width: 200 }, (err) => {
        if (err) console.error(err);
    });
}

// Mock saldo (localStorage)
if (!localStorage.getItem('saldo')) localStorage.setItem('saldo', '0.01');
document.querySelector('.saldo h2').innerHTML = `Saldo: R$ ${localStorage.getItem('saldo')}`;
