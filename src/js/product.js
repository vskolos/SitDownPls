// Selects
const locationSelect = new Choices('.js-location-choices', {
  allowHTML: false,
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
})

const categorySelect = new Choices('.js-categories-choices', {
  allowHTML: false,
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  placeholder: true,
  placeholderValue: 'Категория',
})

// Burger menu
const burgerMenuOpenButton = document.querySelector('.js-burger-menu-open')
const burgerMenuCloseButton = document.querySelector('.js-burger-menu-close')
const burgerMenuContent = document.querySelector('.burger__content')

burgerMenuOpenButton.addEventListener('click', () =>
  burgerMenuContent.classList.add('burger__content--opened')
)
burgerMenuCloseButton.addEventListener('click', () =>
  burgerMenuContent.classList.remove('burger__content--opened')
)

// Product photos slider
const thumbsSlider = new Swiper('.swiper.js-product-thumbs-swiper', {
  slidesPerView: 'auto',
  slideToClickedSlide: true,
  freeMode: true,
  watchSlidesProgress: true,
  a11y: {
    slideLabelMessage: 'Миниатюра фото товара {{index}} из {{slidesLength}}',
    prevSlideMessage: 'Предыдущие миниатюры',
    nextSlideMessage: 'Следующие миниатюры',
  },
  breakpoints: {
    320: {
      spaceBetween: 38,
      direction: 'horizontal',
    },
    768: {
      spaceBetween: 18,
      direction: 'vertical',
    },
    1024: {
      spaceBetween: 38,
      direction: 'horizontal',
    },
  },
})

const photosSlider = new Swiper('.swiper.js-product-photos-swiper', {
  spaceBetween: 16,
  thumbs: {
    swiper: thumbsSlider,
  },
  a11y: {
    slideLabelMessage: 'Фото товара {{index}} из {{slidesLength}}',
    prevSlideMessage: 'Предыдущее фото',
    nextSlideMessage: 'Следующее фото',
  },
})

// Alike products slider
const alikeSlider = new Swiper('.swiper.js-alike-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    slideLabelMessage: 'Похожий товар {{index}} из {{slidesLength}}',
    prevSlideMessage: 'Предыдущие товары',
    nextSlideMessage: 'Следующие товары',
  },
  breakpoints: {
    320: {
      slidesPerGroup: 2,
      slidesPerView: 2,
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
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
})

// aria-hidden for all inline svg images
const svgs = document.querySelectorAll('svg')
svgs.forEach((svg) => (svg.ariaHidden = true))
