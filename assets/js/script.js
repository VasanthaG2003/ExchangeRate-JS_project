const currencyE1_one = document.getElementById("currency-one");
const amountE1_one = document.getElementById("amount-one");
const currencyE1_two = document.getElementById("currency-two");
const amountE1_two = document.getElementById("amount-two");
const rateE1 = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
    const currency_one = currencyE1_one.value;
    const currency_two = currencyE1_two.value;

    fetch("https://open.exchangerate-api.com/v6/latest")
     .then((res) => res.json())
     .then((data) => {
        console.log(data);

        const rate = data.rates[currency_two] / data.rates[currency_one];
        rateE1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountE1_two.value = (amountE1_one.value * rate).toFixed(2);
     })
     .catch((error) => {
        console.log(message);
     })
}

// EVENT LISTENER
currencyE1_one.addEventListener("change", calculate);
amountE1_one.addEventListener("input", calculate);
currencyE1_two.addEventListener("change", calculate);
amountE1_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
    const temp = currencyE1_one.value;
    currencyE1_one.value = currencyE1_two.value;
    currencyE1_two.value = temp;

    calculate();
});

calculate();