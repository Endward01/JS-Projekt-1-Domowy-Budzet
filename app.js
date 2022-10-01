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

incomeAddBtn.addEventListener("click", insertIncomeObjToArr);
expensesAddBtn.addEventListener("click", insertExpensesObjToArr);
incomeSumDiv.textContent =
  "Suma Przychodów:" + " " + `${incomeSumValue.amount}` + "zł";
incomeSumDiv.setAttribute("class", "h5");
expensesSumDiv.textContent =
  "Suma Wydadków:" + " " + `${expensesSumValue.amount}` + "zł";
expensesSumDiv.setAttribute("class", "h5");

// enter input to the arr as an object

function insertIncomeObjToArr() {
  let checkIfNaN = incomeAmount.valueAsNumber;
  if (isNaN(checkIfNaN)) checkIfNaN = 0;
  let incomeObj = {
    name: incomeText.value,
    amount: checkIfNaN,
  };
  incomeArr.push(incomeObj);
  removeAllIncomeChildNodes();
  addIncomeItem();
  incomeSum();
  sumIncExp();
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
  removeAllExpensesChildNodes();
  addExpensesItem();
  expensesSum();
  sumIncExp();
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

// append list item to the html body

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
      "expenses-list-group-item list-group-item d-flex justify-content-between align-items-start"
    );
    li.id = `${[i]}`;
    liMainDiv.setAttribute("class", "ms-2 me-auto");
    p1.setAttribute("class", "list-p");
    p2.setAttribute("class", "list-p");
    // p1.setAttribute("contenteditable", "true");
    liSecondDiv.setAttribute("class", "fw-bold");
    // p2.setAttribute("contenteditable", "true");
    buttonDiv.setAttribute("class", "btn-group");
    buttonDiv.setAttribute("role", "group");
    button1.setAttribute("class", "btn btn-edit");
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
    p2.textContent = incomeArr[i].amount+" "+"PLN";
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
      "expenses-list-group-item list-group-item d-flex justify-content-between align-items-start"
    );
    li.id = `${[i]}`;
    liMainDiv.setAttribute("class", "ms-2 me-auto");
    liSecondDiv.setAttribute("class", "fw-bold");
    buttonDiv.setAttribute("class", "btn-group");
    buttonDiv.setAttribute("role", "group");
    button1.setAttribute("class", "btn btn-edit");
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
    p2.textContent = expensesArr[i].amount+" "+"PLN";
    li.appendChild(buttonDiv);
    buttonDiv.appendChild(button1);
    button1.appendChild(document.createTextNode("Edytuj"));
    buttonDiv.appendChild(button2);
    button2.appendChild(document.createTextNode("Usun"));
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
    "Suma Przychodów:" + " " + `${incomeSumValue.amount}` + "zł";
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
    "Suma Wydadków:" + " " + `${expensesSumValue.amount}` + "zł";
}
function sumIncExp() {
  incexpSumValue = incomeSumValue.amount - expensesSumValue.amount;

  if (incexpSumValue > 0) {
    incexpSum.textContent =
      "Możesz jeszcze wydać" + " " + `${incexpSumValue}` + " " + "złotych";
  } else if (incexpSumValue < 0) {
    incexpSum.textContent =
      "Bilans jest ujemny. Jesteś na minusie" +
      " " +
      `${incexpSumValue}` +
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

function editIncome(elem) {
  let index = elem.id;
  incomeArr[index].name = prompt("Wrowadz nowa Nazwe");
  let checkIfNaN = Number(window.prompt("Wrowadz nowa Kwote"));
  if (isNaN(checkIfNaN)) checkIfNaN = 0;
  incomeArr[index].amount = checkIfNaN;
  removeAllIncomeChildNodes();
  addIncomeItem();
  incomeSum();
  sumIncExp();
}
function editExpenses(elem) {
  let index = elem.id;
  expensesArr[index].name = prompt("Wrowadz nowa Nazwe");
  let checkIfNaN = Number(window.prompt("Wrowadz nowa Kwote"));;
  if (isNaN(checkIfNaN)) checkIfNaN = 0;
  expensesArr[index].amount = checkIfNaN;
  removeAllExpensesChildNodes();
  addExpensesItem();
  expensesSum();
  sumIncExp();
}