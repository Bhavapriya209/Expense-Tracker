let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transactionForm");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const type = document.getElementById("type");

const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("netBalance");
const listEl = document.getElementById("transactionList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTxn = {
    description: description.value,
    amount: +amount.value,
    category: category.value,
    type: type.value,
  };

  transactions.push(newTxn);
  description.value = "";
  amount.value = "";
  updateUI();
});

function updateUI() {
  listEl.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((txn, i) => {
    const li = document.createElement("li");
    li.className = txn.type;
    li.innerHTML = `
      ${txn.description} - ₹${txn.amount} <small>(${txn.category})</small>
      <button onclick="removeTxn(${i})" style="float:right;">❌</button>
    `;
    listEl.appendChild(li);

    txn.type === "income" ? income += txn.amount : expense += txn.amount;
  });

  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = income - expense;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTxn(index) {
  transactions.splice(index, 1);
  updateUI();
}

updateUI();
