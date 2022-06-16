const heroSlider = new Swiper('.swiper.hero__swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

const offersSlider = new Swiper('.swiper.offers__swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
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
