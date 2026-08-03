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
