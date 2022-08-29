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

    })

    //ДОБАВИТЬ В ИЗБРАННОЕ
    $(document).on('click', '.tiles__item-heart', function () {
        $(this).toggleClass('active');
    });

    //ПО СВАЙПУ УБРАТЬ POP-UP
    $(document).on("click", ".filters__mobile-btn", function () {
        $(".block-swipe").addClass("active");
        $(".block-swipe__background").addClass("active");
        $("html").addClass("scroll-hidden");
    });


    let touchstartY = 0;
    let touchendY = 0;

    function checkDirection() {
        if (touchendY > touchstartY) {
            $(".block-swipe").removeClass("active");
            $(".block-swipe__background").removeClass("active");
            $("html").removeClass("scroll-hidden");
        }
    }

    document.querySelector('.block-swipe__btn').addEventListener('touchstart', e => {
        touchstartY = e.changedTouches[0].screenY;
    });

    document.querySelector('.block-swipe__btn').addEventListener('touchend', e => {
        touchendY = e.changedTouches[0].screenY;
        checkDirection();
    });

    $(document).mouseup(function (e) {
        let container = $(".block-swipe");
        if (container.hasClass('active') && container.has(e.target).length === 0) {
            $(".block-swipe").removeClass("active");
            $(".block-swipe__background").removeClass("active");
            $("html").removeClass("scroll-hidden");
        }
    });

    //НАПОЛНЕНИЕ ФИЛЬТРОВ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА
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
                        <a class="filters__item letter-spacing filters__item-js ${index === 0 ? "active" : ""}" href="javascript:void(0)">${$(item).text()}</a>
                    `;
                    $(".filters__items").append(htmlLink);
                } else if (index === linksNum) {
                    const html = `
                        <div class="filters__dots">
                            <svg>
                                <use xlink:href="img/icons/sprite.svg#dots"></use>
                            </svg>
                            <div class="filters__dots-window-wrapper">
                                <div class="filters__dots-window">
                                </div>
                            </div>
                        </div>
                    `;
                    $(".filters__items").append(html);
                }

                if (index + 1 > linksNum) {
                    htmlLink = `
                        <a href="javascript:void(0)"
                        class="filters__dots-window-item letter-spacing filters__item-js">${$(item).text()}</a>
                    `;
                    $(".filters__dots-window").append(htmlLink);
                }

            });
        }
    }
});