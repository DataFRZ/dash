const encodedData = {
    passwords: {
        comercial: btoa('Com@#2025'),
        pedagogico: btoa('Ped##2025'),
        financeiro: btoa('Fin$#2025'),
        treinador : btoa('Tre!#2025'),
        marketing: btoa('Mar%#2025'),
        administrativo: btoa('Adm&#2025')
    },
    dashboardLinks: {
        comercial: btoa('https://app.powerbi.com/view?r=eyJrIjoiNmEyZjEyYzgtMmQ2OC00MDdlLWE1NWItMzhjZTkxOGUwOTY1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        pedagogico: btoa('https://app.powerbi.com/view?r=eyJrIjoiODdlMWJkNDQtZGQ0Yy00OGZiLWIxZGUtY2E1YmI4NmRiMTg1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        financeiro: btoa('https://app.powerbi.com/view?r=eyJrIjoiYTI0MjdkMDctNTc2MC00OTM1LWI0NDItNTM0N2NhZmE5YmZkIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        marketing: btoa('https://app.powerbi.com/view?r=eyJrIjoiZDk2YTkxZDAtY2NmNy00YmU5LWFkYzAtZDNiOGFmZDE4N2U2IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        treinador: btoa('https://app.powerbi.com/view?r=eyJrIjoiZDAyZGI0NTItZTUyMi00MzA4LTlkZDAtNzk3NzU2M2NhNjViIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        administrativo: btoa('https://app.powerbi.com/view?r=eyJrIjoiMTNjNWFlODktYWY0ZC00MmJlLThkZTItMDIyMWFjYWMxZjc3IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'), // 👈 NOVO
        ranking: btoa('https://app.powerbi.com/view?r=eyJrIjoiZWE3MTE4ZmItMDI1ZS00MjVlLWFkZTQtZjM5OWJkYjM1NjcxIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9')
    }
};

// 🔐 Alterna a exibição do campo de senha
function togglePassword(section) {
    document.querySelectorAll('.password-container').forEach(container => {
        container.style.display = 'none';
    });

    const passwordContainer = document.getElementById(`${section}PasswordContainer`);
    if (passwordContainer) {
        passwordContainer.style.display = 'flex';
    }
}

// 🚪 Abre dashboards que exigem senha
function openDashboard(section) {
    // Esconde todos os campos de senha antes de abrir o dashboard
    document.querySelectorAll('.password-container').forEach(container => {
        container.style.display = 'none';
    });

    // Validação de senha (exceto para metodocis245)
    if (section !== 'metodocis245') {
        const passwordInput = document.getElementById(`${section}Password`);
        if (!passwordInput) return; // Evita erro caso o campo não exista

        const userPassword = passwordInput.value;
        if (userPassword !== atob(encodedData.passwords[section])) {
            alert('Senha incorreta!');
            return;
        }
    }

    abrirDashboard(section);
}

function showSidebar() {
    document.querySelector('.sidebar-vazia').style.display = 'block';
  }
  
  function hideSidebar() {
    document.querySelector('.sidebar-vazia').style.display = 'none';
  }
  

// 🏆 Abre o dashboard de Ranking (sem senha)
function openRanking() {
    abrirDashboard('ranking');
}

// 🔄 Função centralizada para abrir qualquer dashboard
function abrirDashboard(section) {
    document.querySelector('.menu').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
    document.getElementById('refreshButton').style.display = 'block';

    showSidebar();  // <-- mostra a sidebar aqui

    const decodedLink = atob(encodedData.dashboardLinks[section]);
    document.getElementById('dashboard').src = decodedLink;
}


// ⌨️ Permite abrir o dashboard pressionando "Enter"
function handleEnter(event, section) {
    if (event.key === 'Enter') {
        openDashboard(section);
    }
}

// 🔙 Voltar para o menu inicial
function goBack() {
    document.querySelector('.menu').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    document.getElementById('refreshButton').style.display = 'none';
    document.getElementById('dashboard').src = '';

    hideSidebar(); // <-- esconde a sidebar aqui
}


// 🔄 Recarregar o dashboard
function reloadDashboard() {
    const iframe = document.getElementById('dashboard');
    iframe.src = iframe.src;
}
