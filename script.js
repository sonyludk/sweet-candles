document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Навигация
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Миниатюры
  document.querySelectorAll('[data-large]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      window.open(el.getAttribute('data-large'), '_blank', 'noopener');
    });
  });

  // ===== Корзина =====
  const CART_KEY = 'sweet_candles_cart';

  function loadCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI(cart);
  }

function updateCartUI(cart) {

  /* ===== КОРЗИНА НА ГЛАВНОЙ ===== */
  const cartBlock = document.querySelector('#cart');
  if (cartBlock) {
    if (cart.length === 0) {
      cartBlock.innerHTML = `
        <h4>Корзина</h4>
        <p>Ваша корзина пуста</p>
      `;
    } else {
      let html = '<ul>';
      let total = 0;

      cart.forEach((item, idx) => {
        html += `
          <li>
            <img src="${item.img}" alt="${item.name}" style="width:50px;border-radius:6px;">
            ${item.name} — ${item.price} руб.
            <button class="remove-btn" data-index="${idx}" data-tooltip="Удалить из корзины">❌</button>
          </li>
        `;
        total += item.price;
      });

      html += `</ul><p><strong>Итого:</strong> ${total} руб.</p>`;
      html += `<p><a href="contacts.html">Оформить заказ</a></p>`;

      cartBlock.innerHTML = `<h4>Корзина</h4>` + html;
    }
  }

  /* ===== ЗАКАЗ НА СТРАНИЦЕ КОНТАКТОВ ===== */
  const orderBlock = document.querySelector('#order_list');
  if (orderBlock) {
    if (cart.length === 0) {
      orderBlock.innerHTML = '<p>Корзина пуста</p>';
    } else {
      let html = '<ul>';

      cart.forEach((item, idx) => {
        html += `
          <li>
            <img src="${item.img}" alt="${item.name}" style="width:50px;border-radius:6px;">
            ${item.name} — ${item.price} руб.
            <button class="remove-btn" data-index="${idx}" data-tooltip="Удалить товар">❌</button>
          </li>
        `;
      });

      html += '</ul>';
      orderBlock.innerHTML = html;
    }
  }

  /* ===== ОБРАБОТКА УДАЛЕНИЯ ===== */
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      saveCart(cart);
    });
  });
}

  // Добавление товаров
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);
      const img = btn.getAttribute('data-img') || '';
      const cart = loadCart();
      cart.push({ name, price, img });
      saveCart(cart);
      alert(`Товар "${name}" добавлен в корзину!`);
    });
  });

  // Подстановка в форму контактов
  const orderList = document.querySelector('#order_list');
  if (orderList) {
    const cart = loadCart();
    if (cart.length === 0) {
      orderList.innerHTML = '<p>Корзина пуста</p>';
    } else {
      let html = '<ul>';
      cart.forEach((item, idx) => {
        html += `<li>
          <img src="${item.img}" alt="${item.name}" style="width:50px;height:auto;border-radius:4px;vertical-align:middle;margin-right:6px;">
          ${item.name} — ${item.price} руб.
          <button data-index="${idx}" class="remove-btn">❌</button>
        </li>`;
      });
      html += '</ul>';
      orderList.innerHTML = html;

      // Удаление из формы
      orderList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.getAttribute('data-index'));
          cart.splice(index, 1);
          saveCart(cart);
        });
      });
    }
  }

  // Инициализация корзины на любой странице
  updateCartUI(loadCart());
});
