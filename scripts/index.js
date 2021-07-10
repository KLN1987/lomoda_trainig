import { cartModalOpen, cartModalClose } from './modal.js';
import pageCategory from './page-category.js';
import pageCardGood from './page-card-good.js';
import { getLocalStorage, setLocalStorage } from './local-storage.js';

let hash = location.hash.substring(1);
pageCategory(hash);
pageCardGood(hash);

const headerCityButton = document.querySelector('.header__city-button');

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const declOfNum = (n, titles) => {
  return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

export const updateCountGoodsCart = () => {
  if (getLocalStorage().length ) {
    subheaderCart.textContent = declOfNum(getLocalStorage().length, ['товар', 'товара', 'товаров']);
  } else {
    subheaderCart.textContent = 'Корзина';
  }
};

export const updateLocation = () => {
  headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город';
}
updateLocation();

//eventListnerы (слушатели)
subheaderCart.addEventListener('click', () => {
  cartModalOpen(cartOverlay);
});

cartOverlay.addEventListener('click', event => {  
  const target = event.target;

  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose(cartOverlay);
  }
});

headerCityButton.addEventListener('click', () => {
  /*prompt - модальное окно встроенное в браузер*/
    const city = prompt('Укажите ваш город').trim();
    if(city !== null) {
      localStorage.setItem('lomoda-location', city);
    }
    updateLocation();
});

updateCountGoodsCart();