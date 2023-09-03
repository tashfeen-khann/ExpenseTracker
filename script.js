const addBtn = document.querySelector('.addBtn');
const ThirdDiv = document.querySelector('.ThirdDiv');
const amount = document.querySelector('.amount');
const desc = document.querySelector('.desc');
const listUl = document.querySelector('.listUl');
const BalanceData = document.querySelector('.SecondDivh2');
const ExpanseAmout = document.querySelector('.ExpanseAmout');
const IncomeAmount = document.querySelector('.IncomeAmount');
const resetBalanceBtn = document.querySelector('.resetBalanceBtn'); // Assuming you have a button with this class

// Function to load data from local storage
function loadStoredData() {
    const storedBalance = localStorage.getItem('Balance');
    const storedExpanceAmt = localStorage.getItem('ExpanceAmt');
    const storedIncomeAmt = localStorage.getItem('IncomeAmt');
    const storedTransactions = localStorage.getItem('Transactions');

    if (storedBalance) {
        Balance = parseFloat(storedBalance);
        BalanceData.innerHTML = `Balance: $ ${Balance}`;
    }

    if (storedExpanceAmt) {
        ExpanceAmt = parseFloat(storedExpanceAmt);
        ExpanseAmout.innerHTML = `$${ExpanceAmt}`;
    }

    if (storedIncomeAmt) {
        IncomeAmt = parseFloat(storedIncomeAmt);
        IncomeAmount.innerHTML = `$${IncomeAmt}`;
    }

    if (storedTransactions) {
        listUl.innerHTML = storedTransactions;
    }
}

// Call the load function when the page is loaded or refreshed
window.addEventListener('load', loadStoredData);

addBtn.addEventListener('click', () => {
    if (addBtn.innerHTML === 'Add') {
        ThirdDiv.style.transition = 'ease';
        ThirdDiv.style.visibility = 'visible';
        ThirdDiv.style.height = '200px';
        addBtn.innerHTML = 'Cancel';
    } else {
        ThirdDiv.style.visibility = 'hidden';
        ThirdDiv.style.height = '0px';
        addBtn.innerHTML = 'Add';
    }
});

let Balance = 0;
let ExpanceAmt = 0;
let IncomeAmt = 0;

function resetData() {
    Balance = 0;
    ExpanceAmt = 0;
    IncomeAmt = 0;
    BalanceData.innerHTML = `Balance: $ ${Balance}`;
    ExpanseAmout.innerHTML = `$${ExpanceAmt}`;
    IncomeAmount.innerHTML = `$${IncomeAmt}`;
    listUl.innerHTML = '';

    // Clear data from local storage
    localStorage.removeItem('Balance');
    localStorage.removeItem('ExpanceAmt');
    localStorage.removeItem('IncomeAmt');
    localStorage.removeItem('Transactions');
}

resetBalanceBtn.addEventListener('click', resetData);

function onAddData() {
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');

    if (amount.value === '') {
        alert("Please enter the amount to proceed...");
    } else if (desc.value === '') {
        alert("Please enter the description of the amount...");
    } else {
        if (option1.checked) {
            CurAmout = amount.value;
            CurDesc = desc.value;

            let li = document.createElement('li');
            li.innerHTML = `${CurDesc} : ${CurAmout}`;
            li.style.borderColor = 'red';
            listUl.appendChild(li);

            Balance = Number(Balance) - Number(CurAmout);
            BalanceData.innerHTML = `Balance: $ ${Balance}`;

            ExpanceAmt = Number(ExpanceAmt) + Number(CurAmout);
            ExpanseAmout.innerHTML = `$${ExpanceAmt}`;

            amount.value = '';
            desc.value = '';
            option1.checked = false;
        } else if (option2.checked) {
            CurAmout = amount.value;
            CurDesc = desc.value;

            let li = document.createElement('li');
            li.innerHTML = `${CurDesc} : ${CurAmout}`;
            li.style.borderBlockColor = 'green';
            listUl.appendChild(li);

            Balance = Number(Balance) + Number(CurAmout);
            BalanceData.innerHTML = `Balance: $ ${Balance}`;

            IncomeAmt = Number(IncomeAmt) + Number(CurAmout);
            IncomeAmount.innerHTML = `$${IncomeAmt}`;
            amount.value = '';
            desc.value = '';
            option2.checked = false;
        } else {
            alert('Pick any category to add');
        }

        // Save data to local storage
        localStorage.setItem('Balance', Balance.toString());
        localStorage.setItem('ExpanceAmt', ExpanceAmt.toString());
        localStorage.setItem('IncomeAmt', IncomeAmt.toString());
        localStorage.setItem('Transactions', listUl.innerHTML);
    }
}
