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

// Product thumbnails slider
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

// Product photos slider
new Swiper('.swiper.js-product-photos-swiper', {
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

// Create close button with svg icon
function createCloseButton() {
  const button = document.createElement('button')
  button.classList.add('btn', 'modal__close')

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '12')
  svg.setAttribute('height', '12')
  svg.setAttribute('viewBox', '0 0 12 12')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path1.setAttribute(
    'd',
    'M1.42872 0.238643L6.75487 5.42386C7.08171 5.74206 7.08171 6.25794 6.75487 6.57614L1.42872 11.7614C1.10188 12.0795 0.571969 12.0795 0.245129 11.7614C-0.0817098 11.4432 -0.0817098 10.9273 0.24513 10.6091L4.97949 6L0.24513 1.39091C-0.0817089 1.07272 -0.0817089 0.556834 0.24513 0.238643C0.57197 -0.0795478 1.10188 -0.0795477 1.42872 0.238643Z'
  )
  path1.setAttribute('fill-rule', 'evenodd')
  path1.setAttribute('clip-rule', 'evenodd')
  path1.setAttribute('fill', '#999999')

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path2.setAttribute(
    'd',
    'M10.5713 0.238643L5.24513 5.42386C4.91829 5.74206 4.91829 6.25794 5.24513 6.57614L10.5713 11.7614C10.8981 12.0795 11.428 12.0795 11.7549 11.7614C12.0817 11.4432 12.0817 10.9273 11.7549 10.6091L7.02051 6L11.7549 1.39091C12.0817 1.07272 12.0817 0.556834 11.7549 0.238643C11.428 -0.0795478 10.8981 -0.0795477 10.5713 0.238643Z'
  )
  path2.setAttribute('fill-rule', 'evenodd')
  path2.setAttribute('clip-rule', 'evenodd')
  path2.setAttribute('fill', '#999999')

  svg.append(path1, path2)
  button.append(svg)

  return button
}

// Product photos modal
function createPhotosModal(slidesAmount) {
  const modal = document.createElement('div')
  modal.classList.add('modal', 'container')

  const modalGallery = document.createElement('div')
  modalGallery.classList.add('gallery', 'modal__gallery')

  const photosModalSlider = document.createElement('div')
  photosModalSlider.classList.add(
    'swiper',
    'gallery__photos',
    'js-modal-photos-swiper'
  )

  const photosModalSwiperWrapper = document.createElement('ul')
  photosModalSwiperWrapper.classList.add('lst', 'swiper-wrapper')

  const thumbsModalSlider = document.createElement('div')
  thumbsModalSlider.classList.add(
    'swiper',
    'gallery__thumbs',
    'js-modal-thumbs-swiper'
  )

  const thumbsModalSwiperWrapper = document.createElement('ul')
  thumbsModalSwiperWrapper.classList.add('lst', 'swiper-wrapper')

  function createSlides(className, amount) {
    const slides = []

    for (let number = 1; number <= amount; number++) {
      const slide = document.createElement('li')
      slide.classList.add('slide', `${className}-slide`, 'swiper-slide')

      const picture = document.createElement('picture')
      picture.classList.add('slide__img')

      const source1 = document.createElement('source')
      source1.srcset = `img/product-photo-${number}.webp, img/product-photo-${number}@2x.webp 2x`
      source1.type = 'image/webp'

      const source2 = document.createElement('source')
      source2.srcset = `img/product-photo-${number}.png, img/product-photo-${number}@2x.png 2x`

      const img = document.createElement('img')
      img.src = `img/product-photo-${number}.png`
      img.alt = `Фото ${number}`

      picture.append(source1, source2, img)
      slide.append(picture)
      slides.push(slide)
    }

    return slides
  }

  photosModalSwiperWrapper.append(
    ...createSlides('gallery__photos', slidesAmount)
  )
  photosModalSlider.append(photosModalSwiperWrapper)

  const thumbsModalSwiperPaginationPrev = document.createElement('div')
  thumbsModalSwiperPaginationPrev.classList.add('swiper-button-prev')

  const thumbsModalSwiperPaginationNext = document.createElement('div')
  thumbsModalSwiperPaginationNext.classList.add('swiper-button-next')

  function createSvgArrow() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '32')
    svg.setAttribute('height', '32')
    svg.setAttribute('viewBox', '0 0 32 32')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    )
    circle.setAttribute('cx', '16')
    circle.setAttribute('cy', '16')
    circle.setAttribute('r', '15')
    circle.setAttribute('stroke', '#A65CF0')
    circle.setAttribute('stroke-width', '2')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M14 11L19 16L14 21')
    path.setAttribute('stroke', '#A65CF0')
    path.setAttribute('stroke-width', '2')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('stroke-linejoin', 'round')

    svg.append(circle, path)
    return svg
  }

  thumbsModalSwiperPaginationPrev.append(createSvgArrow())
  thumbsModalSwiperPaginationNext.append(createSvgArrow())

  thumbsModalSwiperWrapper.append(
    ...createSlides('gallery__thumbs', slidesAmount)
  )
  thumbsModalSlider.append(
    thumbsModalSwiperWrapper,
    thumbsModalSwiperPaginationPrev,
    thumbsModalSwiperPaginationNext
  )

  const modalCloseButton = createCloseButton()
  modalCloseButton.classList.add('gallery__close')
  modalCloseButton.addEventListener('click', () => {
    modal.remove()
    document.body.style.removeProperty('overflow')
  })

  modalGallery.append(photosModalSlider, thumbsModalSlider, modalCloseButton)
  modal.append(modalGallery)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
      document.body.style.removeProperty('overflow')
    }
  })

  return modal
}

const photosSlides = document.querySelectorAll('.product__photos-slide')
photosSlides.forEach((slide, number) =>
  slide.addEventListener('click', () => {
    const photosModal = createPhotosModal(photosSlides.length)
    document.body.append(photosModal)
    document.body.style.overflow = 'hidden'

    const modalThumbsSlider = new Swiper(
      photosModal.querySelector('.js-modal-thumbs-swiper'),
      {
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        a11y: {
          slideLabelMessage:
            'Миниатюра фото товара {{index}} из {{slidesLength}}',
          prevSlideMessage: 'Предыдущие миниатюры',
          nextSlideMessage: 'Следующие миниатюры',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          320: {
            slidesPerGroup: 1,
            slidesPerView: 1,
            spaceBetween: 62,
          },
          768: {
            slidesPerGroup: 2,
            slidesPerView: 2,
            spaceBetween: 79,
          },
          1024: {
            slidesPerGroup: 3,
            slidesPerView: 3,
            spaceBetween: 66,
          },
          1400: {
            slidesPerGroup: 4,
            slidesPerView: 4,
            spaceBetween: 51,
          },
        },
      }
    )

    new Swiper(photosModal.querySelector('.js-modal-photos-swiper'), {
      initialSlide: number,
      thumbs: {
        swiper: modalThumbsSlider,
      },
      a11y: {
        slideLabelMessage: 'Фото товара {{index}} из {{slidesLength}}',
        prevSlideMessage: 'Предыдущее фото',
        nextSlideMessage: 'Следующее фото',
      },
      breakpoints: {
        320: {
          spaceBetween: 16,
        },
        768: {
          spaceBetween: 20,
        },
        1024: {
          spaceBetween: 66,
        },
        1400: {
          spaceBetween: 108,
        },
      },
    })
  })
)

// Alike products slider
new Swiper('.swiper.js-alike-swiper', {
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

// Create icon for thanks modal
function createSvgElephant() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '73')
  svg.setAttribute('height', '50')
  svg.setAttribute('viewBox', '0 0 73 50')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M11.5981 44.8056C20.7832 44.8056 22.514 36.7296 22.514 30.2636C23.6049 30.2636 32.2264 30.2636 36.1589 30.2636C57.5492 30.2636 57.5547 0 36.8411 0C31.2072 0 27.5783 3.41551 26.6068 4.60532C15.0496 4.60532 13.6449 10.644 13.6449 22.3694C13.6449 24.6314 13.6449 31.9846 13.6449 33.1173C13.6449 35.8742 12.5369 37.6629 9.55072 37.6629C7.00117 37.6629 5.79361 35.4053 4.77502 32.2373C4.24423 32.5224 0.517138 34.5383 -2.23517e-06 34.8689C1.12775 38.0337 2.33531 44.8056 11.5981 44.8056ZM24.5839 17.7634C28.0832 17.7634 28.3806 23.0266 24.3363 23.0266C20.9271 23.0266 21.0158 17.7634 24.5839 17.7634ZM36.8418 33.5355C33.8843 33.5355 25.243 32.8952 25.243 32.8952V49.1213L33.4299 49.2382L35.4766 37.5005L61.4019 37.0134L62.0848 49.8824L71.6362 50C71.6362 50 73 24.7938 73 19.7371C73 10.3576 68.8035 5.0489 59.3551 4.60532C56.9878 4.49426 53.8904 4.05263 51.8505 3.94742C60.7421 14.7668 53.6673 33.5355 36.8418 33.5355ZM53.2156 40.1146L53.8972 49.6486L59.3551 49.7662L58.6729 40.1146H53.2156ZM36.1589 49.3564L41.6168 49.4733L42.9806 40.1146H38.2049L36.1589 49.3564Z'
  )
  path.setAttribute('fill-rule', 'evenodd')
  path.setAttribute('clip-rule', 'evenodd')
  path.setAttribute('fill', '#FF862F')

  svg.append(path)
  return svg
}

// Thanks for the order modal
function createThanksModal() {
  const modal = document.createElement('div')
  modal.classList.add('modal', 'container')

  const thanksContainer = document.createElement('div')
  thanksContainer.classList.add('thanks', 'modal__thanks')

  const thanksIcon = createSvgElephant()
  thanksIcon.classList.add('thanks__icon')

  const thanksTitle = document.createElement('h5')
  thanksTitle.classList.add('thanks__title')
  thanksTitle.textContent = 'Спасибо, мы вам перезвоним!'

  const thanksCloseButton = createCloseButton()
  thanksCloseButton.classList.add('form__close')

  thanksCloseButton.addEventListener('click', () => {
    modal.remove()
    document.body.style.removeProperty('overflow')
  })

  thanksContainer.append(thanksIcon, thanksTitle, thanksCloseButton)
  modal.append(thanksContainer)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
      document.body.style.removeProperty('overflow')
    }
  })

  return modal
}

// Buy per 1 click modal
function createBuyPerClickModal() {
  const modal = document.createElement('div')
  modal.classList.add('modal', 'container')

  const modalForm = document.createElement('form')
  modalForm.classList.add('form', 'modal__form')

  const formTitle = document.createElement('h4')
  formTitle.classList.add('form__title')
  formTitle.textContent = 'Купить в один клик'

  const formText = document.createElement('p')
  formText.classList.add('form__text')
  formText.textContent =
    'Чтобы оформить заказ — заполните формы ниже и наш менеджер свяжется с вами в течении часа.'

  const formNameLabel = document.createElement('label')
  formNameLabel.classList.add('form__label')

  const formNameInput = document.createElement('input')
  formNameInput.id = 'form-name'
  formNameInput.classList.add('form__input')
  formNameInput.type = 'text'
  formNameInput.placeholder = 'Как вас зовут?'
  formNameInput.ariaLabel = 'Введите ваше имя'

  formNameLabel.append(formNameInput)

  const formTelLabel = document.createElement('label')
  formTelLabel.classList.add('form__label')

  const formTelInput = document.createElement('input')
  formTelInput.id = 'form-tel'
  formTelInput.classList.add('form__input')
  formTelInput.type = 'tel'
  formTelInput.placeholder = 'Как вас зовут?'
  formTelInput.ariaLabel = 'Введите ваше имя'

  formTelLabel.append(formTelInput)

  const formSubmitButton = document.createElement('button')
  formSubmitButton.classList.add('btn', 'form__btn')
  formSubmitButton.type = 'submit'
  formSubmitButton.textContent = 'Отправить'

  function createSvgCheckbox() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '14')
    svg.setAttribute('height', '14')
    svg.setAttribute('viewBox', '0 0 14 14')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect1.setAttribute('width', '14')
    rect1.setAttribute('height', '14')
    rect1.setAttribute('fill', 'white')

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect2.setAttribute('width', '14')
    rect2.setAttribute('height', '14')
    rect2.setAttribute('rx', '2')
    rect2.setAttribute('fill', '#A65CF0')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M2.80005 7L5.96943 10.1694L11.6532 3.78564')
    path.setAttribute('stroke', 'white')
    path.setAttribute('stroke-width', '2')

    svg.append(rect1, rect2, path)
    return svg
  }

  const formCheckboxLabel = document.createElement('label')
  formCheckboxLabel.classList.add('checkbox', 'form__checkbox')

  const formCheckboxInput = document.createElement('input')
  formCheckboxInput.id = 'form-checkbox'
  formCheckboxInput.classList.add('checkbox__input')
  formCheckboxInput.type = 'checkbox'

  const formCheckboxIcon = createSvgCheckbox()
  formCheckboxIcon.classList.add('checkbox__icon')

  const formCheckboxText = document.createElement('span')
  formCheckboxText.classList.add('checkbox__text')
  formCheckboxText.textContent = 'Принимаю '

  const formCheckboxLink = document.createElement('a')
  formCheckboxLink.classList.add('lnk', 'checkbox__link')
  formCheckboxLink.href = '#'
  formCheckboxLink.textContent = 'пользовательское соглашение'

  formCheckboxText.append(formCheckboxLink)
  formCheckboxLabel.append(
    formCheckboxInput,
    formCheckboxIcon,
    formCheckboxText
  )

  const formCloseButton = createCloseButton()
  formCloseButton.classList.add('form__close')

  formCloseButton.addEventListener('click', () => {
    modal.remove()
    document.body.style.removeProperty('overflow')
  })

  modalForm.append(
    formTitle,
    formText,
    formNameLabel,
    formTelLabel,
    formSubmitButton,
    formCheckboxLabel,
    formCloseButton
  )

  // Form validation
  const validation = new JustValidate(modalForm, {
    errorLabelCssClass: 'form__label--error',
    errorFieldCssClass: 'form__input--invalid',
    successFieldCssClass: 'form__input--valid',
    errorLabelStyle: {},
  })

  validation
    .addField('#form-name', [
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
    .addField('#form-tel', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш телефон',
      },
    ])
    .addField('#form-checkbox', [
      {
        rule: 'required',
        errorMessage: 'Примите пользовательское соглашение',
      },
    ])
    .onSuccess(() => {
      document.body.append(createThanksModal())
      modal.remove()
    })

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  modal.append(modalForm)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
      document.body.style.removeProperty('overflow')
    }
  })

  return modal
}

const buyPerClickButton = document.querySelector('.js-buy-1-click-modal-open')
buyPerClickButton.addEventListener('click', () => {
  document.body.append(createBuyPerClickModal())
  document.body.style.overflow = 'hidden'
})

// aria-hidden for all inline svg images
const svgs = document.querySelectorAll('svg')
svgs.forEach((svg) => (svg.ariaHidden = true))
