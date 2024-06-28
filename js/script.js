const rootStyles = getComputedStyle(document.documentElement);
const lightGrey = rootStyles.getPropertyValue("--light-grey").trim();
const smokeyGrey = rootStyles.getPropertyValue("--smokey-grey").trim();
const purple = rootStyles.getPropertyValue("--purple").trim();
const offBlack = rootStyles.getPropertyValue("--off-black").trim();
const submitBtn = document.getElementById("submit");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const allErrorMessages = document.querySelectorAll(".error-message");

function validateYear(year) {
  const currentYear = new Date().getFullYear();
  //   const leastYear = currentYear - 250;
  let isValid = true;
  if (year > currentYear) {
    allErrorMessages[2].textContent = "Must be in the past";
    allErrorMessages[2].style.display = "block";
    document.getElementById("year").style.border = "1px solid lightcoral";
    document.querySelector(".year").style.color = "lightcoral";
    isValid = false;
  }
  return isValid;
}

function validateMonth(month) {
  let isValid = true;
  if (month < 1 || month > 12) {
    allErrorMessages[1].textContent = "Must be a valid month";
    allErrorMessages[1].style.display = "block";
    document.getElementById("month").style.border = "1px solid lightcoral";
    document.querySelector(".month").style.color = "lightcoral";
    isValid = false;
  }
  return isValid;
}

function validateDay(year, month, day) {
  const daysInMonth = new Date(year, month, 0).getDate();
  let isValid = true;
  if (day < 1 || day > daysInMonth) {
    allErrorMessages[0].textContent = "Must be a valid date";
    allErrorMessages[0].style.display = "block";
    document.getElementById("day").style.border = "1px solid lightcoral";
    document.querySelector(".day").style.color = "lightcoral";
    isValid = false;
  }
  return isValid;
}

function clearErrorMessages() {
  allErrorMessages.forEach((message) => {
    message.textContent = "";
    message.style.display = "none";
  });
  document.getElementById("day").style.border = "1px solid" + " " + lightGrey;
  document.getElementById("month").style.border = "1px solid" + " " + lightGrey;
  document.getElementById("year").style.border = "1px solid" + " " + lightGrey;
  document.querySelector(".day").style.color = smokeyGrey;
  document.querySelector(".month").style.color = smokeyGrey;
  document.querySelector(".year").style.color = smokeyGrey;
}

function animation(element, start, end, duration) {
  // Calculate the range of the animation
  const range = end - start;

  // Set the current value to the start value
  let current = start;

  // Determine whether to increment or decrement the value
  const increment = end > start ? 1 : -1;

  // Calculate the time interval for each step
  const stepTime = Math.abs(Math.floor(duration / range));

  // Create a timer to update the value at each step
  const timer = setInterval(() => {
    // Increment or decrement the current value
    current += increment;

    // Update the text content of the element with the current value
    element.textContent = current;

    // Check if the current value has reached the end value
    if (current === end) {
      // Clear the timer to stop the animation
      clearInterval(timer);
    }
  }, stepTime);
}

function calculateAge(birthYear, birthMonth, birthDay) {
  // Validating inputs
  const isValidYear = validateYear(birthYear);
  const isValidMonth = validateMonth(birthMonth);
  const isValidDay = validateDay(birthYear, birthMonth, birthDay);

  if (!isValidYear || !isValidMonth || !isValidDay) {
    return;
  }

  // Getting the current year, month and day
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Calculating the birth year, month, and day
  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  // Adjusting for month overflow/underflow
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Adjusting for date overflow/underflow
  if (ageDays < 0) {
    ageMonths--;
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    ageDays += new Date(currentYear, currentMonth - 1, 0).getDate();
  }

  if (birthYear === currentYear) {
    document.querySelector(".year-birth").textContent = 0;
    if (birthMonth >= currentMonth) {
      document.querySelector(".birth-month").textContent = 0;
      if (birthDay === currentDay) {
        document.querySelector(".birth-day").textContent = 0;
      } else {
        animation(document.querySelector(".birth-day"), 0, ageDays, 1000);
      }
    } else {
      animation(document.querySelector(".birth-month"), 0, ageMonths, 1000);
      animation(document.querySelector(".birth-day"), 0, ageDays, 1000);
    }
  } else {
    animation(document.querySelector(".year-birth"), 0, ageYears, 1000);
  }
}

function calculatedAge() {
  const dayValue = day.value.trim();
  const monthValue = month.value.trim();
  const yearValue = year.value.trim();

  let inputtedValue = true;

  if (!dayValue) {
    allErrorMessages[0].textContent = "This field is required!";
    allErrorMessages[0].style.display = "block";
    document.getElementById("day").style.border = "1px solid lightcoral";
    document.querySelector(".day").style.color = "lightcoral";
    inputtedValue = false;
  }
  if (!monthValue) {
    allErrorMessages[1].textContent = "This field is required!";
    allErrorMessages[1].style.display = "block";
    document.getElementById("month").style.border = "1px solid lightcoral";
    document.querySelector(".month").style.color = "lightcoral";
    inputtedValue = false;
  }
  if (!yearValue) {
    allErrorMessages[2].textContent = "This field is required!";
    allErrorMessages[2].style.display = "block";
    document.getElementById("year").style.border = "1px solid lightcoral";
    document.querySelector(".year").style.color = "lightcoral";
    inputtedValue = false;
  }

  if (inputtedValue) {
    const dayNumber = Number(dayValue);
    const monthNumber = Number(monthValue);
    const yearNumber = Number(yearValue);

    calculateAge(yearNumber, monthNumber, dayNumber);
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearErrorMessages();
  calculatedAge();
});

submitBtn.addEventListener("mouseenter", () => {
  submitBtn.classList.add("hover-effect");
});

submitBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
  clearErrorMessages();
  calculatedAge();
  submitBtn.style.backgroundColor = offBlack;
  setTimeout(() => {
    submitBtn.style.backgroundColor = purple;
  }, 1000);
});
