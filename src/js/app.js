'use strict';

$(document).ready(function () {
    //ФУНКЦИЯ ОТКРЫТИЯ МОДАЛОК
    function openModal(modal, modalBackground) {
        $(modal).addClass("active");
        $(modalBackground).addClass("active");
        $("html").addClass("scroll-hidden");
    }

    //ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛОК
    function closeModal(modal, modalBackground) {
        $(modal).removeClass("active");
        $(modalBackground).removeClass("active");
        $("html").removeClass("scroll-hidden");
    }

    //ПЕРЕКЛЮЧЕНИЕ ФИЛЬТРОВ
    $(document).on('click', '.filters__item-js', function () {
        $('.filters__item-js').removeClass('active');
        $(this).addClass('active');
    });

    // ПЕРЕКЛЮЧЕНИЕ ТАБОВ
    let tabs = [...document.querySelectorAll('.tab')];
    let tabContents = [...document.querySelectorAll('.tab-content')];

    tabs.forEach((tab, index, arTab) => {
        if (tab !== null) {
            tab.addEventListener('click', function () {
                let id = this.dataset.id;
                let tab = this.dataset.tab;

                arTab.forEach(el => {
                    if (id === el.dataset.id) {
                        el.classList.remove('active');
                    }
                })

                this.classList.add('active');

                if (tabContents.length != 0) {
                    tabContents.forEach(tabContent => {
                        if (tabContent.dataset.id === this.dataset.id) {
                            if (tabContent.dataset.tab === this.dataset.tab) {
                                tabContent.classList.add('active');
                                $(tabContent).find('.tab.active').trigger('click');
                            }
                            else {
                                tabContent.classList.remove('active');
                            }
                        }
                    })
                }
            })
        }

    });

    //ПОИСК НА 1024 В ШАПКЕ
    $(document).on('input', '.search-input', function () {
        $(this).addClass('active');
        $(this).parents('.search-wrapper').find('.input-submit').addClass('active');
        if ($(this).val() == '') {
            $(this).parents('.search-wrapper').find('.input-submit').removeClass('active');
            $(this).removeClass('active');
        }
    });

    //ПОКАЗАТЬ ПОИСК НА ШАПКЕ ТОЧКИ
    $(document).on('click', '.header-point__search', function () {
        $(this).css('display', 'none');
        $('.header-point .header__search').addClass('active');
    })

    // $(document).on('input', '.header .search-input', function () {
    //     $(this).parents('.search-wrapper').find('.input-submit').addClass('active');
    //     if ($(this).val() == '') {
    //         $(this).parents('.search-wrapper').find('.input-submit').removeClass('active');
    //     }
    // });

    //ИНПУТЫ
    const labelUp = function (label) {
        if ($(label).is('textarea')) {
            $(label).parents(".textarea__wrapper").addClass("active");
        }
        else {
            $(label).parents(".input-wrapper").addClass("active");
        }
        $(label).parents(".input-wrapper").find(".label-transform").addClass("active");
    };
    $(document).on("focus", ".form-input", function () {
        labelUp(this);
    });
    $(document).on("input", ".form-input", function () {
        if ($(this).val() !== "") {
            labelUp(this);
        }
    });
    $(document).on('focusout', '.form-input', function (e) {
        e.stopPropagation();
        if ($(this).val() == '') {
            $(this).parents('.input-wrapper').find('.label-transform').removeClass('active');
        }
        $(this).parents('.input-wrapper').removeClass('active');
    });

    //ПОКАЗАТЬ В ШАПКЕ СКРЫТЫЕ ЭЛЕМЕНТЫ
    function showElements(clickElement, element) {
        if ($(clickElement).hasClass('active')) {
            $(clickElement).removeClass('active');
            $('.header-fixed').removeClass('show');
            $(`.header-fixed ${element}`).slideUp();
        }
        else {
            $(clickElement).addClass('active');
            $('.header-fixed').addClass('show');
            $(`.header-fixed ${element}`).slideDown();
        }
    }

    //ОТКРЫТЬ ПОИСК В ФИКС ШАПКЕ
    $(document).on('click', '.header-fixed .header__icons-item--search', function () {
        if ($(window).width() < 668) {
            showElements($(this), '.js-header-search');
            $('.header-fixed .place__info').css('display', 'none');
            $('.header-fixed .place__icon').removeClass('active');
        }
        else if ($(window).width() < 1024) {
            console.log('hehe')
            showElements($(this), '.js-header-search');
        }
        else if ($(this).parents('.header-fixed').hasClass('header-point-fix')) {
            showElements($(this), '.js-header-search');
        }
    });

    //ОТКРЫТЬ ГЕОЛОКАЦИЮ В ФИКС ШАПКЕ
    $(document).on('click', '.header-fixed .place__icon', function () {
        if ($(window).width() < 668) {
            showElements($(this), '.place__info');
            $('.header-fixed .header__search').css('display', 'none');
            $('.header-fixed .header__icons-item--search').removeClass('active');
        }
        else {
            openModal('.block-swipe__background-city', '.block-swipe-city');
        }
    });

    $(document).on('click', '.call-geolocation', function () {
        openModal('.block-swipe__background-city', '.block-swipe-city');
    });

    //TRIGGER CLICK ПО КНОПКЕ СОХРАНИТЬ ИЗМЕНЕНИЯ НА МОБИЛКАХ НАЖАТЬ НА ИНПУТ САБМИТ В СТРАНИЦЕ ЛИЧНЫЕ ДАННЫЕ
    $(document).on('click', '.pin-save .btn-text', function () {
        $('.personal-data__save .btn-text').trigger('click');
    });

    //ДОБАВИТЬ В ИЗБРАННОЕ
    $(document).on('click', '.fav-heart', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('.fav__notification').addClass('active');
            setTimeout(function () {
                $('.fav__notification').removeClass('active');
            }, 2000);
        }
    });

    //МАСКА НА ИНПУТЫ С ТЕЛЕФОНОМ
    jQuery('.input-phone').inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ ОБРАТНОЙ СВЯЗИ
    $(document).on("click", ".footer__sosials-feedback", function () {
        openModal('.block-swipe-feedback', '.block-swipe__background-feedback');
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ С ВЫБОРОМ ГОРОДА
    $(document).on("click", ".place__info", function () {
        openModal('.block-swipe-city', '.block-swipe__background-city');
    });

    if ($('.block-swipe__background').hasClass('active')) {
        $("html").addClass("scroll-hidden");
    }

    //ЗАКРЫТЬ КУКИ
    let cookieBtnClose = document.querySelector(".cookie .btn-text");
    if (cookieBtnClose != null) {
        cookieBtnClose.addEventListener("click", function (e) {
            document.cookie = "cookie-getbeer=true; path=/; expires=604800";
            document.querySelector(".cookie").remove();
        });
    }

    //ПО СВАЙПУ УБРАТЬ POP-UP
    let touchstartY = 0;
    let touchendY = 0;

    function checkDirection() {
        if (touchendY > touchstartY) {
            $(".block-swipe").removeClass("active");
            $(".block-swipe__background").removeClass("active");
            $("html").removeClass("scroll-hidden");
        }
    }
    function checkDirectionBottom() {
        if (touchendY < touchstartY) {
            $(".block-swipe").removeClass("active");
            $(".block-swipe__background").removeClass("active");
            $("html").removeClass("scroll-hidden");
        }
    }

    document.querySelectorAll('.block-swipe__btn').forEach(item => {
        item.addEventListener('touchend', e => {
            touchendY = e.changedTouches[0].screenY;
            if (item.classList.contains('block-swipe__btn--top')) {
                checkDirectionBottom();
            }
            else {
                checkDirection();
            }
        });
    });
    document.querySelectorAll('.block-swipe__btn').forEach(item => {
        item.addEventListener('touchstart', e => {
            touchstartY = e.changedTouches[0].screenY;
        });
    });
    // document.querySelector('.block-swipe__btn').addEventListener('touchstart', e => {
    //     touchstartY = e.changedTouches[0].screenY;
    // });

    // document.querySelector('.block-swipe__btn').addEventListener('touchend', e => {
    //     touchendY = e.changedTouches[0].screenY;
    //     checkDirection();
    // });

    //ПРИЖАТЬ ФУТЕР К НИЗУ, ЕСЛИ МАЛО КОНТЕНА
    let headerHeightWithMargin = $('.header').outerHeight(true);
    let footerHeightWithMargin = $('.footer').outerHeight(true);
    let tabbarHeightWithMargin = $('.tabbar').outerHeight(true);
    let contentHeight;
    if ($(window).width() < 1024) {
        contentHeight = $(window).height() - headerHeightWithMargin - footerHeightWithMargin - tabbarHeightWithMargin;
    }
    else {
        contentHeight = $(window).height() - headerHeightWithMargin - footerHeightWithMargin;
    }
    $('.stretch').css('min-height', contentHeight);

    //ФИКСИРОВАННАЯ ШАПКА НА СКРОЛЛЕ 
    if ($('.header').length !== 0) {
        let header = document.querySelector('.header');
        let headerFix = document.querySelector('.header-fixed');
        let headerHeight = header.clientHeight + 200;
        document.onscroll = function () {
            let scroll = window.scrollY;

            if (scroll > headerHeight) {
                headerFix.classList.add('active');
            }
            else {
                headerFix.classList.remove('active');
            }
        };
    }

    //ДОБАВИТЬ padding-bottom К body ЕСЛИ ЕСТЬ ЗАКРЕПЛЯШКИ
    if ($(window).width() < 668 || ($(window).width() < 1024 && !$('.pin').hasClass('phone-pin'))) {
        if ($('.pin').length != 0) {
            let bodyPaddingBottom = $('body').css('padding-bottom').replace('px', '');
            let pinHeight = $('.pin').css('height').replace('px', '');
            let newPaddingBottom = Number(pinHeight) + Number(bodyPaddingBottom);
            $('body').css('padding-bottom', newPaddingBottom + 'px');
        }
    }

    //БАННЕР ЕЗЖАЮЩИЙ В ШАПКЕ
    let beginTransform = $('.point-img img').css('transform');
    $(document).on('mouseenter', '.header-point', function () {
        $(this).find('.point-img img').addClass('active');
    });
    let transform;
    $(document).on('mouseleave', '.header-point', function () {
        transform = $('.point-img img').css('transform');
        $('.point-img img').css('transform', transform);
        $('.point-img img').removeClass('active');
        setTimeout(() => $('.point-img img').css('transform', beginTransform), 200);
    });

    $(document).on('click', '.block-swipe__background', function (e) {
        e.stopPropagation();
        $(this).removeClass('active');
        $(this).next('.block-swipe').removeClass('active');
        $("html").removeClass("scroll-hidden");
        if ($(this).hasClass('block-swipe__background-cart')) {
            $('.header__cart').removeClass('active');
        }
    });

    //МОДАЛКА КОРЗИНЫ С ШАПКИ
    $(document).on('click', '.call-cart', function (e) {
        if ($(this).hasClass('header__cart')) {
            $(this).addClass('active');
        }
        openModal('.block-swipe-cart', '.block-swipe__background-cart');
    });

    //ОТКРЫТЬ МОДАЛКУ С ИНФОЙ О ТОЧКЕ
    $(document).on('click', '.alert', function () {
        openModal('.block-swipe__background-point-info', '.block-swipe-point-info');
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ КОРЗИНА ПО КЛИКУ НА ЗАКРЕП КОРЗИНА
    $(document).on("click", ".cart-pin__link", function () {
        openModal('.block-swipe-cart', '.block-swipe__background-cart');
    });

    //ЗАКРЫТЬ ВСПЛЫВАШКУ ВЫБОРА ГОРОДА ПО КЛИКУ НА КНОПКУ ДА, ВЕРНО
    $(document).on('click', '.block-swipe-city .btn-text--orange', function () {
        closeModal('.block-swipe-city', '.block-swipe__background-city');
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ С ГЕОЛОКАЦИЕЙ ПО КЛИКУ НА КНОПКУ НЕТ, ДРУГОЙ
    $(document).on('click', '.block-swipe-city .btn-text--gray', function () {
        closeModal('.block-swipe-city', '.block-swipe__background-city');
        openModal('.block-swipe__background-geolocation', '.block-swipe-geolocation');
        if (this.hasAttribute('data-map')) {
            $.map([...$(".js-map")], function (map) {
                $(map).empty();
            });
            if (!isMapLoaded) {
                creatMapsScript($(this).attr('data-map').split("#")[1]);
                isMapLoaded = true;
            } else {
                renderMap($(this).attr('data-map').split("#")[1]);
            }
        }
    });

    //ПО КЛИКУ НА ПАЛОЧКУ ЗАКРЫТЬ ВСПЛЫВАШКУ
    $(document).on('click', '.block-swipe__btn', function () {
        closeModal('.block-swipe', '.block-swipe__background');
    });

    //ПО КЛИКУ НА КРЕСТИК ЗАКРЫТЬ МОДАЛКУ
    $(document).on('click', '.modal-close', function () {
        closeModal('.block-swipe', '.block-swipe__background');
    });

    //ЗАКРЫТЬ МОДАЛКУ ВЫЙТИ ИЗ ПРОФИЛЯ ПО КЛИКУ НА ДА
    $(document).on('click', '.block-swipe-logout .btn-text--orange', function () {
        closeModal('.block-swipe-logout', '.block-swipe__background-logout');
    });

    //ЗАКРЫТЬ МОДАЛКУ ВЫЙТИ ИЗ ПРОФИЛЯ ПО КЛИКУ НА НЕТ
    $(document).on('click', '.block-swipe-logout .btn-text--gray', function () {
        closeModal('.block-swipe-logout', '.block-swipe__background-logout');
    });

    //ЗАКРЫТЬ МОДАЛКУ СБРОС КОРЗИНЫ ПО КЛИКУ НА ОТМЕНА
    $(document).on('click', '.block-swipe-cart-cancel .btn-text--gray', function () {
        closeModal('.block-swipe-cart-cancel', '.block-swipe__background-cart-cancel');
    });

    //ЗАКРЫТЬ МОДАЛКУ СБРОС КОРЗИНЫ ПО КЛИКУ НА ПРОДОЛЖИТЬ
    $(document).on('click', '.block-swipe-cart-cancel .btn-text--orange', function () {
        closeModal('.block-swipe-cart-cancel', '.block-swipe__background-cart-cancel');
    });

    //ЗАКРЫТЬ МОДАЛКУ ОТМЕНА ЗАКАЗА ПО КЛИКУ НА ОТМЕНА
    $(document).on('click', '.block-swipe-order-cancel .btn-text--gray', function () {
        closeModal('.block-swipe-order-cancel', '.block-swipe__background-order-cancel');
    });

    //ЗАКРЫТЬ МОДАЛКУ ОТМЕНА ЗАКАЗА ПО КЛИКУ НА ПРОДОЛЖИТЬ
    $(document).on('click', '.block-swipe-order-cancel .btn-text--orange', function () {
        closeModal('.block-swipe-order-cancel', '.block-swipe__background-order-cancel');
    });

    //ПО КНОПКЕ ДОБАВИТЬ ПОКАЗАТЬ ВМЕСТО НЕЕ СЧЕТЧИК
    $(document).on('click', '.js-btn-add', function () {
        $(this).addClass('hide');
        $(this).parents('.card__btns').find('.card__btns-count').removeClass('hide');
        $('.cart__notification').addClass('active');
        setTimeout(function () {
            $('.cart__notification').removeClass('active');
        }, 2000);
    });

    //УМЕНЬШИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', '.card__btns-count-btn--minus', function () {
        let val = +$(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val();
        let constVal = +$(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').attr('data-value');
        if (val == constVal) {
            $(this).parents('.card__btns').find('.card__btns-count').addClass('hide');
            $(this).parents('.card__btns').find('.js-basket').removeClass('hide');
        }
        else {
            $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val(val -= constVal);
        }
    });

    //УВЕЛИЧИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', '.card__btns-count-btn--plus', function () {
        let val = +$(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val();
        let constVal = +$(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').attr('data-value');
        $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val(val += constVal);
    });

    //ИЗМЕНЕНИЕ КАРТИНКИ ПРИ НАВЕДЕНИИ У БЫСТРОГО ПРОСМОТРА
    $(document).on('mouseenter', ".swiper-quck-view .swiper-slide", function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //ПОКАЗАТЬ СТРЕЛКУ НАВЕРХ
    $(window).scroll(function () {
        let height = $(window).scrollTop();
        if (height > 1000) {
            $('.arrow-top').removeClass('hide');
        } else {
            $('.arrow-top').addClass('hide');
        }
    });

    $(".arrow-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    //ВЫБРАТЬ ДАТУ ИЛИ ВРЕМЯ НА ОФОРМЛЕНИИ ЗАКАЗА
    $(document).on('click', '.select-js', function () {
        $(this).parents('.input-wrapper').find('.label-transform').addClass('active');
        // $(this).parents('.input-wrapper').find('.form-input').val($(this).text());
        this.closest('.input-wrapper').querySelector('.form-input').value = this.innerText;
        $(this).parents('.input-wrapper').find('.input-reset').removeClass('hide');
        if ($(this).hasClass('street-js')) {
            $(this).parents('.block-swipe').find('.modal-title').text($(this).text());
        }
    });

    //ОТКРЫТЬ БЫСТРЫЙ ПРОСМОТР ПО КЛИКУ НА ФОТО ТОВАРА
    $(document).on('click', '.card__image', function () {
        openModal('.block-swipe__background-quick-view', '.block-swipe-quick-view');
    });

    //ОТКРЫТЬ БЫСТРЫЙ ПРОСМОТР ПО КЛИКУ НА НАЗВАНИЕ ТОВАРА
    $(document).on('click', '.card__name', function () {
        openModal('.block-swipe__background-quick-view', '.block-swipe-quick-view');
    });

    //ВВОД ГЕОЛОКАЦИИ
    $(".js-find").keyup(function () {
        $(this).parents('.input-wrapper').find('.input-reset').removeClass('hide');
        let filter = $(this).val(),
            count = 0;
        $(this)
            .parents(".input-wrapper")
            .find(".filters__dots-window-item")
            .each(function () {
                if ($(this).attr("title").search(new RegExp(filter, "i")) < 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                    count++;
                }
            });
        if (filter == '') {
            $(this).parents('.input-wrapper').find('.input-reset').addClass('hide');
        }
    });

    //ОЧИСТИТЬ ИНПУТ
    $(document).on('click', '.input-reset', function () {
        $(this).addClass('hide');
        $(this).parents('.input-wrapper').find('.form-input').val('');
    });

    //НАПОЛНЕНИЕ ФИЛЬТРОВ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА
    if ($(".filters-light").length !== 0) {
        const linksArr = [...$(".filters-light__item")];
        let linksNum;
        if ($(window).width() >= 1024 && $(window).width() <= 1499) linksNum = 5;
        if ($(window).width() >= 1500) linksNum = 8;
        if (linksArr.length > linksNum) {
            $.map(linksArr, function (item, index) {
                $(item).remove();
                let htmlLink;
                if (index < linksNum) {
                    htmlLink = `
                <a class= "filters-light__item letter-spacing filters__item-js ${index === 0 ? "active" : ""}" href = "javascript:void(0)" > ${$(item).text()}</>
                `;
                    $(".filters-light__items").append(htmlLink);
                } else if (index === linksNum) {
                    const html = `
            <div class="filters__dots">
                            <svg>
                                <use xlink:href="/upload/images/icons/sprite.svg#dots"></use>
                            </svg>
                            <div class="filters__dots-window-wrapper">
                                <div class="filters__dots-window filters__dots-window-js">
                                </div>
                            </div>
            </div>
                `;
                    $(".filters-light__items").append(html);
                }

                if (index + 1 > linksNum) {
                    htmlLink = `
                <a href = "javascript:void(0)" class="filters__dots-window-item letter-spacing filters__item-js"> ${$(item).text()}</>
            `;
                    $(".filters__dots-window-js").append(htmlLink);
                }

            });
        }
    }

    //ПОКАЗАТЬ СКРЫТЫЕ ПОЛЯ
    let inputHide = [...document.querySelectorAll('.radio__input')];

    inputHide.forEach(inputHideItem => {

        inputHideItem.addEventListener('change', function () {
            if (inputHideItem !== null) {
                if (this.classList.contains('input-hide')) {
                    $(this).parents('.radio__wrapper').find('.select').slideDown();
                } else {
                    $(this).parents('.js-choice').find('.select').slideUp();
                }
            }
        })
    });

    //ТРИГГЕР КЛИК НА САБМИТ В ОФОРМЛЕНИИ ЗАКАЗА
    $(document).on('click', '.checkout-link-submit', function () {
        $('.checkout-submit').trigger('click');
    });

    //ОТКРЫТЬ ОФОРМЛЕНИЕ ЗАКАЗА 
    $(document).on('click', '.open-checkout', function () {
        closeModal('.block-swipe__background', '.block-swipe');
        $('.header__cart').removeClass('active');
        openModal('.block-swipe__background-checkout', '.block-swipe-checkout');
    });

    //ПОКАЗАТЬ/СКРЫТЬ ПАРОЛЬ
    $(document).on('click', '.label-eye', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.input-wrapper').find('.form-input').attr('type', 'password');
        }
        else {
            $(this).addClass('active');
            $(this).parents('.input-wrapper').find('.form-input').attr('type', 'text');
        }
    });

    //ОБЕРНУТЬ КОНТЕНТУЮ ЧАСТЬ
    let content = document.querySelector('.content-style');
    let imgs = document.querySelectorAll('.content-style img');

    if (content != null) {

        let allEltsInContent = [...content.querySelectorAll('*')];
        let allTagInContent = [];
        allEltsInContent.forEach(elt => {
            allTagInContent.push(elt.tagName.toLocaleLowerCase())

        });
        if (allTagInContent.includes('table')) {
            let tables = content.querySelectorAll('table');
            tables.forEach(table => {
                $(table).wrap('<div class="scroll-table" />');
            })
        };
        imgs.forEach(img => {
            let imgParentClass = img.parentNode.className;
            if (!imgParentClass.includes('__img')) {
                let div = document.createElement('div');
                div.innerHTML = `<img src = "${img.src}" alt = "${img.getAttribute('alt')}" > `;
                div.classList.add('content-img');
                img.parentNode.replaceChild(div, img);
            }
        });

        if (allTagInContent.includes('iframe')) {
            let iframes = content.querySelectorAll('iframe');

            iframes.forEach(iframe => {
                let wrapper = document.createElement('div')
                let iframeSrc = iframe.src
                wrapper.classList.add('wrapper-iframe');
                let parent = iframe.parentNode;
                parent.replaceChild(wrapper, iframe);
                wrapper.appendChild(iframe);
            })
        }
    };

    $(document).on("click", ".js-logout", function () {
        $(".header__icons-item-logout")[0].click();
    });

    if ($(".network-page").length !== 0) {
        const storesArr = [...$(".network-page .ajax_main-item")];
        $(".point-count__value span").text(storesArr.length);
    }

    // ПОДКЛЮЧЕНИЕ КАРТЫ
    let isMapLoaded = false;
    const jsMap = document.querySelector("#map");
    const renderMap = function (mapId = "map") {
        if ($("#map").length !== 0) {
            if ($(`#${mapId}`).hasClass("ymaps-logos")) {
                ymaps.ready(function () {
                    let myMap = new ymaps.Map(`${mapId}`, {
                        center: [$(`#${mapId}`).attr("data-coords").split(",")[0],
                        $(`#${mapId}`).attr("data-coords").split(",")[1]],
                        zoom: $(window).width() > 667 ? 17 : 14,
                    }),


                        // Создаём макет содержимого ГЕОЛОКАЦИЯ.
                        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<div class="icon-map">1</div>'
                        ),
                        myPlacemarkWithContent = new ymaps.Placemark(
                            [$(`#${mapId}`).attr("data-coords").split(",")[0],
                            $(`#${mapId}`).attr("data-coords").split(",")[1]],
                            {},
                            {
                                // Опции.
                                // Необходимо указать данный тип макета.
                                iconLayout: "default#imageWithContent",
                                // Своё изображение иконки метки.
                                iconImageHref: "../img/icons/map-geo.svg",
                                // iconImageHref: "/upload/images/map-geo.svg",
                                // Размеры метки.
                                iconImageSize: [82, 51],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-48, -51],

                                // Макет содержимого.
                                iconContentLayout: MyIconContentLayout,
                            }
                        ),


                        // Создаём макет содержимого ЗАГЛУШКА.
                        MyIconContentLayoutPlug = ymaps.templateLayoutFactory.createClass(
                            '<div class="icon-map1" style="width: 60px; height:66px;"></div>'
                        ),
                        myPlacemarkWithContentPlug = new ymaps.Placemark(
                            [56.320438, 44.006256],
                            {},
                            {
                                // Опции.
                                // Необходимо указать данный тип макета.
                                iconLayout: "default#imageWithContent",
                                // Своё изображение иконки метки.
                                // iconImageHref: "/upload/images/map-plug.svg",
                                iconImageHref: "../img/icons/map-plug.svg",
                                // Размеры метки.
                                iconImageSize: [60, 66],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-30, -50],

                                // Макет содержимого.
                                iconContentLayout: MyIconContentLayoutPlug,
                            }
                        ),

                        // Создаём макет содержимого ТОЧКА.
                        MyIconContentLayoutDot = ymaps.templateLayoutFactory.createClass(
                            '<div class="icon-map">3</div>'
                        ),
                        myPlacemarkWithContentDot = new ymaps.Placemark(
                            [56.320759, 44.006145],
                            {},
                            {
                                // Опции.
                                // Необходимо указать данный тип макета.
                                iconLayout: "default#imageWithContent",
                                // Своё изображение иконки метки.
                                // iconImageHref: "/upload/images/map-dot.svg",
                                iconImageHref: "../img/icons/map-dot.svg",
                                // Размеры метки.
                                iconImageSize: [39, 39],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-18, -30],

                                // Макет содержимого.
                                iconContentLayout: MyIconContentLayoutDot,
                            }
                        ),

                        // Создаём макет содержимого КОМПАНИЯ.
                        MyIconContentLayout1 = ymaps.templateLayoutFactory.createClass(
                            '<div class="icon-map">4</div>'
                        ),
                        myPlacemarkWithContent1 = new ymaps.Placemark(
                            [56.320463, 44.006858],
                            {},
                            {
                                // Опции.
                                // Необходимо указать данный тип макета.
                                iconLayout: "default#imageWithContent",
                                // Своё изображение иконки метки.
                                iconImageHref: "../img/icons/map-store.svg",
                                // iconImageHref: "/upload/images/map-store.svg",
                                // Размеры метки.
                                iconImageSize: [60, 66],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-30, -50],

                                // Макет содержимого.
                                iconContentLayout: MyIconContentLayout1,
                            }
                        );


                    myMap.controls.remove("zoomControl");
                    myMap.controls.remove("rulerControl");
                    myMap.controls.remove("trafficControl");
                    myMap.controls.remove("typeSelector");
                    myMap.controls.remove("fullscreenControl");
                    myMap.controls.remove("geolocationControl");
                    myMap.controls.remove("searchControl");
                    myMap.geoObjects
                        .add(myPlacemarkWithContent);
                    myMap.geoObjects
                        .add(myPlacemarkWithContent1);
                    myMap.geoObjects
                        .add(myPlacemarkWithContentPlug);
                    myMap.geoObjects
                        .add(myPlacemarkWithContentDot);

                    let cluster = new ymaps.Clusterer({
                        clusterIcons: [
                            {
                                href: '../img/icons/map-claster.png',
                                size: [100, 100],
                                offset: [-50, -50]
                            }
                        ],
                        clusterIconContentLayout: null
                    });

                    cluster.add(myPlacemarkWithContent);
                    cluster.add(myPlacemarkWithContent1);
                    cluster.add(myPlacemarkWithContentPlug);
                    cluster.add(myPlacemarkWithContentDot);
                    myMap.geoObjects.add(cluster);

                    // СДЕЛАТЬ ЦИКЛ ДЛЯ ФОРМИРОВАНИЯ МЕТКИ!!!!!!!!!!!
                    myPlacemarkWithContentPlug.events.add('mouseenter', function () {
                        $('.icon-map1').parents('.ymaps-2-1-79-image-with-content').css('transform', 'scale(2)');
                    },
                    );
                    myPlacemarkWithContentPlug.events.add('mouseleave', function () {
                        $('.icon-map1').parents('.ymaps-2-1-79-image-with-content').css('transform', '');
                    },
                    );
                });
            }
            else if ($(`#${mapId}`).hasClass("map-geolocation")) {
                ymaps.ready(function () {
                    // Пример реализации собственного элемента управления на основе наследования от collection.Item.
                    // Элемент управления отображает название объекта, который находится в центре карты.
                    var map = new ymaps.Map("mapGeo", {
                        center: [55.819543, 37.611619],
                        zoom: 6,
                        controls: ['searchControl']
                    }
                    )
                    // ,

                    //     // Создаем собственный класс.
                    //     CustomControlClass = function (options) {
                    //         CustomControlClass.superclass.constructor.call(this, options);
                    //         this._$content = null;
                    //         this._geocoderDeferred = null;
                    //     };
                    // // И наследуем его от collection.Item.
                    // ymaps.util.augment(CustomControlClass, ymaps.collection.Item, {
                    //     onAddToMap: function (map) {
                    //         CustomControlClass.superclass.onAddToMap.call(this, map);
                    //         this._lastCenter = null;
                    //         this.getParent().getChildElement(this).then(this._onGetChildElement, this);
                    //     },

                    //     onRemoveFromMap: function (oldMap) {
                    //         this._lastCenter = null;
                    //         if (this._$content) {
                    //             this._$content.remove();
                    //             this._mapEventGroup.removeAll();
                    //         }
                    //         CustomControlClass.superclass.onRemoveFromMap.call(this, oldMap);
                    //     },

                    //     _onGetChildElement: function (parentDomContainer) {
                    //         // Создаем HTML-элемент с текстом.
                    //         this._$content = $('<div class="customControl"></div>').appendTo(parentDomContainer);
                    //         this._mapEventGroup = this.getMap().events.group();
                    //         // Запрашиваем данные после изменения положения карты.
                    //         this._mapEventGroup.add('boundschange', this._createRequest, this);
                    //         // Сразу же запрашиваем название места.
                    //         this._createRequest();
                    //     },

                    //     _createRequest: function () {
                    //         var lastCenter = this._lastCenter = this.getMap().getCenter().join(',');
                    //         // Запрашиваем информацию о месте по координатам центра карты.
                    //         ymaps.geocode(this._lastCenter, {
                    //             // Указываем, что ответ должен быть в формате JSON.
                    //             json: true,
                    //             // Устанавливаем лимит на кол-во записей в ответе.
                    //             results: 1
                    //         }).then(function (result) {
                    //             // Будем обрабатывать только ответ от последнего запроса.
                    //             if (lastCenter == this._lastCenter) {
                    //                 this._onServerResponse(result);
                    //             }
                    //         }, this);
                    //     },

                    //     _onServerResponse: function (result) {
                    //         // Данные от сервера были получены и теперь их необходимо отобразить.
                    //         // Описание ответа в формате JSON.
                    //         var members = result.GeoObjectCollection.featureMember,
                    //             geoObjectData = (members && members.length) ? members[0].GeoObject : null;
                    //         if (geoObjectData) {
                    //             // $('.form-input[id="checkoutGeolocationCity"]').val(geoObjectData.metaDataProperty.GeocoderMetaData.text);
                    //             // this._$content.text(geoObjectData.metaDataProperty.GeocoderMetaData.text);
                    //         }
                    //     }
                    // });

                    // var customControl = new CustomControlClass();
                    // map.controls.add(customControl, {
                    //     float: 'none',
                    //     position: {
                    //         top: 10,
                    //         left: 10
                    //     }
                    // });
                    // //ПОИСК ПО КАРТЕ 
                    var searchControl = new ymaps.control.SearchControl({
                        options: {
                            // Будет производиться поиск и по топонимам, и по организациям.
                            provider: 'yandex#search'
                        }
                    });

                    // Добавляем элемент управления на карту.
                    map.controls.add(searchControl);
                    let inputs = $('.js-find');
                    console.log(inputs)
                    $(document).on('input', '.js-find', function () {
                        let streetValue, cityValue;
                        let commonValue = '';
                        for (let i = 0; i < inputs.length; i++) {
                            commonValue = commonValue + $(inputs).eq(i).val() + ' ';
                        }
                        searchControl.search(commonValue);
                        console.log(commonValue)
                    });
                });
                //КОНЕЦ ПОИСК ПО КАРТЕ
            }
            else {
                ymaps.ready(function () {
                    let myMap = new ymaps.Map(`${mapId}`, {
                        center: [$(`#${mapId}`).attr("data-coords").split(",")[0],
                        $(`#${mapId}`).attr("data-coords").split(",")[1]],
                        zoom: $(window).width() > 667 ? 17 : 14,
                    }),

                        // Создаём макет содержимого ГЕОЛОКАЦИЯ.
                        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<div class="icon-map"></div>'
                        ),
                        myPlacemarkWithContent = new ymaps.Placemark(
                            [$(`#${mapId}`).attr("data-coords").split(",")[0],
                            $(`#${mapId}`).attr("data-coords").split(",")[1]],
                            {},
                            {
                                // Опции.
                                // Необходимо указать данный тип макета.
                                iconLayout: "default#imageWithContent",
                                // Своё изображение иконки метки.
                                iconImageHref: "/upload/images/gb-logo-map.svg",
                                // Размеры метки.
                                iconImageSize: [60, 66],
                                // Смещение левого верхнего угла иконки относительно
                                // её "ножки" (точки привязки).
                                iconImageOffset: [-30, -66],

                                // Макет содержимого.
                                iconContentLayout: MyIconContentLayout,
                            }
                        );

                    myMap.controls.remove("zoomControl");
                    myMap.controls.remove("rulerControl");
                    myMap.controls.remove("trafficControl");
                    myMap.controls.remove("typeSelector");
                    myMap.controls.remove("fullscreenControl");
                    myMap.controls.remove("geolocationControl");
                    myMap.controls.remove("searchControl");
                    myMap.geoObjects
                        .add(myPlacemarkWithContent);

                });
            }

        }
    };

    const creatMapsScript = function (id) {
        let scriptYMAPS = document.createElement("script");
        scriptYMAPS.src =
            "https://api-maps.yandex.ru/2.1/?apikey=e2ae43d9-0c0a-49c7-9736-80d055e3dcf2&lang=ru_RU";
        scriptYMAPS.setAttribute("async", "");
        document
            .querySelector("body")
            .insertAdjacentElement("beforeend", scriptYMAPS);
        scriptYMAPS.onload = function () {
            renderMap(id);
        };
    };

    const revealMapBlock = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;


        if (!isMapLoaded) {
            creatMapsScript();
            isMapLoaded = true;
        }
        observer.unobserve(entry.target);
    };

    const mapObserver = new IntersectionObserver(revealMapBlock, {
        root: null,
        threshold: 0.15,
    });

    if (jsMap) mapObserver.observe(jsMap);

    $(document).on("click", ".view-btn__item", function () {
        if (this.hasAttribute('data-map')) {
            $.map([...$(".js-map")], function (map) {
                $(map).empty();
            });
            if (!isMapLoaded) {
                creatMapsScript($(this).attr('data-map').split("#")[1]);
                isMapLoaded = true;
            } else {
                renderMap($(this).attr('data-map').split("#")[1]);
            }
        };
        let post = {
            view_objects: $(this).data("view"),
            ajax: "Y",
        };
        const loader = `
       <div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
       `;
        $(".tab-content .wrapper").append(loader);
        BX.ajax.post(window.location.href, post, function (data) {
            $(".tab-content").html($(data).find(".wrapper"));
            $(".loader").remove();
            // if (this.hasAttribute('data-map')) {
            //     $.map([...$(".js-map")], function (map) {
            //         $(map).empty();
            //     });
            //     if (!isMapLoaded) {
            //         creatMapsScript($(this).attr('data-map').split("#")[1]);
            //         isMapLoaded = true;
            //     } else {
            //         renderMap($(this).attr('data-map').split("#")[1]);
            //     }
            // }
            //reinit js functions
            // if (typeof ymaps !== "undefined") {
            //     renderMap();
            // } else {
            //     creatMapsScript($(data).find(".ymaps").attr("id"));
            // }
            SimpleScrollbar.initAll();
        });
    });


    //call logout modal
    $(document).on("click", ".logout-modal", function () {
        openModal('.block-swipe__background-logout', '.block-swipe-logout');
    });

    $(document).on("click", ".pin-repeat-order", function () {
        $(".order_repeat_btn")[0].click();
    });

    // ПОДКЛЮЧЕНИЕ СВАЙПЕРА В СЕКЦИИ НА ЭКРАНАХ >= 1024
    if ($(window).width() >= 1024) {

        //ПОИСК
        const swiperRecently = new Swiper('.swiper-search', {
            speed: 700,
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: {
                nextEl: '.swiper-search-next',
                prevEl: '.swiper-search-prev',
            }
        });

        //ЛК - ЗАКАЗЫ
        const swiperOrders = new Swiper('.swiper-goods', {
            speed: 700,
            slidesPerView: 'auto',
            spaceBetween: 8,
            mousewheel: {
                invert: true,
            }
        });
    };

    //ПОДКЛЮЧЕНИЕ СВАЙПЕРА ТОЛЬКО НА МОБИЛКАХ, ПЛАНШЕТАХ
    if ($(window).width() < 1024) {
        //БЫСТРЫЙ ПРОСМОТР
        const swiperQuickView = new Swiper('.swiper-quck-view', {
            speed: 700,
            slidesPerView: 1,
            autoHeight: true,
            pagination: {
                el: '.quick-view-pagination',
                type: 'bullets',
            },
        });
    }
});