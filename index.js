function displayInfo(){
    fetch('http://localhost:3000/display',{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        var table = document.getElementById('info_table');
        emptyTable(table);
        for(var i = 0;i < 8;i++){
            console.log(data.recordset[i])
            insertRowIntoTable(data.recordset[i]);
        }
    });
}
document.getElementById("myBtn").addEventListener("click", displayInfo());

function insertRowIntoTable(data){ 
    var table = document.getElementById('info_table');
    var tr = document.createElement('tr');
    let tableHtml = "<tr>"; 
    tableHtml += `<th>${data.Id}</th>`;
    tableHtml += `<th>${data.Username}</th>`;
    tableHtml += `<th>${data.Password}</th>`;
    tableHtml += `<th> <button data-id="${data.Id}" class="delete">Delete</button> <button data-id="${data.Id}" class="update">Update</button> </th>`;
    tableHtml += "</tr>";
    tr.innerHTML = tableHtml;
    table.appendChild(tr);
}

function emptyTable(table){
    let tableHtml = "<tr>";
    tableHtml += `<th>ID</th>`;
    tableHtml += `<th>Username</th>`;
    tableHtml += `<th>Password</th>`;
    tableHtml += `<th>Options</th>`;
    tableHtml += "</tr>";
    table.innerHTML = tableHtml;
}
document.getElementById('info_table').addEventListener('click', function(event) {
    if (event.target.className === "delete") {
        deleteRowById(event.target.dataset.id);
    }
});

function deleteRowById(id){
    fetch('http://localhost:3000/delete/' ,{
        method: 'POST',
        body: JSON.parse(id)
    })
    .then(response => response.json())
    .then(data => { if (data.success) {
        displayInfo();
    }})
}