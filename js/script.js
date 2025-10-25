const appContent = document.getElementById('app-content');
const templates = {
    home: document.getElementById('home-template'),
    cadastro: document.getElementById('cadastro-template'),
    dados: document.getElementById('dados-template')
};
const defaultPage = 'home';
const storageKey = 'web_app_data';

//Renderiza o conteúdo da página, clonando o template e injetando na main.

function renderPage(pageId, callback) {
    // 1. Limpa o conteúdo atual
    appContent.innerHTML = '';

    // 2. Obtém o template
    const template = templates[pageId];
    if (!template) {
        appContent.innerHTML = '<h1>404 - Página não encontrada</h1>';
        return;
    }

    // 3. Clona o conteúdo do template
    const content = template.content.cloneNode(true);

    // 4. Injeta o novo conteúdo
    appContent.appendChild(content);

    // 5. Executa o callback específico da página 
    if (callback) {
        callback();
    }
}

//Gerencia a navegação SPA baseada no hash da URL.

function navigate(hash) {
    const pageId = hash ? hash.substring(1) : defaultPage;
    
    switch (pageId) {
        case 'home':
            renderPage('home');
            break;
        case 'cadastro':
            renderPage('cadastro', setupFormListeners); // Chama a função de setup do formulário
            break;
        case 'dados':
            renderPage('dados', setupDataPage); // Chama a função de carregamento de dados
            break;
        default:
            renderPage(defaultPage);
    }
}

// Evento que escuta a mudança no hash
window.addEventListener('hashchange', () => navigate(window.location.hash));

// Evento que carrega a página correta ao carregar o site
window.addEventListener('DOMContentLoaded', () => {
    // Adiciona o listener de cliques nos links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Muda o hash, o que dispara o evento 'hashchange' e a função navigate()
            window.location.hash = link.getAttribute('data-page');
        });
    });

    // Navega para a página inicial baseada no hash ou default
    navigate(window.location.hash);
});

//Realiza a validação do formulário.

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        const errorElement = document.getElementById(`error-${input.name}`);
        const value = input.value.trim();
        let errorMessage = '';

        // 1. Validação de Campo Vazio
        if (value === '') {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        } 
        
        else if (input.hasAttribute('minlength') && value.length < parseInt(input.getAttribute('minlength'))) {
             errorMessage = `Mínimo de ${input.getAttribute('minlength')} caracteres.`;
             isValid = false;
        }

        // 3. Validação de Email 
        else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            errorMessage = 'Formato de e-mail inválido.';
            isValid = false;
        }

        // Atualiza a interface (aviso ao usuário)
        if (errorMessage) {
            errorElement.textContent = errorMessage;
            input.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            input.classList.remove('invalid');
        }
    });

    return isValid;
}


//Configura os ouvintes de eventos do formulário na página de Cadastro.

function setupFormListeners() {
    const form = document.getElementById('user-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.querySelectorAll('input[required]').forEach(input => {
            input.addEventListener('blur', () => {
                // Valida apenas o campo que perdeu o foco para dar feedback imediato
                validateInput(input);
            });
        });

        // Evento de submissão do formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm(form)) {
                // Se válido, processa o cadastro
                const formData = {
                    nome: form.nome.value.trim(),
                    email: form.email.value.trim(),
                    dataCadastro: new Date().toLocaleDateString('pt-BR')
                };
                
                saveDataToStorage(formData);
                form.reset();
                formStatus.textContent = 'Cadastro realizado com sucesso!';
                formStatus.className = 'status-message status-success';
                
            } else {
                formStatus.textContent = 'Por favor, corrija os erros no formulário.';
                formStatus.className = 'status-message'; 
            }
        });
    }
}

//Valida um campo individualmente.

function validateInput(input) {
    const errorElement = document.getElementById(`error-${input.name}`);
    const value = input.value.trim();
    let errorMessage = '';

    // Lógica de validação similar à função principal, mas para um único campo
    if (value === '') {
        errorMessage = 'Este campo é obrigatório.';
    } else if (input.hasAttribute('minlength') && value.length < parseInt(input.getAttribute('minlength'))) {
         errorMessage = `Mínimo de ${input.getAttribute('minlength')} caracteres.`;
    } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Formato de e-mail inválido.';
    }

    if (errorMessage) {
        errorElement.textContent = errorMessage;
        input.classList.add('invalid');
        return false;
    } else {
        errorElement.textContent = '';
        input.classList.remove('invalid');
        return true;
    }
}

//Obtém os dados do localStorage.
function getStoredData() {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
}


//Salva um novo registro no localStorage.
function saveDataToStorage(newData) {
    const dataList = getStoredData();
    dataList.push(newData);
    localStorage.setItem(storageKey, JSON.stringify(dataList));
}


// Carrega e exibe os dados salvos na página de Dados.
function setupDataPage() {
    const dataListContainer = document.getElementById('stored-data-list');
    const clearButton = document.getElementById('clear-data');
    const storedData = getStoredData();

    if (dataListContainer) {
        // Limpa o conteúdo
        dataListContainer.innerHTML = ''; 

        if (storedData.length === 0) {
            dataListContainer.innerHTML = '<p>Nenhum dado cadastrado.</p>';
        } else {
            // Cria e insere elementos para cada dado (Manipulação de DOM)
            storedData.forEach((data, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p><strong>ID:</strong> ${index + 1}</p>
                    <p><strong>Nome:</strong> ${data.nome}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Data de Cadastro:</strong> ${data.dataCadastro}</p>
                `;
                dataListContainer.appendChild(div);
            });
        }
    }

    // Listener para o botão de limpar dados
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todos os dados?')) {
                localStorage.removeItem(storageKey);
                // Recarrega a página de dados para atualizar a visualização
                navigate('#dados'); 
            }
        });
    }
}