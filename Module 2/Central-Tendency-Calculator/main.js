const lowInput = document.getElementById('low-value');
const highInput = document.getElementById('high-value');
const numberInput = document.getElementById('number-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const statusMessage = document.getElementById('status-message');
const meanResult = document.getElementById('mean-result');
const medianResult = document.getElementById('median-result');
const modeResult = document.getElementById('mode-result');
const numbersList = document.getElementById('numbers-list');

let numberList = [];

function updateStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "red" : "green";
}

function getMode(values) {
    if (values.length === 0) {
        return "None";
    }

    const counts = {};

    for (const value of values) {
        counts[value] = (counts[value] || 0) + 1;
    }

    let highestCount = 0;
    let modes = [];

    for (const value in counts) {
        const count = counts[value];
        if (count > highestCount) {
            highestCount = count;
            modes = [Number(value)];
        } else if (count === highestCount) {
            modes.push(Number(value));
        }
    }

    if (modes.length === 1) {
        return modes[0].toString();
    }

    return modes.join(", ");
}

function updateResults() {
    if (numberList.length === 0) {
        meanResult.textContent = "0";
        medianResult.textContent = "0";
        modeResult.textContent = "None";
        numbersList.textContent = "None";
        return;
    }

    const total = numberList.reduce((sum, value) => sum + value, 0);
    const mean = total / numberList.length;

    const sorted = [...numberList].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    let median;

    if (sorted.length % 2 === 0) {
        median = (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
        median = sorted[middle];
    }

    const mode = getMode(numberList);

    meanResult.textContent = mean.toFixed(2);
    medianResult.textContent = median.toFixed(2);
    modeResult.textContent = mode;
    numbersList.textContent = sorted.join(", ");
}

function validateAndAdd() {
    const lowValue = parseFloat(lowInput.value);
    const highValue = parseFloat(highInput.value);
    const newNumber = parseFloat(numberInput.value);

    if (isNaN(lowValue) || isNaN(highValue)) {
        updateStatus("Please enter both a low and high value.", true);
        return;
    }

    if (lowValue > highValue) {
        updateStatus("The low value must be less than or equal to the high value.", true);
        return;
    }

    if (isNaN(newNumber)) {
        updateStatus("Please enter a valid number to add.", true);
        return;
    }

    if (newNumber < lowValue || newNumber > highValue) {
        updateStatus("The number must fall within the selected range.", true);
        return;
    }

    numberList.push(newNumber);
    numberInput.value = "";
    updateStatus("Number added successfully.");
    updateResults();
}

function clearNumbers() {
    numberList = [];
    lowInput.value = '';
    highInput.value = '';
    numberInput.value = '';
    updateStatus("List cleared.");
    updateResults();
}

addButton.addEventListener('click', validateAndAdd);
clearButton.addEventListener('click', clearNumbers);
numberInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateAndAdd();
    }
});

updateResults();
