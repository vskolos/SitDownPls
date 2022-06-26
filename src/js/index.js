/* eslint no-undef: 'off' */

// Select location
new Choices('.js-location-choices', {
  allowHTML: false,
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
})

// Select category
new Choices('.js-categories-choices', {
  allowHTML: false,
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  placeholder: true,
  placeholderValue: 'Категория',
})

// Burger menu open/close
const burgerMenuOpenButton = document.querySelector('.js-burger-menu-open')
const burgerMenuCloseButton = document.querySelector('.js-burger-menu-close')
const burgerMenuContent = document.querySelector('.burger__content')

burgerMenuOpenButton.addEventListener('click', () =>
  burgerMenuContent.classList.add('burger__content--opened')
)
burgerMenuCloseButton.addEventListener('click', () =>
  burgerMenuContent.classList.remove('burger__content--opened')
)

// Hero section slider
new Swiper('.swiper.js-hero-swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  a11y: {
    paginationBulletMessage: 'Перейти к слайду {{index}}',
    slideLabelMessage: 'Слайд {{index}} из {{slidesLength}}',
  },
})

// Offers section slider
new Swiper('.swiper.js-offers-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    slideLabelMessage: 'Предложение {{index}} из {{slidesLength}}',
    prevSlideMessage: 'Предыдущее предложение',
    nextSlideMessage: 'Следующее предложение',
  },
  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 16,
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1400: {
      slidesPerGroup: 3,
      slidesPerView: 'auto',
      spaceBetween: 32,
    },
  },
})

// Useful section slider
new Swiper('.swiper.js-useful-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    slideLabelMessage: 'Статья {{index}} из {{slidesLength}}',
    prevSlideMessage: 'Предыдущая статья',
    nextSlideMessage: 'Следующая статья',
  },
  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 16,
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1400: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },
})

// Show more rated products
let ratedProductsPerPage = window.innerWidth >= 1400 ? 8 : 6
let ratedProductsVisible = 0
const ratedProductsList = document.querySelector('.rated__products')
const ratedProducts = document.querySelectorAll('.rated__product')
const showMoreRatedProductsBtn = document.querySelector('.rated__btn')

function showRatedProducts() {
  ratedProducts.forEach((product, number) => {
    product.remove()
    if (number < ratedProductsVisible + ratedProductsPerPage) {
      ratedProductsList.append(product)
    }
  })

  ratedProductsVisible = Math.min(
    ratedProductsVisible + ratedProductsPerPage,
    ratedProducts.length
  )

  if (ratedProductsVisible === ratedProducts.length) {
    showMoreRatedProductsBtn.remove()
  }
}

showRatedProducts()
showMoreRatedProductsBtn.addEventListener('click', showRatedProducts)

let currentWindowWidth = window.innerWidth
window.addEventListener('resize', () => {
  if (window.innerWidth !== currentWindowWidth) {
    currentWindowWidth = window.innerWidth
    ratedProductsPerPage = window.innerWidth >= 1400 ? 8 : 6
    ratedProductsVisible = 0
    document.querySelector('.rated').append(showMoreRatedProductsBtn)
    showRatedProducts()
  }
})

// Form validation
const contactUsForm = document.querySelector('.js-contact-us-form')

const validation = new JustValidate(contactUsForm, {
  errorLabelCssClass: 'form__label--error',
  errorFieldCssClass: 'form__input--invalid',
  successFieldCssClass: 'form__input--valid',
  errorLabelStyle: {},
})

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно содержать по крайней мере 3 символа',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш телефон',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш e-mail',
    },
    {
      rule: 'email',
      errorMessage: 'Введите корректный e-mail',
    },
  ])
  .addField('#checkbox', [
    {
      rule: 'required',
      errorMessage: 'Примите пользовательское соглашение',
    },
  ])
  .onSuccess(() => {
    alert('Спасибо, мы вам перезвоним!')
    contactUsForm.reset()
    validation.refresh()
  })

contactUsForm.addEventListener('submit', (e) => e.preventDefault())

// aria-hidden for all inline svg images
const svgs = document.querySelectorAll('svg')
svgs.forEach((svg) => (svg.ariaHidden = true))
