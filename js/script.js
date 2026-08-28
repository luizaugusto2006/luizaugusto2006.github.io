// Navbar: sombra ao rolar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('aberto');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('aberto'));
});

// Filtro de projetos
const filtros = document.querySelectorAll('.filtro');
const cards = document.querySelectorAll('.card');

filtros.forEach((filtro) => {
  filtro.addEventListener('click', () => {
    filtros.forEach((f) => f.classList.remove('ativo'));
    filtro.classList.add('ativo');

    const selecao = filtro.dataset.filtro;

    cards.forEach((card) => {
      const categorias = card.dataset.categorias.split(' ');
      const visivel = selecao === 'todos' || categorias.includes(selecao);
      card.style.display = visivel ? '' : 'none';
    });
  });
});

// Ano do rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Toggle de tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
function atualizaIconeTema() {
  themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀️' : '🌙';
}
atualizaIconeTema();
themeToggle.addEventListener('click', () => {
  const claro = document.documentElement.getAttribute('data-theme') === 'light';
  if (claro) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('tema', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('tema', 'light');
  }
  atualizaIconeTema();
});

// Voltar ao topo + barra de progresso
const backToTop = document.getElementById('backToTop');
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  progress.style.width = pct + '%';
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Formulário de contato (Formspree)
const formContato = document.getElementById('formContato');
if (formContato) {
formContato.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const data = new FormData(formContato);
  const nome = (data.get('nome') || '').toString();
  const email = (data.get('email') || '').toString();
  const mensagem = (data.get('mensagem') || '').toString();
  const mailto = 'mailto:luizaugusto2006@gmail.com?subject=' +
    encodeURIComponent('Contato via Portfólio - ' + nome) +
    '&body=' + encodeURIComponent(mensagem + '\n\nDe: ' + nome + ' (' + email + ')');
  fetch(formContato.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then((r) => {
      if (r.ok) {
        status.textContent = 'Mensagem enviada! Entrarei em contato em breve.';
        status.classList.remove('erro');
        formContato.reset();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      status.innerHTML = 'Não foi possível enviar pelo formulário. <a href="' + mailto + '">Clique para enviar por e-mail</a> ou use o WhatsApp.';
      status.classList.add('erro');
    });
});
}
