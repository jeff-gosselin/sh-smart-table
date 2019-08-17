import tableData from './tableData.js'; // Imports the data for the table

// Store a copy of the imported data into an mutable variable
let theData = [...tableData];

// Creates functionality for Add/Delete Row and Add/Delete Column buttons
const rowPlus = document.getElementById('row-plus');
const rowMinus = document.getElementById('row-minus');
const colPlus = document.getElementById('col-plus');
const colMinus = document.getElementById('col-minus');

rowPlus.addEventListener('click', () => addRowMenu());
rowMinus.addEventListener('click', () => deleteRowMenu());
colPlus.addEventListener('click', () => addColumnMenu());
colMinus.addEventListener('click', () => deleteColumnMenu());

// Take imported data and create a table
renderTableHeaders(theData);
renderTableBody(theData);

// Initializes the direction of the sorted column
let sortState = false;

// Add eventListeners to all column header sort and filter icons
addEventListenersForSortAndFilter();

function addEventListenersForSortAndFilter() {
    const icons = document.querySelectorAll('i');

    for (let icon of icons) {
        if (icon.innerText === 'swap_vert') {
            icon.addEventListener('click', () => sortColumn(icon.dataset.id));
        } else {
            icon.addEventListener('click', () => filterColumnMenu(icon.dataset.id));
        }
    }
}

// Create table column headers
function renderTableHeaders(data) { 
    const thead = document.querySelector('#main-container thead');
    let trHead = thead.querySelector('tr');
    console.log(trHead);
    if (trHead === null) {
        trHead = document.createElement('tr');
        console.log("we in");
    } 
    
    const colHeaders = Object.keys(data[0]);
    trHead.innerHTML = '';
    for (let i = 0; i < colHeaders.length; i++) {
        trHead.innerHTML += `
            <th data-id="${colHeaders[i]}">
                <div class="options"></div>
                <div class="column-label" data-id="${colHeaders[i]}">
                    <span class="col-header">${colHeaders[i]}</span>
                    <div>
                        <i style="display: none" data-id="${colHeaders[i]}" class="material-icons">swap_vert</i>
                        <i style="display: none" data-id="${colHeaders[i]}" class="material-icons">filter_list</i>
                    </div>
                </div>
            </th>`;
    }

    // Add click fuctionality to headers (when clicked options window appears)
    let headers = trHead.querySelectorAll('th');
    let colLabels = document.querySelectorAll('.column-label');
    headers.forEach(e => e.addEventListener('click', (e) => showOptions(e.target.dataset.id)));
    colLabels.forEach(e => e.addEventListener('click', (e) => showOptions(e.target.dataset.id)));

    thead.appendChild(trHead);
}

function renderTableBody(data) {
    const tbody = document.querySelector('#main-container tbody');
    
    tbody.innerHTML = '';
   
    // Create the rest of the rows in the table body
    for (let i = 0; i < data.length; i++) { 
        let trBody = document.createElement('tr');
        for (let key in data[i]) {
            trBody.innerHTML += `<td>${data[i][key]}</td>`;
        }
        tbody.appendChild(trBody);
    }   
}

// Shows or hides the Options window that allows you to change the type of column (Sortable, Filterable, Sortable and Filterable, none)
function showOptions(id) { 
    const options = document.querySelector(`[data-id="${id}"] > .options`);
    options.innerHTML = `
        <div>
            <button data-id="${id}" class="col-btn">Sortable</button>    
        </div>
        <div>
            <button data-id="${id}" class="col-btn">Filterable</button> 
        </div>
    `;
    options.classList.toggle('show');
    let btns = options.querySelectorAll('button');
    btns[0].addEventListener('click', (e) => toggleSort(e));
    btns[1].addEventListener('click', (e) => toggleFilter(e));
}

// Shows or hides the sort icon for a specific column
function toggleSort(e) {
    const sortBtn = document.querySelectorAll(`i[data-id="${e.target.dataset.id}"]`)[0];
    if (sortBtn.style.display === 'none') {
        sortBtn.style.display = 'block';
    } else {
        sortBtn.style.display = 'none';
    }
}

// Shows or hides the filter icon for a specific column
function toggleFilter(e) {
    const filterBtn = document.querySelectorAll(`i[data-id="${e.target.dataset.id}"]`)[1];
    if (filterBtn.style.display === 'none') {
        filterBtn.style.display = 'block';
    } else {
        filterBtn.style.display = 'none';
    }
}

// Sorts the column data for either number values or string values
function sortColumn(columnLabel) {
    // find out the type of data in the column to choose a sort method
    let typeOfData = typeof theData[0][columnLabel];
    console.log(typeOfData);

    // switch the direction of the sort
    sortState = !sortState;

    // Execute the sort if a number
    if (typeOfData === 'number') {
        theData = theData.sort((a,b) => {
            return sortState ? a[columnLabel] - b[columnLabel] : b[columnLabel] - a[columnLabel];
        })
    }

    // Execute the sort if a string
    if (typeOfData === 'string') {
        theData = tableData.sort((a,b) => {
            if (a[columnLabel] > b[columnLabel]) {
                return sortState ? 1 : -1;
            } else {
                return sortState ? -1 : 1;
            }
        });
    }

    // Render the sorted body of the table
    renderTableBody(theData);
}

// Renders the Filter Menu with the column data
function filterColumnMenu(columnLabel) {
    let main = document.querySelector('#main-container');
    let filterMenu = document.createElement('div');
    let checklist = document.createElement('form');
    let h1 = document.createElement('h1');
    
    filterMenu.className = 'menu';
    checklist.className = 'checklist';
    h1.innerText = 'Filter Column';
    filterMenu.appendChild(h1);
    checklist.innerHTML = `<div><input id="all" type="checkbox" name="filter" checked><span>Select All</span></div>`;
    

    for (let i = 0; i <  theData.length; i++) {
        if (theData[i][columnLabel] !== '') {
            checklist.innerHTML += `<div><input type="checkbox" name="filter" value="${i}" checked><span>${theData[i][columnLabel]}</span></div>`;
        }    
    }


    checklist.innerHTML += `
        <div class="checklist-btns">
            <button class="cancel">Cancel</button>
            <button class="apply">Apply</button>
        </div>
    `;
    
    // Select All checkbox functionality
    let selectAll = checklist.querySelector('#all');
    selectAll.addEventListener('click', (e) => selectAllToggle(e));

    filterMenu.appendChild(checklist);
    main.appendChild(filterMenu);

    let cancel = document.querySelector('.cancel');
    let apply = document.querySelector('.apply');

    cancel.addEventListener('click', () => {
        filterMenu.style.display = 'none';
        filterMenu.innerHTML = '';
    });

    apply.addEventListener('click', (e) => filterTable(e, filterMenu));
}

// Depending on the state of the "Select All" checkbox a particular function is executed
function selectAllToggle(e) {
    if (e.target.checked) {
        selectAll();
    } else {
        unSelectAll();
    }
}

// Checks all checkboxes
function selectAll() {
    const checkboxes = document.getElementsByName('filter');
    for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
    }
}	

// Unchecks all checkboxes
function unSelectAll() {
    const checkboxes = document.getElementsByName('filter');
    for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
    }
}		

// Filters the table
function filterTable(e, filterMenu) {
    e.preventDefault();
    let result = e.target.form;
    let filteredData = [];
    
    // Removes unchecked rows from the table
    for (let elem of result.children) {
        if (elem.children[0].checked && elem.children[0].id !== 'all') {
            filteredData.push(theData[elem.children[0].value]);
        } 
    }
  
    renderTableBody(filteredData);    
    filterMenu.style.display = 'none';
    filterMenu.innerHTML = '';
}

// Add a row 
function addRowMenu() {
    let row = {};
    const modal = document.getElementById('modal');
    const h1 = modal.querySelector('h1');
    h1.innerText = 'Add a Row';
    const form = modal.querySelector('form');
    form.innerHTML = '';
    const colHeaders = Object.keys(theData[0]);

    for (let i = 0; i < colHeaders.length; i++) {
        form.innerHTML += `<input type="text" placeholder="${colHeaders[i]}">`
    }

    form.innerHTML += `
        <div id="add-row-btns" class="checklist-btns">
            <button class="cancel">Cancel</button>
            <button class="apply">Apply</button>
        </div>
    `;

    const cancel = document.querySelector('#add-row-btns > .cancel');
    const apply = document.querySelector('#add-row-btns > .apply');

    cancel.addEventListener('click', () => {
        modal.style.display = 'none';
        form.innerHTML = '';
    });

    apply.addEventListener('click', (e) => addRow(e, modal, colHeaders));

    modal.style.display = 'block';
}

function addRow(e, modal, colHeaders) {
    e.preventDefault()
    let row = {};
    let form = e.target.form;

    console.log(form.children);
    for (let i = 0; i < form.children.length - 1; i++) {
        if (form.children[i].value === undefined) {
            row[colHeaders[i]] = "";
        } else {
            row[colHeaders[i]] = form.children[i].value;
        }
    }

    theData.push(row);
    renderTableBody(theData);

    modal.style.display = 'none';
    form.innerHTML = '';
}

function deleteRow() {
    console.log("- row")
}

function addColumnMenu() {
    const modal = document.getElementById('modal');
    const h1 = modal.querySelector('h1');
    h1.innerText = 'Add a Column';
    const form = modal.querySelector('form');
    const colHeaders = Object.keys(theData[0]);
    form.innerHTML = '<input type="text" placeholder="Column Name">';

    for (let i = 0; i < theData.length; i++) {
        form.innerHTML += `<input type="text" placeholder="For ${colHeaders[0]}: ${theData[i][colHeaders[0]]} Row">`
    }

    form.innerHTML += `
        <div id="add-col-btns" class="checklist-btns">
            <button class="cancel">Cancel</button>
            <button class="apply">Apply</button>
        </div>
    `;

    const cancel = document.querySelector('#add-col-btns > .cancel');
    const apply = document.querySelector('#add-col-btns > .apply');

    cancel.addEventListener('click', () => {
        modal.style.display = 'none';
        form.innerHTML = '';
    });

    apply.addEventListener('click', (e) => addColumn(e, modal));

    modal.style.display = 'block';

}

function addColumn(e, modal) {
    console.log(e.target.form);
    e.preventDefault();
    let form = e.target.form;

    for (let i = 0; i < form.children.length - 2; i++) {
        console.log(form.children[i+1].value);
        if (form.children[0].value === undefined) {
            return () => {
                modal.style.display = 'none';
                form.innerHTML = '';
            };
        } else if (form.children[i]) {
            theData[i][form.children[0].value] = form.children[i+1].value;
        }
    }

    console.log(theData);
    renderTableHeaders(theData);
    renderTableBody(theData);
    modal.style.display = 'none';
    form.innerHTML = '';
}


function deleteRowMenu() {
    console.log("Delete row")
}

function deleteColumnMenu() {
    console.log("Delete column")
}