var body = document.querySelector("body");

if(body.classList.contains("index-page")) {
    var indexSlider = document.querySelector(".index-slider");
    var indexSliderLabel01 = indexSlider.querySelector("label[for=slider-main-01]");
    var indexSliderLabel02 = indexSlider.querySelector("label[for=slider-main-02]");
    var indexSliderLabel03 = indexSlider.querySelector("label[for=slider-main-03]");
    var indexSliderTitles = indexSlider.querySelector(".index-slider-titles");
    var indexSliderFirstTitle = indexSliderTitles.querySelector(".first-title");
    var indexSliderSecondTitle = indexSliderTitles.querySelector(".second-title");
    var indexSliderThirdTitle = indexSliderTitles.querySelector(".third-title");

    var overlay = document.querySelector(".overlay");

    var feedbackFrame = document.querySelector(".feedback-frame");
    var feedbackFrameOpen = document.querySelector("#open-feedback-frame");
    var feedbackFrameClose = feedbackFrame.querySelector(".x-button");
    var feedbackForm = feedbackFrame.querySelector("form");
    var feedbackName = feedbackForm.querySelector("input[name=feedback-name]");
    var feedbackEmail = feedbackForm.querySelector("input[name=feedback-email]");
    var feedbackMessage = feedbackForm.querySelector("textarea[name=feedback-message]");
    var storageName = localStorage.getItem("name");
    var storageEmail = localStorage.getItem("email");
}

var headerCart = document.querySelector(".header-cart");
var icecreams = document.querySelector(".icecreams");
var icecreamsLinks = icecreams.querySelectorAll(".icecream-link");
var icecreamsRemove = headerCart.querySelectorAll(".cart-item .x-button");
var icecream01link = icecreams.querySelector("[data-icecream='01'] .icecream-link");
var icecream01inCart = headerCart.querySelector("[data-icecream='01']");
var icecream01remove = headerCart.querySelector("[data-icecream='01'] .x-button");
var icecream03link = icecreams.querySelector("[data-icecream='03'] .icecream-link");
var icecream03inCart = headerCart.querySelector("[data-icecream='03']");
var icecream03remove = headerCart.querySelector("[data-icecream='03'] .x-button");
var cartCounter = 0;

// SLIDER

if(body.classList.contains("index-page")) {
    indexSliderLabel01.addEventListener("click", function (event) {
        body.classList.add("first-slide");
        body.classList.remove("second-slide");
        body.classList.remove("third-slide");

        indexSliderFirstTitle.classList.remove("hidden");
        indexSliderSecondTitle.classList.add("hidden");
        indexSliderThirdTitle.classList.add("hidden");
    });

    indexSliderLabel02.addEventListener("click", function (event) {
        body.classList.remove("first-slide");
        body.classList.add("second-slide");
        body.classList.remove("third-slide");

        indexSliderFirstTitle.classList.add("hidden");
        indexSliderSecondTitle.classList.remove("hidden");
        indexSliderThirdTitle.classList.add("hidden");
    });

    indexSliderLabel03.addEventListener("click", function (event) {
        body.classList.remove("first-slide");
        body.classList.remove("second-slide");
        body.classList.add("third-slide");

        indexSliderFirstTitle.classList.add("hidden");
        indexSliderSecondTitle.classList.add("hidden");
        indexSliderThirdTitle.classList.remove("hidden");
    });
}

// ICECREAM     ADD TO CART / REMOVE FROM CART

icecream01link.addEventListener("click", function (event) {
    icecream01inCart.classList.add("in-cart");
})

icecream01remove.addEventListener("click", function (event) {
    icecream01inCart.classList.remove("in-cart");
});

icecream03link.addEventListener("click", function (event) {
    icecream03inCart.classList.add("in-cart");
})

icecream03remove.addEventListener("click", function (event) {
    icecream03inCart.classList.remove("in-cart");
});

for (var i = 0; i < icecreamsLinks.length; i++) {
    icecreamsLinks[i].addEventListener("click", function (event) {
        event.preventDefault();
        cartCounter++;
        headerCart.classList.add("have-items");
        if(cartCounter === 1) {
            headerCart.querySelector(".cart").innerHTML = "1 товар";
        } else if(cartCounter < 5) {
            headerCart.querySelector(".cart").innerHTML = cartCounter + " товара";
        } else {
            headerCart.querySelector(".cart").innerHTML = cartCounter + " товаров";
        }
    })
}

for (var i = 0; i < icecreamsRemove.length; i++) {
    icecreamsRemove[i].addEventListener("click", function (event) {
        event.preventDefault();
        cartCounter--;
        if(cartCounter <= 0) {
            headerCart.classList.remove("have-items");
            headerCart.querySelector(".cart").innerHTML = "Пусто";
        } else if(cartCounter === 1) {
            headerCart.querySelector(".cart").innerHTML = "1 товар";
        } else if(cartCounter < 5) {
            headerCart.querySelector(".cart").innerHTML = cartCounter + " товара";
        } else {
            headerCart.querySelector(".cart").innerHTML = cartCounter + " товаров";
        }
    })
}

// FEEDBACK FRAME

if(body.classList.contains("index-page")) {
    feedbackFrameOpen.addEventListener("click", function (event) {
        event.preventDefault();
        feedbackFrame.classList.add("opened");
        overlay.classList.add("opened");
        if (storageName) {
            feedbackName.value = storageName;
            if (storageEmail) {
                feedbackEmail.value = storageEmail;
                feedbackMessage.focus();
            } else {
                feedbackEmail.focus();
            }
        } else {
            feedbackName.focus();
        }
        feedbackFrame.classList.remove("feedback-frame-error");
    });


    feedbackFrameClose.addEventListener("click", function (event) {
        event.preventDefault();
        feedbackFrame.classList.remove("opened");
        overlay.classList.remove("opened");
    })

    overlay.addEventListener("click", function (event) {
        event.preventDefault();
        feedbackFrame.classList.remove("opened");
        overlay.classList.remove("opened");
    });

    feedbackForm.addEventListener("submit", function (event) {
        if (!feedbackName || !feedbackEmail || !feedbackMessage) {
            event.preventDefault();
            feedbackFrame.classList.add("feedback-frame-error");
        } else {
            localStorage.setItem("name", feedbackName.value);
            localStorage.setItem("email", feedbackEmail.value);
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
            if (feedbackFrame.classList.contains("opened") || overlay.classList.contains("overlay-opened")) {
                feedbackFrame.classList.remove("opened");
                overlay.classList.remove("opened");
            }
        }
    });
}

// INDEX MAP

if(body.classList.contains("index-page")) {
    ymaps.ready(init);
    var indexMap,
        indexMapMarker;

    function init() {
        indexMap = new ymaps.Map("index-map", {
            center: [59.93925050, 30.32780413],
            zoom: 16,
            controls: []
        });

        indexMapMarker = new ymaps.Placemark(
            [59.93865025, 30.32301907], {}, {
                iconLayout: "default#image",
                iconImageHref: "img/map-marker.png",
                iconImageSize: [218, 142],
                iconImageOffset: [-45, -135]
            });

        indexMap.geoObjects.add(indexMapMarker);
        // indexMap.behaviors.disable('scrollZoom');
    }
}
