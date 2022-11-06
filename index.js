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
incomeSumDiv.textContent = `Suma Przychodów: ${incomeSumValue.amount} zł`;
expensesSumDiv.textContent = `Suma Wydatków: ${expensesSumValue.amount} zł`;

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
  if (parameter === "income") {
    for (let i = 0; i < incomeArr.length; i++) {
      const li = document.createElement("il");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const liMainDiv = document.createElement("div");
      const liSecondDiv = document.createElement("div");
      const buttonDiv = document.createElement("div");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");
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
      button1.setAttribute("onclick", "editItem(this, inc)");
      button1.id = `${[i]}`;
      button1.setAttribute("type", "button");
      button2.setAttribute("class", "btn btn-income-delete");
      button2.id = `${[i]}`;
      button2.setAttribute("type", "button");
      button2.setAttribute("onclick", "deleteItem(this, inc)");
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
      button2.textContent = "Usuń";
    }
  } else {
    for (let i = 0; i < expensesArr.length; i++) {
      const li = document.createElement("il");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const liMainDiv = document.createElement("div");
      p1.setAttribute("class", "list-p");
      p2.setAttribute("class", "list-p");
      const liSecondDiv = document.createElement("div");
      const buttonDiv = document.createElement("div");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");
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
      button1.setAttribute("onclick", "editItem(this, expe)");
      button2.setAttribute("class", "btn btn-expenses-delete");
      button2.id = `${[i]}`;
      button2.setAttribute("type", "button");
      button2.setAttribute("onclick", "deleteItem(this, expe)");
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
      button2.textContent = "Usuń";
    }
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

    incomeSumDiv.textContent = `Suma Przychodów: ${incomeSumValue.amount.toFixed(2)} zł`;

  } else {

    if (expensesArr < 1) {
      expensesSumValue.amount = 0;
    } else {
      expensesSumValue = expensesArr.reduce((previousValue, currentValue) => {
        return { amount: previousValue.amount + currentValue.amount };
      });
    }

    expensesSumDiv.textContent = `Suma Wydatków: ${expensesSumValue.amount.toFixed(2)} zł`;

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

  return incexpSumValue;
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
  const index = elem.id;
  const newValue = await customPrompt();

  if (parameter === "income") {
    if (newValue.name === "" && newValue.amount === 0) {
      incomeArr[index].name = incomeArr[index].name;
      incomeArr[index].amount = incomeArr[index].amount;
    } else if (newValue.name !== "" && newValue.amount === 0) {
      incomeArr[index].name = newValue.name;
      incomeArr[index].amount = incomeArr[index].amount;
    } else if (newValue.name === "" && newValue.amount !== 0) {
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
  } else {
    if (newValue.name === "" && newValue.amount === 0) {
      expensesArr[index].name = expensesArr[index].name;
      expensesArr[index].amount = expensesArr[index].amount;
    } else if (newValue.name !== "" && newValue.amount === 0) {
      expensesArr[index].name = newValue.name;
      expensesArr[index].amount = expensesArr[index].amount;
    } else if (newValue.name === "" && newValue.amount !== 0) {
      expensesArr[index].name = expensesArr[index].name;
      const checkIfNaN = newValue.amount;
      if (isNaN(checkIfNaN)) checkIfNaN = 0;
      expensesArr[index].amount = checkIfNaN;
    } else {
      expensesArr[index].name = newValue.name;
      const checkIfNaN = newValue.amount;
      if (isNaN(checkIfNaN)) checkIfNaN = 0;
      expensesArr[index].amount = checkIfNaN;
    }
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
