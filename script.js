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

const products = [
  { name: "Свеча Кокос", price: 550, img: "images/catalog/candle_1.jpeg" },
  { name: "Свеча Сливочное масло", price: 450, img: "images/catalog/candle_2.jpeg" },
  { name: "Свеча Круассан", price: 750, img: "images/catalog/candle_3.jpeg" },
  { name: "Свеча Мандарин", price: 550, img: "images/catalog/candle_9.jpeg" },
  { name: "Свеча Малина", price: 550, img: "images/catalog/candle_6.jpeg" },
  { name: "Свеча Лимон", price: 550, img: "images/catalog/candle_7.jpeg" },
  { name: "Свеча Клубничная матча", price: 650, img: "images/catalog/candle_5.jpeg" },
  { name: "Свеча Кофе", price: 650, img: "images/catalog/candle_8.jpeg" },
  { name: "Свеча Лавандовый латте", price: 650, img: "images/catalog/candle_4.jpeg" }
];

const container = document.getElementById('catalog-container');

products.forEach(product => {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';

  col.innerHTML = `
    <div class="card h-100">
      <img src="${product.img}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price} руб.</p>
        <a href="#" data-large="${product.img}" class="btn btn-primary">Смотреть</a>
      </div>
    </div>
  `;

  container.appendChild(col);
});

// Обработчик открытия большого изображения
container.querySelectorAll('[data-large]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    window.open(el.getAttribute('data-large'), '_blank', 'noopener');
  });
});