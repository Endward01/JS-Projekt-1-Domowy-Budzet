const incomeText = document.querySelector(".income-text");
const incomeAmount = document.querySelector(".income-amount");
const incomeList = document.querySelector(".income-list-group");
const incomeAddBtn = document.querySelector(".btn-income-add");
const listElementIncome = document.querySelector(".income-list-group-item");
const incomeSumDiv = document.querySelector(".income-sum");

const expensesText = document.querySelector(".expenses-text");
const expensesAmount = document.querySelector(".expenses-amount");
const expensesList = document.querySelector(".expenses-list-group");
const expensesAddBtn = document.querySelector(".btn-expenses-add");
const listElementExpenses = document.querySelector(".expenses-list-group-item");
const expensesSumDiv = document.querySelector(".expenses-sum");

const incexpSum = document.querySelector(".incexpSum");

//core values

let incomeArr = [];
let expensesArr = [];
let incomeSumValue = {
  amount: 0,
};
let expensesSumValue = {
  amount: 0,
};
let incexpSumValue = 0;

incomeAddBtn.addEventListener("click", appendIncomeItem);
expensesAddBtn.addEventListener("click", appendExpensesItem);
incomeSumDiv.textContent =
  "Suma Przychodów:" + " " + `${incomeSumValue.amount}` + "zł";
incomeSumDiv.setAttribute("class", "h5");
expensesSumDiv.textContent =
  "Suma Wydadków:" + " " + `${expensesSumValue.amount}` + "zł";
expensesSumDiv.setAttribute("class", "h5");

// append list item

function appendIncomeItem() {
  insertIncomeObjToArr();
  removeAllIncomeChildNodes();
  addIncomeItem();
  clearValueInn();
  incomeSum();
  sumIncExp();
}
function appendExpensesItem() {
  insertExpensesObjToArr();
  removeAllExpensesChildNodes();
  addExpensesItem();
  clearValueExp();
  expensesSum();
  sumIncExp();
}

// enter input to the arr as an object

function insertIncomeObjToArr() {
  let checkIfNaN = incomeAmount.valueAsNumber;
  if (isNaN(checkIfNaN)) checkIfNaN = 0;
  let incomeObj = {
    name: incomeText.value,
    amount: checkIfNaN,
  };
  incomeArr.push(incomeObj);
  return incomeArr;
}
function insertExpensesObjToArr() {
  let checkIfNaN = expensesAmount.valueAsNumber;
  if (isNaN(checkIfNaN)) checkIfNaN = 0;
  let expensesObj = {
    name: expensesText.value,
    amount: checkIfNaN,
  };
  expensesArr.push(expensesObj);
  return expensesArr;
}

// delete all list items

function removeAllIncomeChildNodes() {
  while (incomeList.firstChild) {
    incomeList.removeChild(incomeList.firstChild);
  }
}
function removeAllExpensesChildNodes() {
  while (expensesList.firstChild) {
    expensesList.removeChild(expensesList.firstChild);
  }
}

// create list item

function addIncomeItem() {
  for (let i = 0; i < incomeArr.length; i++) {
    let li = document.createElement("il");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let liMainDiv = document.createElement("div");
    let liSecondDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    li.setAttribute(
      "class",
      "expenses-list-group-item list-group-item d-flex justify-content-between align-items-center"
    );
    li.id = `${[i]}`;
    liMainDiv.setAttribute("class", "ms-2 me-auto");
    p1.setAttribute("class", "list-p");
    p2.setAttribute("class", "list-p");
    liSecondDiv.setAttribute("class", "fw-bold");
    buttonDiv.setAttribute("class", "btn-group");
    buttonDiv.setAttribute("role", "group");
    button1.setAttribute("class", "btn btn-income-edit");
    button1.setAttribute("onclick", "editIncome(this)");
    button1.id = `${[i]}`;
    button1.setAttribute("type", "button");
    button2.setAttribute("class", "btn btn-income-delete");
    button2.id = `${[i]}`;
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "deleteIncome(this)");
    incomeList.appendChild(li);
    li.appendChild(liMainDiv);
    liMainDiv.appendChild(liSecondDiv);
    liSecondDiv.appendChild(p1);
    liMainDiv.appendChild(p2);
    p1.textContent = incomeArr[i].name;
    p2.textContent = incomeArr[i].amount.toFixed(2) + " " + "PLN";
    li.appendChild(buttonDiv);
    buttonDiv.appendChild(button1);
    button1.textContent = "Edytuj";
    buttonDiv.appendChild(button2);
    button2.textContent = "Usun";
  }
}
function addExpensesItem() {
  for (let i = 0; i < expensesArr.length; i++) {
    let li = document.createElement("il");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let liMainDiv = document.createElement("div");
    p1.setAttribute("class", "list-p");
    p2.setAttribute("class", "list-p");
    let liSecondDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    li.setAttribute(
      "class",
      "expenses-list-group-item list-group-item d-flex justify-content-between align-items-center"
    );
    li.id = `${[i]}`;
    liMainDiv.setAttribute("class", "ms-2 me-auto");
    liSecondDiv.setAttribute("class", "fw-bold");
    buttonDiv.setAttribute("class", "btn-group");
    buttonDiv.setAttribute("role", "group");
    button1.setAttribute("class", "btn btn-expenses-edit");
    button1.id = `${[i]}`;
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "editExpenses(this)");
    button2.setAttribute("class", "btn btn-expenses-delete");
    button2.id = `${[i]}`;
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "deleteExpenses(this)");
    expensesList.appendChild(li);
    li.appendChild(liMainDiv);
    liMainDiv.appendChild(liSecondDiv);
    liSecondDiv.appendChild(p1);
    liMainDiv.appendChild(p2);
    p1.textContent = expensesArr[i].name;
    p2.textContent = expensesArr[i].amount.toFixed(2) + " " + "PLN";
    li.appendChild(buttonDiv);
    buttonDiv.appendChild(button1);
    button1.textContent = "Edytuj";
    buttonDiv.appendChild(button2);
    button2.textContent = "Usun";
  }
}

// sum amount of income and expenses and their value subtracted

function incomeSum() {
  if (incomeArr < 1) {
    incomeSumValue.amount = 0;
  } else {
    incomeSumValue = incomeArr.reduce((previousValue, currentValue) => {
      return { amount: previousValue.amount + currentValue.amount };
    });
  }
  incomeSumDiv.textContent =
    "Suma Przychodów:" + " " + `${incomeSumValue.amount.toFixed(2)}` + "zł";
}
function expensesSum() {
  if (expensesArr < 1) {
    expensesSumValue.amount = 0;
  } else {
    expensesSumValue = expensesArr.reduce((previousValue, currentValue) => {
      return { amount: previousValue.amount + currentValue.amount };
    });
  }

  expensesSumDiv.textContent =
    "Suma Wydadków:" + " " + `${expensesSumValue.amount.toFixed(2)}` + "zł";
}
function sumIncExp() {
  incexpSumValue = incomeSumValue.amount - expensesSumValue.amount;

  if (incexpSumValue > 0) {
    incexpSum.textContent =
      "Możesz jeszcze wydać" +
      " " +
      `${incexpSumValue.toFixed(2)}` +
      " " +
      "złotych";
  } else if (incexpSumValue < 0) {
    incexpSum.textContent =
      "Bilans jest ujemny. Jesteś na minusie" +
      " " +
      `${incexpSumValue.toFixed(2)}` +
      " " +
      "złotych";
  } else {
    incexpSum.textContent = "Bilans wynosi zero";
  }
  return incexpSumValue;
}

// delete selected list item and sync list to new value

function deleteIncome(elem) {
  let index = elem.id;
  incomeArr.splice(index, 1);
  removeAllIncomeChildNodes();
  addIncomeItem();
  incomeSum();
  sumIncExp();
}
function deleteExpenses(elem) {
  let index = elem.id;
  expensesArr.splice(index, 1);
  removeAllExpensesChildNodes();
  addExpensesItem();
  expensesSum();
  sumIncExp();
}

// edit selected list item and sync list to new value

async function editIncome(elem) {
  let index = elem.id;
  newValue = {
    name: 0,
    amount: 0,
  };
  await customPrompt();
  if (newValue.name == "" && newValue.amount == 0) {
    incomeArr[index].name = incomeArr[index].name;
    incomeArr[index].amount = incomeArr[index].amount;
  } else if (newValue.name != "" && newValue.amount == 0) {
    incomeArr[index].name = newValue.name;
    incomeArr[index].amount = incomeArr[index].amount;
  } else if (newValue.name == "" && newValue.amount != 0) {
    incomeArr[index].name = incomeArr[index].name;
    let checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    incomeArr[index].amount = checkIfNaN;
  } else {
    incomeArr[index].name = newValue.name;
    let checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    incomeArr[index].amount = checkIfNaN;
  }
  removeAllIncomeChildNodes();
  addIncomeItem();
  incomeSum();
  sumIncExp();
}
async function editExpenses(elem) {
  let index = elem.id;
  newValue = {
    name: 0,
    amount: 0,
  };
  await customPrompt();
  if (newValue.name == "" && newValue.amount == 0) {
    expensesArr[index].name = expensesArr[index].name;
    expensesArr[index].amount = expensesArr[index].amount;
  } else if (newValue.name != "" && newValue.amount == 0) {
    expensesArr[index].name = newValue.name;
    expensesArr[index].amount = expensesArr[index].amount;
  } else if (newValue.name == "" && newValue.amount != 0) {
    expensesArr[index].name = expensesArr[index].name;
    let checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    expensesArr[index].amount = checkIfNaN;
  } else {
    expensesArr[index].name = newValue.name;
    let checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    expensesArr[index].amount = checkIfNaN;
  }
  removeAllExpensesChildNodes();
  addExpensesItem();
  expensesSum();
  sumIncExp();
}

// custom prompt

function customPrompt() {
  document.querySelector(".custom-prompt").classList.remove("hidden");
  document.querySelector(".custom-prompt").classList.add("flex");
  return new Promise((resolve) => {
    document.querySelector(".custom-prompt-button").onclick = () => {
      let checkIfNaN = document.querySelector(
        ".custom-prompt-input-2"
      ).valueAsNumber;
      if (isNaN(checkIfNaN)) checkIfNaN = 0;
      resolve(
        (newValue = {
          name: document.querySelector(".custom-prompt-input-1").value,
          amount: checkIfNaN,
        })
      );
      document.querySelector(".custom-prompt").classList.add("hidden");
      document.querySelector(".custom-prompt").classList.remove("flex");
      clearValuePromp();
    };
  });
}

// clear value input after enter

function clearValueInn() {
  incomeText.value = "";
  incomeAmount.value = "";
}
function clearValueExp() {
  expensesText.value = "";
  expensesAmount.value = "";
}
function clearValuePromp() {
  document.querySelector(".custom-prompt-input-1").value = "";
  document.querySelector(".custom-prompt-input-2").value = "";
}
