"use strict";
(self["webpackChunkgutenslider"] = self["webpackChunkgutenslider"] || []).push([["gutenslider-module"],{

/***/ "./src/blocks/gutenslider/gutenslider.js":
/*!***********************************************!*\
  !*** ./src/blocks/gutenslider/gutenslider.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Gutenslider; }
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");

class Gutenslider {
  constructor(el) {
    const gsDomSlideSelector = '.swiper-wrapper .wp-block-eedee-block-gutenslide:not(.swiper-slide-duplicate)';
    const gsBgImgSelector = '.wp-block-eedee-block-gutenslide:not(.swiper-slide-duplicate) .eedee-background-div img';
    this.el = el;
    this.domSwiper = this.el.querySelector('.swiper');
    this.swiperSettings = JSON.parse(this.domSwiper.dataset.settings);
    this.domSlides = this.el.querySelectorAll(gsDomSlideSelector);
    this.gsBreakpoints = [600, 960]; // medias (as an array to make it a little easier to manage)

    this.gsMediaQueries = [window.matchMedia(`(max-width: ${this.gsBreakpoints[0]}px)`), window.matchMedia(`(min-width: ${this.gsBreakpoints[0] + 1}px) and (max-width: ${this.gsBreakpoints[1]}px)`), window.matchMedia(`(min-width: ${this.gsBreakpoints[1] + 1}px)`)];
    this.overlayBgColor = getComputedStyle(this.el).getPropertyValue('--gutenslider-lightgallery-bg');
    this.fontColor = getComputedStyle(this.el).getPropertyValue('--gutenslider-lightgallery-font');
    this.lgTransition = this.el.dataset.lgTransition || 'lg-slide';
    this.initSwiper = this.initSwiper.bind(this);
    this.onLgAfterSlide = this.onLgAfterSlide.bind(this);
    this.onLgBeforeClose = this.onLgBeforeClose.bind(this);
    this.onLgBeforeOpen = this.onLgBeforeOpen.bind(this);
    this.addMediaQueryListeners = this.addMediaQueryListeners.bind(this);
    this.gsHandleBreakpoint = this.gsHandleBreakpoint.bind(this);
    this.init();
  }

  init() {
    this.addMediaQueryListeners();
    this.updateDom();
    this.gsHandleBreakpoint();
    this.initLg();
    
  }

  addMediaQueryListeners() {
    for (let i = 0; i < this.gsMediaQueries.length; i++) {
      try {
        // Chrome & Firefox
        this.gsMediaQueries[i].addEventListener('change', this.gsHandleBreakpoint);
      } catch (e) {
        // Safari 13.x
        if (e instanceof TypeError) {
          this.gsMediaQueries[i].addListener(e => this.gsHandleBreakpoint);
        } else {
          console.error(e);
        }
      }
    }
  }

  gsHandleBreakpoint() {
    let gsBreakpointKey = '';

    if (this.gsMediaQueries[0].matches) {
      gsBreakpointKey = '';
    } else if (this.gsMediaQueries[1].matches) {
      gsBreakpointKey = 'settingsMd';
    } else if (this.gsMediaQueries[2].matches) {
      gsBreakpointKey = 'settingsLg';
    }

    const extraSettings = gsBreakpointKey !== '' ? this.swiperSettings[gsBreakpointKey] : {};
    Object.assign(this.swiperSettings, extraSettings);
    this.initSwiper();
  }

  initSwiper() {
    var _this$swiperInstance;

    if (this.swiperSettings.autoHeight) {
      this.el.classList.add('adaptive-height');
      this.el.classList.remove('fixed-height');
    } else {
      this.el.classList.remove('adaptive-height');
      this.el.classList.add('fixed-height');
    }

    if (this.swiperSettings.slidesPerView === 'auto') {
      this.el.classList.remove('slides-number');
      this.el.classList.add('slides-auto');
    } else {
      this.el.classList.add('slides-number');
      this.el.classList.remove('slides-auto');
    }

    (_this$swiperInstance = this.swiperInstance) === null || _this$swiperInstance === void 0 ? void 0 : _this$swiperInstance.destroy(true, true);
    this.swiperInstance = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](this.domSwiper, { ...this.swiperSettings,
      modules: [swiper__WEBPACK_IMPORTED_MODULE_0__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_0__.EffectCoverflow, swiper__WEBPACK_IMPORTED_MODULE_0__.EffectCube, swiper__WEBPACK_IMPORTED_MODULE_0__.EffectFade, swiper__WEBPACK_IMPORTED_MODULE_0__.EffectFlip, swiper__WEBPACK_IMPORTED_MODULE_0__.A11y, swiper__WEBPACK_IMPORTED_MODULE_0__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_0__.Lazy],
      preloadImages: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      lazy: {
        enabled: true,
        loadPrevNext: true,
        loadPrevNextAmount: 2,
        loadOnTransitionStart: true
      }
    }); // some styles are only added after loading

    [...document.querySelectorAll('.eedee-gutenslider-nav svg, .eedee-gutenslider-nav #bg, .eedee-gutenslider-nav .bg, .eedee-gutenslider-nav #arrow, .eedee-gutenslider-nav .arrow')].forEach(e => {
      e.style.transition = 'fill 0.3s, stroke 0.3s, background 0.3s';
    });
  }
  /**
   * Add dataset attributes to all dom elements for lg
   */


  updateDom() {
    const relevantLgSlides = this.el.querySelectorAll('.wp-block-eedee-block-gutenslide.ed-bg-image, .wp-block-eedee-block-gutenslide.ed-bg-video');
    let relevantLgMediaIdx = 0;
    [...relevantLgSlides].forEach(function (lgSlide) {
      lgSlide.dataset.lgImageIdx = relevantLgMediaIdx;
      relevantLgMediaIdx++;

      if (lgSlide.classList.contains('ed-bg-video')) {
        const bgVideoEl = lgSlide.querySelector('.eedee-background-div video');
        lgSlide.style.width = `${bgVideoEl.width}px`;
      }
    });
  }

  async initLg() {
    if (!this.swiperSettings.hasLg) {
      return;
    }

    const {
      default: lightGallery
    } = await __webpack_require__.e(/*! import() | gutenslider-lg */ "gutenslider-lg").then(__webpack_require__.bind(__webpack_require__, /*! lightgallery */ "./node_modules/lightgallery/lightgallery.es5.js"));
    const {
      default: lgZoom
    } = await __webpack_require__.e(/*! import() | gutenslider-lg-zoom */ "gutenslider-lg-zoom").then(__webpack_require__.bind(__webpack_require__, /*! lightgallery/plugins/zoom */ "./node_modules/lightgallery/plugins/zoom/lg-zoom.es5.js"));
    const lgPlugins = [lgZoom];

    if (document.querySelectorAll('.wp-block-eedee-block-gutenslide .eedee-background-div video').length) {
      const {
        default: lgVideo
      } = await __webpack_require__.e(/*! import() | gutenslider-lg-video */ "gutenslider-lg-video").then(__webpack_require__.bind(__webpack_require__, /*! lightgallery/plugins/video */ "./node_modules/lightgallery/plugins/video/lg-video.es5.js"));
      lgPlugins.push(lgVideo);
    }

    const dynamicEl = [...this.domSlides].reduce((result, domSlide) => {
      let lgElement;

      if (domSlide.classList.contains('ed-bg-image')) {
        const bgImg = domSlide.querySelector('.eedee-background-div img');
        lgElement = {
          src: bgImg.src,
          thumb: bgImg.src,
          alt: bgImg.alt,
          srcset: bgImg.srcset
        };
      } else if (domSlide.classList.contains('ed-bg-video')) {
        const bgVideo = domSlide.querySelector('.eedee-background-div video');
        const poster = bgVideo.hasAttribute('poster') && bgVideo.getAttribute('poster') !== '' ? bgVideo.poster : eedeeGutenslider.pluginsUrl + '/build/images/video_poster_placeholder.jpg';
        lgElement = {
          size: `${bgVideo.dataset.width}-${bgVideo.dataset.height}`,
          video: {
            'source': [{
              src: bgVideo.src,
              type: bgVideo.getAttribute('type'),
              alt: bgVideo.alt
            }],
            attributes: {
              controls: true
            }
          },
          poster: poster,
          thumb: poster
        };

        if (bgVideo.hasAttribute('loop')) {
          lgElement.video.attributes.loop = "";
        }
      } else {
        return result;
      }

      const slideMedium = domSlide.querySelector('img, video');
      let slideTitle = '';

      if (this.swiperSettings.lgTitle) {
        if (this.swiperSettings.lgTitle === 'title') {
          slideTitle = typeof slideMedium.dataset.title === "undefined" ? '' : slideMedium.dataset.title;
        }

        if (this.swiperSettings.lgTitle === 'alt') {
          slideTitle = typeof slideMedium.dataset.alt === "undefined" ? '' : slideMedium.alt;
        }
      }

      let slideCaption = '';

      if (this.swiperSettings.lgCaption) {
        if (this.swiperSettings.lgCaption === 'caption') {
          slideCaption = typeof slideMedium.dataset.caption === "undefined" ? '' : slideMedium.dataset.caption;
        }

        if (this.swiperSettings.lgCaption === 'description') {
          slideCaption = typeof slideMedium.dataset.description === "undefined" ? '' : slideMedium.dataset.description;
        }

        if (this.swiperSettings.lgCaption === 'alt') {
          slideCaption = typeof slideMedium.dataset.alt === "undefined" ? '' : slideMedium.alt;
        }
      }

      lgElement = { ...lgElement,
        subHtml: `<h4>${slideTitle}</h4><p>${slideCaption}</p>`
      };
      result.push(lgElement);
      return result;
    }, []);

    if (this.swiperSettings.lgThumbnails) {
      const {
        default: lgThumbnail
      } = await __webpack_require__.e(/*! import() | gutenslider-lg-thumbnail */ "gutenslider-lg-thumbnail").then(__webpack_require__.bind(__webpack_require__, /*! lightgallery/plugins/thumbnail */ "./node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.es5.js"));
      lgPlugins.push(lgThumbnail);
    }

    this.lightGallery = lightGallery(this.el, {
      licenseKey: '1234-4232-1231-3111',
      plugins: lgPlugins,
      dynamic: true,
      dynamicEl,
      mode: this.lgTransition,
      container: document.body,
      addClass: 'gs-lightgallery',
      download: false,
      hideBarsDelay: 2000,
      loop: Boolean(this.swiperSettings.loop),
      counter: Boolean(this.swiperSettings.hasLgCounter),
      autoplayFirstVideo: false
    });
    this.el.addEventListener('lgAfterSlide', this.onLgAfterSlide);
    this.el.addEventListener('lgBeforeOpen', this.onLgBeforeOpen);
    this.el.addEventListener('lgBeforeClose', this.onLgBeforeClose); // add event listeners

    [...this.el.querySelectorAll('.wp-block-eedee-block-gutenslide')].map((slide, idx) => {
      //do not add lightgallery if we have no bg media
      if (!slide.classList.contains('ed-bg-image') && !slide.classList.contains('ed-bg-video')) {
        return;
      } //do not add lightgallery if we have a link


      if (slide.querySelector('.slide-link') !== null) {
        return;
      }

      slide.addEventListener('click', () => {
        const indexToOpen = parseInt(slide.dataset.lgImageIdx);
        this.lightGallery.openGallery(indexToOpen ? indexToOpen : 0);
        this.lightGallery.$backdrop.firstElement.style.backgroundColor = this.overlayBgColor ? this.overlayBgColor : '#fff';
        this.lightGallery.$container.firstElement.style.setProperty('--gutenslider-lightgallery-font', this.fontColor);
      });
    });
  }

  onLgBeforeOpen(e) {
    if (this.swiperSettings.autoplay) {
      this.swiperInstance.autoplay.stop();
    }
  }

  onLgBeforeClose(e) {
    if (this.swiperSettings.autoplay) {
      setTimeout(() => {
        var _this$swiperInstance2;

        (_this$swiperInstance2 = this.swiperInstance) === null || _this$swiperInstance2 === void 0 ? void 0 : _this$swiperInstance2.autoplay.start();
      }, 1000);
    }
  }

  onLgAfterSlide(e) {
    const {
      index
    } = e.detail;

    if (typeof index !== 'undefined') {
      const activeSlide = this.el.querySelector(`[data-lg-image-idx="${index}"]`);
      const imageIndex = activeSlide === null || activeSlide === void 0 ? void 0 : activeSlide.dataset.swiperSlideIndex;

      if (this.swiperSettings.loop) {
        var _this$swiperInstance3;

        (_this$swiperInstance3 = this.swiperInstance) === null || _this$swiperInstance3 === void 0 ? void 0 : _this$swiperInstance3.slideToLoop(parseInt(imageIndex));
      } else {
        var _this$swiperInstance4;

        (_this$swiperInstance4 = this.swiperInstance) === null || _this$swiperInstance4 === void 0 ? void 0 : _this$swiperInstance4.slideTo(parseInt(imageIndex));
      }
    }

    ;
  }
  


}

/***/ })

}]);
//# sourceMappingURL=gutenslider-module.bundle.js.map