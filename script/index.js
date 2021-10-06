"use strict";
// live date
const nightAway = new Date(new Date());
const date = nightAway.getDate();
const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][nightAway.getMonth()];

document.querySelector(".date").innerHTML = `${date}<sup>${nth(
  date
)}</sup> ${month} ${nightAway.getFullYear()}`;

// change currency rates

let initialCurrency = document.querySelector(".initial");
let finalCurrency = document.querySelector(".final");
let exchangeAmount = document.querySelector(".amount");
let number = document.getElementById("num");
let swap = document.getElementById("swap");
function calculate() {
  curOne = initialCurrency.value;
  curTwo = finalCurrency.value;

  axios
    .get(
      `https://v6.exchangerate-api.com/v6/a1bb03ea1dbec62445ef99d6/latest/${curOne}`
    )
    .then((dataOut) => {
      let rates = dataOut.data.conversion_rates[curTwo];
      let amount = (number.value * rates).toFixed(2);
      exchangeAmount.textContent = amount;
    })
    .catch((err) => {
      console.log(err);
    });
}
let curOne = initialCurrency.addEventListener("change", calculate);
let curTwo = finalCurrency.addEventListener("change", calculate);
number.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = initialCurrency.value;
  initialCurrency.value = finalCurrency.value;
  finalCurrency.value = temp;
  calculate();
});
calculate();
