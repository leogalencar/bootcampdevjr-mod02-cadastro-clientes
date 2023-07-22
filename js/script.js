// Main script for index.html; this script searches for the specified CEP, gets the response from an API server and fills the form's fields with the data.
// It also adds the customer to the customers' table

// Customer object
var customers = [
    {
        id: 1,
        first_name: "Leonardo",
        last_name: "Alencar",
        cep: "18010-050",
        address: "Rua Leite Penteado",
        number: "999",
        neighborhood: "Centro",
        city: "Sorocaba",
        state: "SP",
    },
];

// Masks
$("#inputCEP").mask("99999-999");

// On page load
loadCustomersTable();

// Load the customers table
function loadCustomersTable() {
    for (let customer of customers) {
        addNewRow(customer);
    }
}

// Add a new row to the customers' table
function addNewRow(customer) {
    var table = document.getElementById("customersTable");

    var newRow = table.insertRow();

    // Insert customer id
    var idNode = document.createTextNode(customer.id);
    newRow.insertCell().appendChild(idNode);

    // Insert customer first name and last name
    var nameCell = newRow.insertCell();
    var firstNameNode = document.createTextNode(customer.first_name);
    var lastNameNode = document.createTextNode(customer.last_name);
    nameCell.innerHTML = firstNameNode.nodeValue + " " + lastNameNode.nodeValue;

    // Insert customer address and address number
    var addressCell = newRow.insertCell();
    var addressNode = document.createTextNode(customer.address);
    var numberNode = document.createTextNode(customer.number);
    addressCell.innerHTML = addressNode.nodeValue + ", " + numberNode.nodeValue;

    // Insert customer CEP
    var cepNode = document.createTextNode(customer.cep);
    newRow.insertCell().appendChild(cepNode);

    // Insert customer neighborhood
    var neighborhoodNode = document.createTextNode(customer.neighborhood);
    newRow.insertCell().appendChild(neighborhoodNode);

    // Insert customer city
    var cityNode = document.createTextNode(customer.city);
    newRow.insertCell().appendChild(cityNode);

    // Insert customer state
    var stateNode = document.createTextNode(customer.state);
    newRow.insertCell().appendChild(stateNode);
}

// Save customer information
function saveCustomer() {
    var customer = {
        id: customers.length + 1,
        first_name: document.getElementById("inputFirstName").value,
        last_name: document.getElementById("inputLastName").value,
        cep: document.getElementById("inputCEP").value,
        address: document.getElementById("inputAddress").value,
        number: document.getElementById("inputNumber").value,
        neighborhood: document.getElementById("inputNeighborhood").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value,
    };

    addNewRow(customer);
    customers.push(customer);
}

// Search for CEP in the ViaCEP API
function search() {
    var CEP = document.getElementById("inputCEP").value;

    var url = `https://viacep.com.br/ws/${CEP}/json/`;

    $.getJSON(url, (response) => {
        // Check if the CEP format is correct but was not found
        if ("erro" in response) {
            showCEPInfo({});

            lockNumber();
            showError("Não encontrado");
        }
        // Else if the CEP format is correct and was found
        else {
            showCEPInfo(response);
            unlockNumber();

            clearError();
        }
    })
        // Handle error if the CEP format is incorrect
        .fail(() => {
            showCEPInfo({});

            lockNumber();
            showError("CEP Inválido");
        });
}

// Show CEP information gotten from the API endpoint
function showCEPInfo(response) {
    document.getElementById("inputAddress").value = response.logradouro || "";
    document.getElementById("inputNeighborhood").value = response.bairro || "";
    document.getElementById("inputCity").value = response.localidade || "";
    document.getElementById("inputState").value = response.uf || "";
}

// Disable number field
function lockNumber() {
    $("#inputNumber").prop("disabled", true);
}

// Enable number field
function unlockNumber() {
    $("#inputNumber").prop("disabled", false);
}

// Show error message
function showError(message) {
    document.getElementById("error").innerHTML = message;
}

// Clear error message
function clearError() {
    document.getElementById("error").innerHTML = "";
}
