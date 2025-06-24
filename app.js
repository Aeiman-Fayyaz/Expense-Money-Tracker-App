// Making variables

const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Local Storage variable
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction, getting text , amount and store balance
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Text and amount must be fulfill",
    });
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: Number(amount.value),
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

// Random ID generate
function generateId() {
  return Math.floor(Math.random() * 100000000);
}
// Function for getting data
function addTransactionDOM(transaction) {
  // amount + , -
  const sign = transaction.amount < 0 ? "-" : "+";
  // li creation
  const item = document.createElement("li");
  // Class Add
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  // Generating list item
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = "dlt-btn" onclick = "removeTransaction(${
      transaction.id
    })">X</button>
    `;

  list.appendChild(item);
}

// Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  updateLocalStorage();
  Init();
}

// Transactions saved in local Storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Update Values
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  // Saving values in one var and make a balance
  balance.innerText = `
    $${total}`;
  // Add amount
  moneyPlus.innerText = `
    $${income}`;
  // Minus amount
  moneyMinus.innerText = `
    $${expense}`;
}

// Init App (CLear innerText)
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
Init();
// addTransactionDOM(transactions);

// form
form.addEventListener("submit", addTransaction);
