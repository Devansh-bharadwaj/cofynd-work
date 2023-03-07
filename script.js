function animate(obj, initVal, lastVal, duration) {
  let startTime = null;

  //get the current timestamp and assign it to the currentTime variable
  let currentTime = Date.now();

  //pass the current timestamp to the step function
  const step = (currentTime) => {
    //if the start time is null, assign the current time to startTime
    if (!startTime) {
      startTime = currentTime;
    }

    //calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTime - startTime) / duration, 1);

    //calculate what to be displayed using the value gotten above
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

    //checking to make sure the counter does not exceed the last value (lastVal)
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };
  //start animating
  window.requestAnimationFrame(step);
}
let text1 = document.getElementById("0101");
let text2 = document.getElementById("0102");
let text3 = document.getElementById("0103");
let text4 = document.getElementById("0104");
const load = () => {
  animate(text1, 0, 98, 7000);
  animate(text2, 0, 65, 7000);
  animate(text3, 0, 10, 7000);
  animate(text4, 0, 15, 7000);
};

var testim = document.getElementById("testim"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
// Testim Script
function playSlide(slide) {
  for (var k = 0; k < testimDots.length; k++) {
    testimContent[k].classList.remove("active");
    testimContent[k].classList.remove("inactive");
    testimDots[k].classList.remove("active");
  }

  if (slide < 0) {
    slide = currentSlide = testimContent.length - 1;
  }

  if (slide > testimContent.length - 1) {
    slide = currentSlide = 0;
  }

  if (currentActive != currentSlide) {
    testimContent[currentActive].classList.add("inactive");
  }
  testimContent[slide].classList.add("active");
  testimDots[slide].classList.add("active");

  currentActive = currentSlide;

  clearTimeout(testimTimer);
  testimTimer = setTimeout(function () {
    playSlide((currentSlide += 1));
  }, testimSpeed);
}

testimLeftArrow.addEventListener("click", function () {
  playSlide((currentSlide -= 1));
});

testimRightArrow.addEventListener("click", function () {
  playSlide((currentSlide += 1));
});

for (var l = 0; l < testimDots.length; l++) {
  testimDots[l].addEventListener("click", function () {
    playSlide((currentSlide = testimDots.indexOf(this)));
  });
}

playSlide(currentSlide);

// keyboard shortcuts
document.addEventListener("keyup", function (e) {
  switch (e.keyCode) {
    case 37:
      testimLeftArrow.click();
      break;

    case 39:
      testimRightArrow.click();
      break;

    case 39:
      testimRightArrow.click();
      break;

    default:
      break;
  }
});

testim.addEventListener("touchstart", function (e) {
  touchStartPos = e.changedTouches[0].clientX;
});

testim.addEventListener("touchend", function (e) {
  touchEndPos = e.changedTouches[0].clientX;

  touchPosDiff = touchStartPos - touchEndPos;

//   console.log(touchPosDiff);
//   console.log(touchStartPos);
//   console.log(touchEndPos);

  if (touchPosDiff > 0 + ignoreTouch) {
    testimLeftArrow.click();
  } else if (touchPosDiff < 0 - ignoreTouch) {
    testimRightArrow.click();
  } else {
    return;
  }
});

// current year in footer
var myYear = new Date().getFullYear();
document.getElementById('current-year').innerHTML = myYear;