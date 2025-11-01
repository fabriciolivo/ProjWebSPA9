# Single Page Application (SPA) com JavaScript Puro

Este projeto é uma implementação de uma **Single Page Application (SPA)** básica, desenvolvida utilizando apenas **JavaScript, HTML e CSS (Web Components)**. O objetivo principal foi demonstrar domínio em manipulação do DOM, gestão de eventos, uso de templates, validação de formulários e armazenamento local, seguindo as diretrizes de uma disciplina de Desenvolvimento WEB.

## ✨ Funcionalidades Implementadas

O projeto atende a todas as especificações técnicas obrigatórias, transformando uma interface estática em uma aplicação dinâmica e interativa:

| Categoria | Funcionalidade | Descrição |
| :--- | :--- | :--- |
| **Navegação** | **Single Page Application (SPA)** | A navegação entre as seções é feita sem recarregar a página, controlada pelo Hash da URL (`#home`, `#cadastro`), otimizando a experiência do usuário. |
| **Templates** | **Sistema de Templates JavaScript** | Utiliza o elemento nativo `<template>` do HTML e manipulação do DOM em JavaScript para renderizar dinamicamente o conteúdo das "páginas". |
| **Formulários** | **Validação de Consistência de Dados** | Implementação de validação de campo obrigatório, tamanho mínimo e formato de e-mail (regex) antes do envio. |
| **Feedback** | **Aviso de Preenchimento Incorreto** | Feedback visual imediato (cores e mensagens de erro) para campos preenchidos incorretamente, melhorando a usabilidade. |
| **Persistência** | **Armazenamento Local (localStorage)** | Os dados do formulário de cadastro são armazenados e consultados utilizando a API `localStorage`. |
| **Estrutura** | **Separação de Código** | Todo o código está estritamente separado em arquivos `HTML`, `CSS` e `JS`, garantindo a modularidade do projeto. |

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura base da aplicação e definição dos templates.
* **CSS3:** Estilização e feedback visual.
* **JavaScript (ES6+):** Toda a lógica de manipulação do DOM, roteamento SPA, validação e persistência de dados.

## 📂 Estrutura do Projeto

O código está organizado de forma clara e modular:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/fabriciolivo/ProjWebSPA9.git
    ```
2.  **Abra o Arquivo:**
    * Localize o arquivo `index.html` na pasta.
    * Abra-o com qualquer navegador moderno (Chrome, Firefox, Edge, etc.).

## 📝 Desafios e Próximos Passos (Opcional)

* [ ] Implementar um sistema de rotas mais avançado com o History API (em vez de apenas Hash).
* [ ] Refatorar a renderização dos dados salvos para um componente reutilizável.
* [ ] Adicionar testes unitários para a função de validação de formulário.

---

**Desenvolvido por:** Fabricio Gbariel OLivo

**Disciplina:** Desenvolvimento WEB - Universidade Positivo