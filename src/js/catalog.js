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

// Show/hide filter params
const filterCategoryButton = document.querySelector(
  '.js-filter-category-button'
)
const filterPriceButton = document.querySelector('.js-filter-price-button')
const filterDiscountButton = document.querySelector(
  '.js-filter-discount-button'
)
const filterColorButton = document.querySelector('.js-filter-color-button')

const filterCategoryOptions = document.querySelector(
  '.js-filter-category-options'
)
const filterPriceOptions = document.querySelector('.js-filter-price-options')
const filterDiscountOptions = document.querySelector(
  '.js-filter-discount-options'
)
const filterColorOptions = document.querySelector('.js-filter-color-options')

function toggleFilterOption(button, option) {
  const activeButton = document.querySelector('.param__btn--active')
  const activeOption = document.querySelector('.param__options--active')

  if (activeButton && activeButton !== button)
    activeButton.classList.remove('param__btn--active')
  if (activeOption && activeOption !== option)
    activeOption.classList.remove('param__options--active')

  button.classList.toggle('param__btn--active')
  option.classList.toggle('param__options--active')
}

filterCategoryButton.addEventListener('click', () =>
  toggleFilterOption(filterCategoryButton, filterCategoryOptions)
)
filterPriceButton.addEventListener('click', () =>
  toggleFilterOption(filterPriceButton, filterPriceOptions)
)
filterDiscountButton.addEventListener('click', () =>
  toggleFilterOption(filterDiscountButton, filterDiscountOptions)
)
filterColorButton.addEventListener('click', () =>
  toggleFilterOption(filterColorButton, filterColorOptions)
)

// Filter price slider
const filterPriceFromInput = document.querySelector('.js-filter-price-from')
const filterPriceToInput = document.querySelector('.js-filter-price-to')
const filterPriceSlider = document.querySelector('.js-filter-price-nouislider')

noUiSlider.create(filterPriceSlider, {
  start: [10000, 100000],
  connect: true,
  range: {
    min: 0,
    max: 150000,
  },
  step: 1,

  format: wNumb({
    decimals: 0,
    thousand: ' ',
  }),
})

filterPriceSlider.noUiSlider.on('update', function (values, handle) {
  const value = values[handle]

  if (handle) {
    filterPriceToInput.value = value
  } else {
    filterPriceFromInput.value = value
  }
})

filterPriceFromInput.addEventListener('change', () =>
  filterPriceSlider.noUiSlider.set([filterPriceFromInput.value, null])
)
filterPriceToInput.addEventListener('change', () =>
  filterPriceSlider.noUiSlider.set([null, filterPriceToInput.value])
)

// Remove filter parameter buttons from tabindex
function setParamButtonsAriaHidden() {
  const paramButtons = document.querySelectorAll('.param__btn')
  if (window.innerWidth >= 1400) {
    paramButtons.forEach((button) => {
      button.ariaDisabled = true
      button.setAttribute('tabindex', '-1')
    })
  } else {
    paramButtons.forEach((button) => {
      button.ariaDisabled = false
      button.removeAttribute('tabindex')
    })
  }
}

// Products pagination
const catalogSection = document.querySelector('.catalog')
const productsList = document.querySelector('.catalog__list')
const products = document.querySelectorAll('.catalog__product')

let productsPerPage = window.innerWidth >= 1024 ? 9 : 6
let currentPage = 1
let lastPage = Math.floor(products.length / productsPerPage)

function showProducts() {
  products.forEach((product, number) => {
    product.remove()

    if (
      number >= productsPerPage * (currentPage - 1) &&
      number < productsPerPage * currentPage
    ) {
      productsList.append(product)
    }
  })
}

function createPagination(count) {
  const list = document.createElement('ul')
  list.classList.add('lst', 'pagination', 'catalog__pagination')

  for (let i = 0; i < count; i++) {
    const item = document.createElement('li')
    item.classList.add('pagination__item')

    const button = document.createElement('button')
    button.classList.add('btn', 'pagination__btn')
    button.ariaLabel = `Страница ${i + 1}`
    if (i === 0) button.classList.add('pagination__btn--active')
    button.textContent = i + 1

    button.addEventListener('click', () => {
      currentPage = Number(button.textContent)
      showProducts()

      const activeButton = document.querySelector('.pagination__btn--active')
      activeButton.classList.remove('pagination__btn--active')

      button.classList.add('pagination__btn--active')

      catalogSection.scrollIntoView(true)
    })

    item.append(button)
    list.append(item)
  }

  return list
}

if (lastPage > 1) catalogSection.append(createPagination(lastPage))

showProducts()
setParamButtonsAriaHidden()

let currentWindowWidth = window.innerWidth

function resizeHandler() {
  if (window.innerWidth !== currentWindowWidth) {
    currentWindowWidth = window.innerWidth
    productsPerPage = window.innerWidth >= 1024 ? 9 : 6

    currentPage = 1
    lastPage = Math.floor(products.length / productsPerPage)

    const pagination = document.querySelector('.catalog__pagination')
    pagination.remove()

    catalogSection.append(createPagination(lastPage))
    showProducts()

    setParamButtonsAriaHidden()
  }
}

let timeoutID
window.addEventListener('resize', () => {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(resizeHandler, 300)
})

// aria-hidden for all inline svg images
const svgs = document.querySelectorAll('svg')
svgs.forEach((svg) => (svg.ariaHidden = true))
