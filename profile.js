const bloodTypeDetails = {
    "A+": {
        donors: ["A+", "AB+"],
        receivers: ["A+", "A-", "O+", "O-"],
        panels: {
            panel1: "Pessoas com sangue tipo A+ têm anticorpos contra o sangue tipo B, o que significa que não são compatíveis. ",
            panel2: "No Brasil, o sangue tipo A+ é um dos mais comuns, representando cerca de 42% da população.",
            panel3: "Evite situações de estresse elevado.",
            panel4: "Participar de campanhas de doação é importante."
        }
    },
    "A-": {
        donors: ["A+", "A-", "AB+", "AB-"],
        receivers: ["A-", "O-"],
        panels: {
            panel1: "No Brasil, o sangue tipo A é um dos mais comuns, representando cerca de 42% da população.",
            panel2: "Pode ser uma preocupação em gestações quando a mãe tem Rh negativo e o feto tem Rh positivo, pois pode haver risco de incompatibilidade Rh.",
            panel3: "Considere uma dieta rica em ferro.",
            panel4: "Incentive outras pessoas a doarem sangue."
        }
    },
    "B+": {
        donors: ["B+", "AB+"],
        receivers: ["B+", "B-", "O+", "O-"],
        panels: {
            panel1: "Pode doar para B+ e AB+.",
            panel2: "Receba sangue de B+, B-, O+, O-.",
            panel3: "Mantenha-se ativo fisicamente.",
            panel4: "Participe de maratonas de doação de sangue."
        }
    },
    // Adicione os demais tipos sanguíneos da mesma forma
    "O+": {
        donors: ["O+", "A+", "B+", "AB+"],
        receivers: ["O+", "O-"],
        panels: {
            panel1: "Você pode doar para todos os tipos positivos.",
            panel2: "Pode receber de O+ e O-.",
            panel3: "Hidratação é chave para sua saúde.",
            panel4: "Lembre-se de doar sangue regularmente."
        }
    },
    "O-": {
        donors: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
        receivers: ["O-"],
        panels: {
            panel1: "Seu sangue é universal, pode doar para todos.",
            panel2: "Receba apenas de O-.",
            panel3: "Manter uma dieta balanceada é essencial.",
            panel4: "Sua doação é extremamente valiosa."
        }
    },
    // Adicione os outros tipos sanguíneos como necessário
};

window.onload = function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username-info').innerText = `Usuário: ${user.username}`;
    document.getElementById('blood-type-info').innerText = `Tipo Sanguíneo: ${user.bloodType}`;

    const bloodType = user.bloodType;
    const details = bloodTypeDetails[bloodType];

    if (details) {
        document.getElementById('donors-info').innerText = `Pode doar para: ${details.donors.join(', ')}`;
        document.getElementById('receivers-info').innerText = `Pode receber de: ${details.receivers.join(', ')}`;

        // Exibir conteúdo nos painéis de acordo com o tipo sanguíneo
        document.getElementById('panel-1').innerText = details.panels.panel1;
        document.getElementById('panel-2').innerText = details.panels.panel2;
        document.getElementById('panel-3').innerText = details.panels.panel3;
        document.getElementById('panel-4').innerText = details.panels.panel4;
    } else {
        document.getElementById('donors-info').innerText = 'Informações não disponíveis.';
        document.getElementById('receivers-info').innerText = 'Informações não disponíveis.';

        // Caso não haja detalhes específicos para o tipo sanguíneo, os painéis ficam vazios
        document.getElementById('panel-1').innerText = '';
        document.getElementById('panel-2').innerText = '';
        document.getElementById('panel-3').innerText = '';
        document.getElementById('panel-4').innerText = '';
    }
};

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

function calcularProximasDoacoes() {
            const gender = document.getElementById('gender').value;
            const lastDonation = new Date(document.getElementById('lastDonation').value);
            const resultado = document.getElementById('resultado');

            if (isNaN(lastDonation.getTime())) {
                resultado.innerHTML = "Por favor, insira uma data válida.";
                return;
            }

            resultado.innerHTML = "<h3>Próximas datas de doação:</h3>";
            const dates = [];
            let interval, maxDoacoes;

            if (gender === "homem") {
                interval = 60; // 2 meses em dias
                maxDoacoes = 4;
            } else {
                interval = 90; // 3 meses em dias
                maxDoacoes = 3;
            }

            for (let i = 1; i <= maxDoacoes; i++) {
                const nextDate = new Date(lastDonation);
                nextDate.setDate(lastDonation.getDate() + interval * i);
                dates.push(nextDate.toLocaleDateString('pt-BR'));
            }

            resultado.innerHTML += dates.join('<br>');
        }
