# Smart Table
The table is populated from the data coming from the file tableData.js
Initially each column doesn't have sortability or filterability.

- Click on a table column header (dont click on the text inside the header but around it) for a small window to appear. If you were to click on the column header again the window disappears. It is a toggle. The window contains a sortable and filterable toggle button for that column. If you click on one of the toggle buttons in that window an icon will then appear (or disappear depending on its current state) in the header. Now you can click on the icon in the header to either sort a column or to open up a window to filter the column.

- Above the table are 2 boxes. One is for adding/deleting rows and the other for adding/deleting columns. 

(Unfortunately I did not have time to add functionality for deleting rows or columns, but adding rows and columns works. If you hit the delete button for either row or column it just console.logs).

