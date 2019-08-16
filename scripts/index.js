import tableData from './tableData.js'; // Imports the data for the table

// Take imported data and create a table
renderTable(tableData);

// Add eventListeners to all column header sort and filter icons
addEventListenersForSortAndFilter();

function addEventListenersForSortAndFilter() {
    const icons = document.querySelectorAll('i');

    for (let icon of icons) {
        if (icon.innerText === 'swap_vert') {
            icon.addEventListener('click', () => sortColumn(icon.dataset.id));
        } else {
            icon.addEventListener('click', () => filterColumn(icon.dataset.id));
        }
    }
}


function renderTable(data) {
    const thead = document.querySelector('#main-container thead');
    const tbody = document.querySelector('#main-container tbody');
    const trHead = document.createElement('tr');
   
    console.log(thead, tbody);
    // Create table column headers
    const colHeaders = Object.keys(data[0]);
    for (let i = 0; i < colHeaders.length; i++) {
        trHead.innerHTML += `
            <th data-id="${colHeaders[i]}">
                <div class="options"></div>
                <div>
                    <span class="col-header">${colHeaders[i]}</span>
                    <div>
                        <i style="display: none" data-id="${colHeaders[i]}" class="material-icons">swap_vert</i>
                        <i style="display: none" data-id="${colHeaders[i]}" class="material-icons">filter_list</i>
                    </div>
                </div>
            </th>`;
    }
    thead.appendChild(trHead);

    // Add click fuctionality to headers so when clicked options window appears
    let headers = trHead.querySelectorAll('th');
    headers.forEach(e => e.addEventListener('click', (e) => showOptions(e.target.dataset.id)));

    // Create the rest of the rows in the table body
    for (let i = 0; i < data.length; i++) { 
        let trBody = document.createElement('tr');
        for (let key in data[i]) {
            trBody.innerHTML += `<td>${data[i][key]}</td>`;
        }
        tbody.appendChild(trBody);
    }   

}



function showOptions(id) { 
    const options = document.querySelector(`[data-id="${id}"] .options`);
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

function toggleSort(e) {
    const sortBtn = document.querySelectorAll(`i[data-id="${e.target.dataset.id}"]`)[0];
    if (sortBtn.style.display === 'none') {
        sortBtn.style.display = 'block';
    } else {
        sortBtn.style.display = 'none';
    }
}

function toggleFilter(e) {
    const filterBtn = document.querySelectorAll(`i[data-id="${e.target.dataset.id}"]`)[1];
    if (filterBtn.style.display === 'none') {
        filterBtn.style.display = 'block';
    } else {
        filterBtn.style.display = 'none';
    }
}

function sortColumn(columnName) {
    // find out the type of data in the column to choose a sort method
    let typeOfData = typeof tableData[0][columnName];
    console.log(typeOfData);

    // switch the direction of the sort
    
}

function filterColumn(columnName) {
    console.log("filtered!", columnName);
}