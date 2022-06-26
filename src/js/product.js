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

  function createSvgCloseButton() {
    const button = document.createElement('button')
    button.classList.add('btn', 'gallery__close')

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

  const modalCloseButton = createSvgCloseButton()
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

// aria-hidden for all inline svg images
const svgs = document.querySelectorAll('svg')
svgs.forEach((svg) => (svg.ariaHidden = true))
