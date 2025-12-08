document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Загружаем header
  fetch('includes/header.html')
    .then(response => response.text())
    .then(html => {
      document.querySelector('#header-placeholder').innerHTML = html;

      // Подсветка активной страницы
      document.querySelectorAll('.nav a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
      });
    })
    .catch(err => console.error('Ошибка загрузки header:', err));

  // Открытие большого изображения по клику на миниатюру
  document.querySelectorAll('[data-large]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      window.open(el.getAttribute('data-large'), '_blank', 'noopener');
    });
  });
});
