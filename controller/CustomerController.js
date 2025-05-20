import { Customer_db } from "../db/DB.js";
import CustomerModel from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#customerId').val(generateCustomerID());
    loadCustomers();
});

/*------------------- Generate ID -------------------*/
function generateCustomerID() {
    if (Customer_db.length === 0) return "C001";
    let lastId = Customer_db[Customer_db.length - 1].customerId;
    let number = parseInt(lastId.substring(1)) + 1;
    return "C" + number.toString().padStart(3, '0');
}

/*------------------- Load Table -------------------*/
function loadCustomers() {
    $('#customer-tbody').empty();
    Customer_db.map((c) => {
        $('#customer-tbody').append(`
            <tr>
                <td>${c.customerId}</td>
                <td>${c.firstname}</td>
                <td>${c.lastname}</td>
                <td>${c.address}</td>
                <td>${c.email}</td>
                <td>${c.contact}</td>
            </tr>`);
    });
}

/*------------------- Validation -------------------*/
function validateInput(id, pattern) {
    const $input = $(id);
    const isValid = pattern.test($input.val().trim());
    $input.toggleClass("input-error", !isValid);
    return isValid;
}

function validateForm() {
    const nameReg = /^[A-Za-z]{2,}$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneReg = /^(?:\+94|0)?[1-9][0-9]{8}$/;

    let valid = true;

    valid = validateInput("#firstName", nameReg) && valid;
    valid = validateInput("#lastName", nameReg) && valid;
    valid = validateInput("#email", emailReg) && valid;
    valid = validateInput("#contact", phoneReg) && valid;

    const address = $('#address');
    if (address.val().trim() === '') {
        address.addClass("input-error");
        valid = false;
    } else {
        address.removeClass("input-error");
    }

    return valid;
}

/*------------------- Save -------------------*/
$('#customer_save').on('click', function () {
    if (!validateForm()) {
        Swal.fire("Error", "Fix red fields before saving.", "error");
        return;
    }

    const customerID = generateCustomerID();
    const newCustomer = new CustomerModel(
        customerID,
        $('#firstName').val().trim(),
        $('#lastName').val().trim(),
        $('#address').val().trim(),
        $('#email').val().trim(),
        $('#contact').val().trim()
    );

    Customer_db.push(newCustomer);
    loadCustomers();
    clearForm();

    Swal.fire("Saved!", "Customer added successfully.", "success");
});

/*------------------- Update -------------------*/
$('#customer_update').on('click', function () {
    if (!validateForm()) {
        Swal.fire("Error", "Fix red fields before updating.", "error");
        return;
    }

    const id = $('#customerId').val();
    const index = Customer_db.findIndex(c => c.customerId === id);

    if (index !== -1) {
        Customer_db[index] = new CustomerModel(
            id,
            $('#firstName').val().trim(),
            $('#lastName').val().trim(),
            $('#address').val().trim(),
            $('#email').val().trim(),
            $('#contact').val().trim()
        );
        loadCustomers();
        clearForm();
        Swal.fire("Updated!", "Customer updated successfully.", "success");
    } else {
        Swal.fire("Not Found", "Customer ID not found.", "error");
    }
});

/*------------------- Delete -------------------*/
$('#customer_delete').on('click', function () {
    const id = $('#customerId').val();
    if (!id) return Swal.fire("No ID", "Please select a customer.", "warning");

    Swal.fire({
        title: "Delete?",
        text: "You can't undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(result => {
        if (result.isConfirmed) {
            const index = Customer_db.findIndex(c => c.customerId === id);
            if (index !== -1) {
                Customer_db.splice(index, 1);
                loadCustomers();
                clearForm();
                Swal.fire("Deleted!", "Customer removed.", "success");
            } else {
                Swal.fire("Error", "Customer not found.", "error");
            }
        }
    });
});

/*------------------- Clear -------------------*/
function clearForm() {
    $('#customerId').val(generateCustomerID());
    $('#firstName, #lastName, #address, #email, #contact').val('').removeClass("input-error");
}

/*------------------- Reset -------------------*/
$('#customer_reset').on('click', clearForm);

/*------------------- Click Row -------------------*/
$('#customer-tbody').on('click', 'tr', function () {
    const index = $(this).index();
    const c = Customer_db[index];
    $('#customerId').val(c.customerId);
    $('#firstName').val(c.firstname);
    $('#lastName').val(c.lastname);
    $('#address').val(c.address);
    $('#email').val(c.email);
    $('#contact').val(c.contact);
});

/*------------------- Real-time Regex Validation -------------------*/
$('#firstName').on('input', () => validateInput('#firstName', /^[A-Za-z]{2,}$/));
$('#lastName').on('input', () => validateInput('#lastName', /^[A-Za-z]{2,}$/));
$('#email').on('input', () => validateInput('#email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/));
$('#contact').on('input', () => validateInput('#contact', /^(?:\+94|0)?[1-9][0-9]{8}$/));
$('#address').on('input', function () {
    const $input = $(this);
    const isValid = $input.val().trim() !== '';
    $input.toggleClass("input-error", !isValid);
});
