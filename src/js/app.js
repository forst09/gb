'use strict';

$(document).ready(function () {
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
    $(document).on('input', '.header .search-input', function () {
        $(this).parents('.search-wrapper').find('.input-submit').addClass('active');
        if ($(this).val() == '') {
            $(this).parents('.search-wrapper').find('.input-submit').removeClass('active');
        }
    });

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
    $(document).on('focusout', '.form-input', function () {
        if ($(this).val() == '') {
            $(this).parents('.input-wrapper').find('.label-transform').removeClass('active');
        }
        $(this).parents('.input-wrapper').removeClass('active');
    });

    //TRIGGER CLICK ПО КНОПКЕ СОХРАНИТЬ ИЗМЕНЕНИЯ НА МОБИЛКАХ НАЖАТЬ НА ИНПУТ САБМИТ В СТРАНИЦЕ ЛИЧНЫЕ ДАННЫЕ
    $(document).on('click', '.pin-save .btn-text', function () {
        $('.personal-data__save .btn-text').trigger('click');
    });

    //ДОБАВИТЬ В ИЗБРАННОЕ
    $(document).on('click', '.tiles__item-heart', function () {
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

    //ОТКРЫТЬ ВСПЛЫВАШКУ ФИЛЬТРОВ
    $(document).on("click", ".filters__mobile-btn", function () {
        $(".block-swipe-filters").addClass("active");
        $(".block-swipe__background-filters").addClass("active");
        $("html").addClass("scroll-hidden");
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ ОБРАТНОЙ СВЯЗИ
    $(document).on("click", ".footer__sosials-feedback", function () {
        $(".block-swipe-feedback").addClass("active");
        $(".block-swipe__background-feedback").addClass("active");
        $("html").addClass("scroll-hidden");
    });

    //ОТКРЫТЬ ВСПЛЫВАШКУ С ВЫБОРОМ ГОРОДА
    $(document).on("click", ".place", function () {
        $(".block-swipe__background-city").addClass("active");
        $(".block-swipe-city").addClass("active");
        $("html").addClass("scroll-hidden");
    });

    if ($('.block-swipe__background').hasClass('active')) {
        $("html").addClass("scroll-hidden");
    }

    //ЗАКРЫТЬ КУКИ 
    let cookieBtnClose = document.querySelector(".cookie .btn-text");
    if (cookieBtnClose != null) {
        cookieBtnClose.addEventListener("click", function (e) {
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

    //ЗАКРЫТЬ ВСПЛЫВАШКУ ПО КЛИКУ НА ФОН
    $(document).mouseup(function (e) {
        let container = $(".block-swipe");
        if (container.hasClass('active') && container.has(e.target).length === 0) {
            $(".block-swipe").removeClass("active");
            $(".block-swipe__background").removeClass("active");
            $("html").removeClass("scroll-hidden");
        }
    });

    //ЗАКРЫТЬ ВСПЛЫВАШКУ ВЫБОРА ГОРОДА ПО КЛИКУ НА КНОПКУ ДА, ВЕРНО
    $(document).on('click', '.block-swipe-city .btn-text--orange', function () {
        $(".block-swipe-city").removeClass("active");
        $(".block-swipe__background-city").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ПО КЛИКУ НА ПАЛОЧКУ ЗАКРЫТЬ ВСПЛЫВАШКУ
    $(document).on('click', '.block-swipe__btn', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ПО КЛИКУ НА КРЕСТИК ЗАКРЫТЬ МОДАЛКУ
    $(document).on('click', '.modal-close', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ЗАКРЫТЬ МОДАЛКУ ВЫЙТИ ИЗ ПРОФИЛЯ ПО КЛИКУ НА ДА
    $(document).on('click', '.block-swipe-logout .btn-text--orange', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ЗАКРЫТЬ МОДАЛКУ ВЫЙТИ ИЗ ПРОФИЛЯ ПО КЛИКУ НА НЕТ
    $(document).on('click', '.block-swipe-logout .btn-text--gray', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ЗАКРЫТЬ МОДАЛКУ СБРОС КОРЗИНЫ ПО КЛИКУ НА ОТМЕНА
    $(document).on('click', '.block-swipe-cart-cancel .btn-text--gray', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ЗАКРЫТЬ МОДАЛКУ СБРОС КОРЗИНЫ ПО КЛИКУ НА ПРОДОЛЖИТЬ
    $(document).on('click', '.block-swipe-logout .btn-text--orange', function () {
        $(".block-swipe").removeClass("active");
        $(".block-swipe__background").removeClass("active");
        $("html").removeClass("scroll-hidden");
    });

    //ПО КНОПКЕ ДОБАВИТЬ ПОКАЗАТЬ ВМЕСТО НЕЕ СЧЕТЧИК
    $(document).on('click', '.btn-add', function () {
        $(this).addClass('hide');
        $(this).parents('.card__btns').find('.card__btns-count').removeClass('hide');
        $('.cart__notification').addClass('active');
        setTimeout(function () {
            $('.cart__notification').removeClass('active');
        }, 2000);
    });

    //УМЕНЬШИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', '.card__btns-count-btn--minus', function () {
        let val = $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val();
        if (val == 1) {
            $(this).parents('.card__btns').find('.card__btns-count').addClass('hide');
            $(this).parents('.card__btns').find('.btn-add').removeClass('hide');
        }
        else {
            $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val(--val);
        }
    });

    //УВЕЛИЧИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', '.card__btns-count-btn--plus', function () {
        let val = $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val();
        $(this).parents('.card__btns-count-wrapper').find('.card__btns-count-value').val(++val);
    });

    //НАПОЛНЕНИЕ ФИЛЬТРОВ НА ГЛАВНОЙ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА
    if ($(".filters").length !== 0) {
        const linksArr = [...$(".filters__item")];
        let linksNum;
        if ($(window).width() >= 1024 && $(window).width() <= 1499) linksNum = 5;
        if ($(window).width() >= 1500) linksNum = 8;
        if (linksArr.length > linksNum) {
            $.map(linksArr, function (item, index) {
                $(item).remove();
                let htmlLink;
                if (index < linksNum) {
                    htmlLink = `
                <a class= "filters__item letter-spacing filters__item-js ${index === 0 ? "active" : ""}" href = "javascript:void(0)" > ${$(item).text()}</>
                `;
                    $(".filters__items").append(htmlLink);
                } else if (index === linksNum) {
                    const html = `
            <div class= "filters__dots">
                            <svg>
                                <use xlink:href="img/icons/sprite.svg#dots"></use>
                            </svg>
                            <div class="filters__dots-window-wrapper">
                                <div class="filters__dots-window filters__dots-window-js">
                                </div>
                            </div>
                        </div>
                `;
                    $(".filters__items").append(html);
                }

                if (index + 1 > linksNum) {
                    htmlLink = `
                <a href = "javascript:void(0)" class= "filters__dots-window-item letter-spacing filters__item-js" > ${$(item).text()}</>
            `;
                    $(".filters__dots-window-js").append(htmlLink);
                }

            });
        }
    }

    //НАПОЛНЕНИЕ ФИЛЬТРОВ НА ГЛАВНОЙ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА
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
                                <use xlink:href="img/icons/sprite.svg#dots"></use>
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

    console.log($('iframe'));

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
                // let wrapper = document.createElement('div');
                // let content = document.createElement('div');
                // wrapper.classList.add('scroll');
                // content.classList.add('scroll-content');
                // let parent = table.parentNode
                // parent.replaceChild(wrapper, table)
                // content.appendChild(table)
                // wrapper.appendChild(content)
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
                                iconImageHref: "img/icons/map-geo.svg",
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
                                iconImageHref: "img/icons/map-plug.svg",
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
                                iconImageHref: "img/icons/map-dot.svg",
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
                                iconImageHref: "img/icons/map-store.svg",
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
                                iconImageHref: "img/logos/gb-logo-map.svg",
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
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=<ваш API-ключ>";
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

    console.log($('.icon-map'));
    // const ajax = new XMLHttpRequest();
    // ajax.open("GET", "img/icons/sprite.svg", true);
    // ajax.send();
    // ajax.onload = function (e) {
    //     let div = document.createElement("div");
    //     div.innerHTML = ajax.responseText;
    //     document.body.insertBefore(div, document.body.childNodes[0]);
    // }

    $(document).on("click", ".view-btn__item", function () {
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

            //reinit js functions
            if (typeof ymaps !== "undefined") {
                renderMap();
            } else {
                creatMapsScript($(data).find(".ymaps").attr("id"));
            }
            SimpleScrollbar.initAll();
        });
    });
});