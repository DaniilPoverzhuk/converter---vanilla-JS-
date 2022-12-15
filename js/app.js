const listCurrenciesLeft = document.querySelectorAll(
  ".converter__currencies-item.left"
);
const listCurrenciesRight = document.querySelectorAll(
  ".converter__currencies-item.right"
);

const URL = "https://api.apilayer.com/exchangerates_data/convert";
const API = "ggKgHUJu39et5pDrGX6EzVCXDsIXF67A";

const inputLeft = document.querySelector(".converter__input input.left");
const inputRight = document.querySelector(".converter__input input.right");

let type = "";
let value = "";
const currencies = [];

inputLeft.addEventListener("input", getValue);
inputRight.addEventListener("input", getValue);

function currenciesTabs(...args) {
  args.forEach((item) => {
    item.forEach((btn) => {
      btn.addEventListener("click", () => {
        item.forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");
        if (type && value && currencies.length) {
          fetchData([...updateTabs()], type, value);
        }
      });
    });
  });
}

async function fetchData(currencies, type, value) {
  type === "left" ? ([from, to] = currencies) : ([to, from] = currencies);

  const myHeaders = new Headers();
  myHeaders.append("apikey", API);

  const requestOptions = {
    headers: myHeaders,
  };

  fetch(`${URL}?to=${to}&from=${from}&amount=${value}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      type === "left"
        ? (inputRight.value = data.result)
        : (inputLeft.value = data.result);
    })
    .catch((error) => console.log("error", error));
}

async function getValue() {
  type = this.classList[0];
  value = this.value;

  currencies.push(...updateTabs());

  fetchData(currencies, type, value);
}

function updateTabs() {
  const activeCurrencyBtnLeft = Array.from(listCurrenciesLeft).filter((btn) =>
    btn.classList.contains("active")
  )[0];
  const activeCurrencyBtnRight = Array.from(listCurrenciesRight).filter((btn) =>
    btn.classList.contains("active")
  )[0];

  return [
    activeCurrencyBtnLeft.textContent,
    activeCurrencyBtnRight.textContent,
  ];
}

function swapValues() {}

currenciesTabs(listCurrenciesLeft, listCurrenciesRight);
