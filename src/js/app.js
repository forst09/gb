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


    $(document).on("click", ".filters__mobile-btn", function () {
        $(".block").removeClass("swiped");
        $("html").addClass("scroll-hidden");
    })


    let touchstartY = 0;
    let touchendY = 0;

    function checkDirection() {
        if (touchendY > touchstartY) {
            $(".block").addClass("swiped");
            $("html").removeClass("scroll-hidden");
        }
    }

    document.querySelector('.block').addEventListener('touchstart', e => {
        touchstartY = e.changedTouches[0].screenY;
    })

    document.querySelector('.block').addEventListener('touchend', e => {
        touchendY = e.changedTouches[0].screenY;
        checkDirection();
    })
});