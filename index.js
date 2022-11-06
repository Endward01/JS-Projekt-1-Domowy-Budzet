const incomeText = document.querySelector(".income-text");
const incomeAmount = document.querySelector(".income-amount");
const incomeList = document.querySelector(".income-list-group");
const incomeAddBtn = document.querySelector(".btn-income-add");
const incomeSumDiv = document.querySelector(".income-sum");

const expensesText = document.querySelector(".expenses-text");
const expensesAmount = document.querySelector(".expenses-amount");
const expensesList = document.querySelector(".expenses-list-group");
const expensesAddBtn = document.querySelector(".btn-expenses-add");
const expensesSumDiv = document.querySelector(".expenses-sum");

const incexpSum = document.querySelector(".incexpSum");
const allAmountInputs = document.querySelectorAll(".input-amount");

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

const inc = "income";
const expe = "expenses";

incomeAddBtn.addEventListener("click", () => appendItem(inc));
expensesAddBtn.addEventListener("click", () => appendItem(expe));

// append list item
function appendItem(parameter) {
  insertObjToArr(parameter);
  removeAllChildNodes(parameter);
  addItem(parameter);
  clearValue(parameter);
  sum(parameter);
}

//block unwanted value in input
allAmountInputs.forEach((e) => {
  e.addEventListener("keypress", (e) => {
    if (!(e.charCode > 45 && e.charCode < 58)) {
      e.preventDefault();
    }
  });
});

// enter input to the arr as an object
function insertObjToArr(parameter) {
  const inputValueText = document.querySelector(`.${parameter}-text`);
  const inputValueAmount = document.querySelector(`.${parameter}-amount`);

  let checkIfNaN = inputValueAmount.valueAsNumber;
  if (isNaN(checkIfNaN)) checkIfNaN = 0;

  const objectToArr = {
    name: inputValueText.value,
    amount: checkIfNaN,
  };

  if (parameter === "income") {
    incomeArr.push(objectToArr);
    return incomeArr;
  } else {
    expensesArr.push(objectToArr);
    return expensesArr;
  }
}

// delete all list items
function removeAllChildNodes(parameter) {
  const list = document.querySelector(`.${parameter}-list-group`);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// create list item
function addItem(parameter) {
  let arrToAddItem;

  if (parameter === "income") {
    arrToAddItem = incomeArr;
  } else {
    arrToAddItem = expensesArr;
  }

  for (let i = 0; i < arrToAddItem.length; i++) {
    const li = document.createElement("il");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const liMainDiv = document.createElement("div");
    const liSecondDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    li.id = `${[i]}`;
    liMainDiv.classList.add("ms-2", "me-auto");
    p1.classList.add("list-p");
    p1.textContent = arrToAddItem[i].name;
    p2.classList.add("list-p");
    p2.textContent = arrToAddItem[i].amount.toFixed(2) + " " + "PLN";
    liSecondDiv.classList.add("fw-bold");
    buttonDiv.setAttribute("class", "btn-group");
    buttonDiv.setAttribute("role", "group");
    button1.id = `${[i]}`;
    button1.setAttribute("type", "button");
    button1.classList.add("btn");
    if (parameter === "income") {
      button1.setAttribute("onclick", "editItem(this, inc)");
    } else {
      button1.setAttribute("onclick", "editItem(this, expe)");
    }
    button2.id = `${[i]}`;
    button2.setAttribute("type", "button");
    button2.classList.add("btn");
    if (parameter === "income") {
      button2.setAttribute("onclick", "deleteItem(this, inc)");
    } else {
      button2.setAttribute("onclick", "deleteItem(this, expe)");
    }
    if (parameter === "income") {
      incomeList.appendChild(li);
    } else {
      expensesList.appendChild(li);
    }
    li.appendChild(liMainDiv);
    liMainDiv.appendChild(liSecondDiv);
    liSecondDiv.appendChild(p1);
    liMainDiv.appendChild(p2);
    li.appendChild(buttonDiv);
    buttonDiv.appendChild(button1);
    button1.textContent = "Edytuj";
    buttonDiv.appendChild(button2);
    button2.textContent = "Usuń";
  }
}

// sum amount of income and expenses and their value subtracted
function sum(parameter) {
  if (parameter === "income") {
    if (incomeArr < 1) {
      incomeSumValue.amount = 0;
    } else {
      incomeSumValue = incomeArr.reduce((previousValue, currentValue) => {
        return { amount: previousValue.amount + currentValue.amount };
      });
    }

    incomeSumDiv.textContent = `Suma Przychodów: ${incomeSumValue.amount.toFixed(
      2
    )} zł`;
  } else {
    if (expensesArr < 1) {
      expensesSumValue.amount = 0;
    } else {
      expensesSumValue = expensesArr.reduce((previousValue, currentValue) => {
        return { amount: previousValue.amount + currentValue.amount };
      });
    }

    expensesSumDiv.textContent = `Suma Wydatków: ${expensesSumValue.amount.toFixed(
      2
    )} zł`;
  }

  incexpSumValue = incomeSumValue.amount - expensesSumValue.amount;

  if (incexpSumValue > 0) {
    incexpSum.textContent = `Możesz jeszcze wydać ${incexpSumValue.toFixed(
      2
    )} złotych`;
  } else if (incexpSumValue < 0) {
    incexpSum.textContent = `Bilans jest ujemny. Jesteś na minusie ${incexpSumValue.toFixed(
      2
    )} złotych`;
  } else {
    incexpSum.textContent = "Bilans wynosi zero.";
  }
}

// clear value input after enter
function clearValue(parameter) {
  const inputValueText = document.querySelector(`.${parameter}-text`);
  const inputValueAmount = document.querySelector(`.${parameter}-amount`);

  inputValueText.value = "";
  inputValueAmount.value = "";
}
function clearValuePromp() {
  document.querySelector(".custom-prompt-input-1").value = "";
  document.querySelector(".custom-prompt-input-2").value = "";
}

// delete selected list item and sync list to new value
function deleteItem(elem, parameter) {
  const index = elem.id;

  if (parameter === "income") {
    incomeArr.splice(index, 1);
  } else {
    expensesArr.splice(index, 1);
  }

  removeAllChildNodes(parameter);
  addItem(parameter);
  sum(parameter);
}

// edit selected list item and sync list to new value
async function editItem(elem, parameter) {
  const newValue = await customPrompt();
  let arrToEdit;

  if (parameter === "income") {
    arrToEdit = incomeArr[elem.id];
  } else {
    arrToEdit = expensesArr[elem.id];
  }
  if (newValue.name === "" && newValue.amount === 0) {
    arrToEdit.name = arrToEdit.name;
    arrToEdit.amount = arrToEdit.amount;
  } else if (newValue.name !== "" && newValue.amount === 0) {
    arrToEdit.name = newValue.name;
    arrToEdit.amount = arrToEdit.amount;
  } else if (newValue.name === "" && newValue.amount !== 0) {
    arrToEdit.name = arrToEdit.name;
    const checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    arrToEdit.amount = checkIfNaN;
  } else {
    arrToEdit.name = newValue.name;
    const checkIfNaN = newValue.amount;
    if (isNaN(checkIfNaN)) checkIfNaN = 0;
    arrToEdit.amount = checkIfNaN;
  }
  removeAllChildNodes(parameter);
  addItem(parameter);
  sum(parameter);
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
