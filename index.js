//addEventListeners
document.getElementById("myBtn").addEventListener("click", displayInfo);
document.getElementById("addBtn").addEventListener("click", userValidation);
document.getElementById("loginForm").addEventListener("submit", handleFormSubmit);
let input = document.querySelectorAll("input");

input.forEach(element =>element.addEventListener('input', evt => {
    const value = element.value
    const trimmed = value.trim()
  
    if (trimmed) {
        element.dataset.state = 'valid';
    } else {
        element.dataset.state = 'invalid';
        infoCheck = false;
    }
}));

document.getElementById('info_table').addEventListener('click', function(event) {
    if (event.target.className === "delete") {
        deleteRowById(event.target.dataset.id);
    }
});
//displayFetch
function displayInfo(){
    fetch('http://localhost:3000/display',{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        var table = document.getElementById('info_table');
        emptyTable(table);
        let count = Object.keys(data.recordset).length;
        for(var i = 0;i < count;i++){
            console.log(data.recordset[i])
            insertRowIntoTable(data.recordset[i]);
        }
    });
}
//editTable
function insertRowIntoTable(data){ 
    var table = document.getElementById('info_table');
    var tr = document.createElement('tr');
    if (typeof data.Id !== 'undefined'){
        let tableHtml = "<tr>"; 
        tableHtml += `<th>${data.Id}</th>`;
        tableHtml += `<th>${data.Username}</th>`;
        tableHtml += `<th>${data.Password}</th>`;
        tableHtml += `<th> <button data-id="${data.Id}" class="delete">Delete</button> <button data-id="${data.Id}" class="update">Update</button> </th>`;
        tableHtml += "</tr>"; 
        tr.innerHTML = tableHtml;
        table.appendChild(tr);
    }
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

//createUser
function userValidation(){
    let username = document.getElementById("name");
    checkInput(username);
    let password = document.getElementById("password");
    checkInput(password);
    let passConfirm = document.getElementById("confirm-password");
    checkInput(passConfirm);
    checkPassword(password,passConfirm);
    let infoCheck = true;
    input.forEach(element => {
        if(element.dataset.state === 'valid'){
            infoCheck = true;
        }else{
            infoCheck = false;
        }
    });
    if (infoCheck){
        document.getElementById("loginForm").submit;
    }
    else{console.log("Validation failed! Check info!");
        return;
    }
}
function checkInput(inputElement){
    const value = inputElement.value;
    const trimmed = value.trim()
    if (trimmed) {
        inputElement.dataset.state = 'valid';
    } else {
        inputElement.dataset.state = 'invalid';
    }
}
function checkPassword(pass1,pass2){
    if(pass1.value !== pass2.value)
    {
        pass2.dataset.state = 'invalid';
    }
}
async function handleFormSubmit(event){
    event.preventDefault();
    console.log("formSubmited");
    const form = event.currentTarget;
    const url = 'http://localhost:3000/create';
    try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });
		console.log({ responseData });

	} catch (error) {
		console.error(error);
	}
}
async function postFormDataAsJson({ url, formData}){
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
        },
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();
}
//deleteFetch
function deleteRowById(id){
    fetch('http://localhost:3000/delete/' + id ,{
        method: 'DELETE',
        headers: {'Content-Type':'aplication/json'}
    })
    .then(response => response.json())
    .then(data => {
        displayInfo();
    })
}
