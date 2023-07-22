// Main script for index.html; this script searches for the specified CEP, gets the response from an API server and fills the form's fields with the data.
// It also adds the customer to the customers' table

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
