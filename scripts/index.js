import tableData from './tableData.js';


// Take imported data and create a table
const renderTable = (data) => {
    const thead = document.querySelector('#main-container thead');
    const tbody = document.querySelector('#main-container tbody');
    const trHead = document.createElement('tr');
   
    console.log(thead, tbody);
    // Create table column headers
    const colHeaders = Object.keys(data[0]);
    for (let i = 0; i < colHeaders.length; i++) {
        trHead.innerHTML += `
            <th data-id="header-${i+1}">
                <div class="options">
                    
                </div>

                <div>
                    <span class="col-header">${colHeaders[i]}</span>
                    <div>
                        <i class="material-icons">swap_vert</i>
                        <i class="material-icons">filter_list</i>
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

renderTable(tableData);

function showOptions(id) { 
    const options = document.querySelector(`[data-id="${id}"] .options`);
    // options.innerHTML = `
    //     <div></div>
    
    // `;
    options.classList.toggle('show');
}