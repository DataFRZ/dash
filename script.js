const encodedData = {
    passwords: {
        comercial: btoa('Com@#2025'),
        pedagogico: btoa('Ped##2025'),
        financeiro: btoa('Fin$#2025'),
        treinador : btoa('Tre!#2025'),
        marketing: btoa('Mar%#2025')
    },
    dashboardLinks: {
        comercial: btoa('https://app.powerbi.com/view?r=eyJrIjoiNmEyZjEyYzgtMmQ2OC00MDdlLWE1NWItMzhjZTkxOGUwOTY1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        pedagogico: btoa('https://app.powerbi.com/view?r=eyJrIjoiODdlMWJkNDQtZGQ0Yy00OGZiLWIxZGUtY2E1YmI4NmRiMTg1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        financeiro: btoa('https://app.powerbi.com/view?r=eyJrIjoiYTI0MjdkMDctNTc2MC00OTM1LWI0NDItNTM0N2NhZmE5YmZkIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        marketing: btoa('https://app.powerbi.com/view?r=eyJrIjoiZDk2YTkxZDAtY2NmNy00YmU5LWFkYzAtZDNiOGFmZDE4N2U2IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        treinador: btoa('https://app.powerbi.com/view?r=eyJrIjoiZDAyZGI0NTItZTUyMi00MzA4LTlkZDAtNzk3NzU2M2NhNjViIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
    }
};

// Alterna a exibição do campo de senha
function togglePassword(section) {
    document.querySelectorAll('.password-container').forEach(container => {
        container.style.display = 'none';
    });

    const passwordContainer = document.getElementById(`${section}PasswordContainer`);
    if (passwordContainer) {
        passwordContainer.style.display = 'flex';
    }
}

function openDashboard(section) {
    // Esconde todos os campos de senha antes de abrir o dashboard
    document.querySelectorAll('.password-container').forEach(container => {
        container.style.display = 'none';
    });

    if (section !== 'metodocis245') {
        const passwordInput = document.getElementById(`${section}Password`);
        if (!passwordInput) return; // Evita erro caso o campo não exista
        
        const userPassword = passwordInput.value;
        if (userPassword !== atob(encodedData.passwords[section])) {
            alert('Senha incorreta!');
            return;
        }
    }

    // Esconder completamente a seção do menu
    document.querySelector('.menu').style.display = 'none';

    // Exibir o dashboard
    const decodedLink = atob(encodedData.dashboardLinks[section]);
    document.querySelector('#dashboard').style.display = 'block';
    document.querySelector('#backButton').style.display = 'block';
    document.querySelector('#refreshButton').style.display = 'block';
    document.querySelector('#dashboard').src = decodedLink;
}


// Permite abrir o dashboard ao pressionar "Enter"
function handleEnter(event, section) {
    if (event.key === 'Enter') {
        openDashboard(section);
    }
}

// Voltar para o menu inicial
function goBack() {
    document.querySelector('.menu').style.display = 'block';
    document.querySelector('#dashboard').style.display = 'none';
    document.querySelector('#backButton').style.display = 'none';
    document.querySelector('#refreshButton').style.display = 'none';
    document.querySelector('#dashboard').src = '';
}

// Recarrega o dashboard
function reloadDashboard() {
    const iframe = document.querySelector('#dashboard');
    iframe.src = iframe.src; // Atualiza sem recarregar toda a página
}
