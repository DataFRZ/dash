const encodedData = {
    passwords: {
        comercial: btoa('Com@#2025'),
        pedagogico: btoa('Ped##2025'),
        financeiro: btoa('Fin$#2025'),
        marketing: btoa('Mar%#2025')
    },
    dashboardLinks: {
        comercial: btoa('https://app.powerbi.com/view?r=eyJrIjoiNmEyZjEyYzgtMmQ2OC00MDdlLWE1NWItMzhjZTkxOGUwOTY1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        pedagogico: btoa('https://app.powerbi.com/view?r=eyJrIjoiODdlMWJkNDQtZGQ0Yy00OGZiLWIxZGUtY2E1YmI4NmRiMTg1IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        financeiro: btoa('https://app.powerbi.com/view?r=eyJrIjoiYTI0MjdkMDctNTc2MC00OTM1LWI0NDItNTM0N2NhZmE5YmZkIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
        marketing: btoa('https://app.powerbi.com/view?r=eyJrIjoiZDk2YTkxZDAtY2NmNy00YmU5LWFkYzAtZDNiOGFmZDE4N2U2IiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9'),
		metodocis245: btoa('https://app.powerbi.com/view?r=eyJrIjoiOTQ2OGVlY2QtMDc2MC00YzIzLThhYWUtY2Q2ZGU5ZjQwZjIxIiwidCI6IjQwODYyZjk0LWRjZWYtNDI1Mi05ODJiLTU4MGEzZTZiYjVmYiJ9')
    }
};

function togglePassword(section) {
    document.querySelectorAll('.password-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(`${section}PasswordContainer`).style.display = 'flex';
}

function openDashboard(section) {
    // Verifica se a área não é a MCIS 245 (onde não há senha)
    if (section !== 'metodocis245') {
        const passwordInput = document.getElementById(`${section}Password`);
        const userPassword = passwordInput.value;

        // Verifica se a senha está correta
        if (userPassword === atob(encodedData.passwords[section])) {
            const decodedLink = atob(encodedData.dashboardLinks[section]);
            document.querySelector('.menu').style.display = 'none';
            document.querySelector('#dashboard').style.display = 'block';
            document.querySelector('#backButton').style.display = 'block'; // Mostrar o botão Voltar
            document.querySelector('#refreshButton').style.display = 'block';
            document.querySelector('#dashboard').src = decodedLink;
        } else {
            alert('Senha incorreta!');
        }
    } else {
        // Para o MCIS 245, não há senha, então abre o painel diretamente
        const decodedLink = atob(encodedData.dashboardLinks[section]);
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('#dashboard').style.display = 'block';
        document.querySelector('#backButton').style.display = 'block'; // Mostrar o botão Voltar
        document.querySelector('#refreshButton').style.display = 'block';
        document.querySelector('#dashboard').src = decodedLink;
    }
}



function handleEnter(event, section) {
    if (event.key === 'Enter') {
        openDashboard(section);
    }
}

function goBack() {
    document.querySelector('.menu').style.display = 'block';
    document.querySelector('#dashboard').style.display = 'none';
    document.querySelector('#backButton').style.display = 'none'; // Esconder o botão Voltar
    document.querySelector('#refreshButton').style.display = 'none';
    document.querySelector('#dashboard').src = '';
}

function reloadDashboard() {
    document.querySelector('#dashboard').src = document.querySelector('#dashboard').src;
}
