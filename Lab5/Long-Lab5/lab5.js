"use strict";

const $ = selector => document.querySelector(selector);

const imageCache = [];
let imageCounter = 0;
let timer = null;
let countdownTimer = null;
let countdownCounter = 0;
let image = null;
let timerValue = 0;

const mainImage = $("#main_image");   // the img element for the show
const caption = $("#caption");        // the h2 element for the caption

const runSlideShow = () => {
    setCountdownTimer();
    imageCounter = (imageCounter + 1) % imageCache.length;
    image = imageCache[imageCounter];
    mainImage.src = image.src;
    mainImage.alt = image.alt;
    caption.textContent = image.alt;
    document.getElementById("countdown").innerHTML = timerValue;
};
function setCountdownTimer() {
    if (countdownTimer != null) {
        clearInterval(countdownTimer);
    }
    countdownCounter = timerValue;
    countdownTimer = setInterval(function () {
        countdownCounter -= 1;
        document.getElementById("countdown").innerHTML = countdownCounter;
    }, 1000);
}
function startSlideTimer() {
    timerValue = document.getElementById("timerVal").value;
    if (!isNaN(timerValue)) {
        if (timer != null) {
            clearInterval(timer);
            clearInterval(countdownTimer);
        }
        setCountdownTimer();
        timer = setInterval(runSlideShow, timerValue * 1000);
        $("#start").disabled = true;
        $("#pause").disabled = false;
    }
    else {
        alert("Is not a number");
        document.getElementById("timerVal").focus();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const links = $("#image_list").querySelectorAll("a");

    // process image links
    for (let link of links) {
        // Preload image and copy title properties
        image = new Image();
        image.src = link.href;
        image.alt = link.title;

        // add image to array 
        imageCache[imageCache.length] = image;
    }
    // set initial image
    mainImage.src = imageCache[0].src;
    mainImage.alt = imageCache[0].href;
    caption.textContent = imageCache[0].alt;
    document.getElementById("countdown").innerHTML = document.getElementById("timerVal").value;

    // attach start, pause, and change event handlers
    $("#start").addEventListener("click", () => {
        startSlideTimer();
    });
    $("#pause").addEventListener("click", () => {
        clearInterval(timer);
        clearInterval(countdownTimer);
        $("#start").disabled = false;
        $("#pause").disabled = true;
    });

    $("#timerVal").addEventListener("change", () => {
        startSlideTimer();
    });
});

