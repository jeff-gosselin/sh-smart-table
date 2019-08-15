import tableData from './tableData.js';

// Take imported data and create a table
const renderTable = (data) => {
    const thead = document.querySelector('#main-container thead');
    const tbody = document.querySelector('#main-container tbody');
    const trHead = document.createElement('tr');
   
    console.log(thead, tbody);
    // Create table column headers
    const colHeaders = Object.keys(data[0]);
    for (let header of colHeaders) {
        trHead.innerHTML += `
            <th>
                ${header}
                <i class="material-icons">swap_vert</i>
                <i class="material-icons">filter_list</i>
            </th>`;
    }
    thead.appendChild(trHead);

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