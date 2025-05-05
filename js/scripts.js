  // --- Validação do Formulário ---
  const formulario = document.querySelector('.formulario');
  const nomeInput = formulario.querySelector('input[type="text"]');
  const emailInput = formulario.querySelector('input[type="email"]');
  const mensagemInput = formulario.querySelector('textarea');
  
  const mostrarErro = (input, mensagem) => {
    let erro = input.parentElement.querySelector('.erro');
    if (!erro) {
      erro = document.createElement('span');
      erro.classList.add('erro');
      erro.style.color = 'red';
      erro.style.fontSize = '0.9em';
      input.parentElement.appendChild(erro);
    }
    erro.textContent = mensagem;
  };

  const limparErro = (input) => {
    const erro = input.parentElement.querySelector('.erro');
    if (erro) erro.remove();
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let valido = true;

    if (!nomeInput.value.trim()) {
      mostrarErro(nomeInput, 'Nome obrigatório');
      valido = false;
    } else {
      limparErro(nomeInput);
    }

    if (!emailInput.value.trim()) {
      mostrarErro(emailInput, 'Email obrigatório');
      valido = false;
    } else if (!validarEmail(emailInput.value.trim())) {
      mostrarErro(emailInput, 'Email inválido');
      valido = false;
    } else {
      limparErro(emailInput);
    }

    if (!mensagemInput.value.trim()) {
      mostrarErro(mensagemInput, 'Mensagem obrigatória');
      valido = false;
    } else {
      limparErro(mensagemInput);
    }

    if (valido) {
      alert('Formulário enviado com sucesso!');
      formulario.reset();
    }
  });

 // --- Integração com GitHub ---
const aside = document.createElement('aside');
aside.className = 'github-projetos';
aside.innerHTML = `
  <h2>Projetos de GitHub</h2>
  <div class="github-contenido"></div>
`;

fetch('https://api.github.com/users/marcanogc/repos')
  .then(response => response.json())
  .then(repos => {
    const lista = document.createElement('ul');
    lista.style.padding = '0';

    repos.forEach(repo => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${repo.name}</strong>
        <p>${repo.description || 'Sem descrição'}</p>
        <a href="${repo.html_url}" target="_blank">Exibir no GitHub</a>
      `;
      lista.appendChild(item);
    });

    aside.querySelector('.github-contenido').appendChild(lista);
    document.body.appendChild(aside);
  })
  .catch(error => {
    console.error('Error:', error);
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Não foi possível fazer o upload de projetos';
    aside.querySelector('.github-contenido').appendChild(errorMsg);
    document.body.appendChild(aside);
  });

// Certifique-se de que o conteúdo principal tenha margem
document.querySelectorAll('section').forEach(section => {
  if(window.innerWidth > 768) {
    section.style.marginRight = '320px';
  }
});

// Atualizar resize
window.addEventListener('resize', () => {
  document.querySelectorAll('section').forEach(section => {
    section.style.marginRight = window.innerWidth > 768 ? '320px' : '0';
  });
});