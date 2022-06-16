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

// Show more rated products
const ratedProductsPerPage = window.innerWidth >= 1400 ? 8 : 6
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

  ratedProductsVisible = Math.min(ratedProductsVisible + ratedProductsPerPage, ratedProducts.length)

  if (ratedProductsVisible === ratedProducts.length) {
    showMoreRatedProductsBtn.remove()
  }
}

showRatedProducts()
showMoreRatedProductsBtn.addEventListener('click', showRatedProducts)

window.addEventListener('resize', () => {
  ratedProductsVisible = 0
  document.querySelector('.rated').append(showMoreRatedProductsBtn)
  showRatedProducts()
})
