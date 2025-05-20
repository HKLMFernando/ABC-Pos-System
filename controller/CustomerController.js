import { Customer_db } from "../db/DB.js";
import CustomerModel from "../model/CustomerModel.js";

// Load on page ready
$(document).ready(function () {
    $('#customerId').val(generateCustomerID());
    loadCustomers();
});

// Generate Customer ID
function generateCustomerID() {
    if (Customer_db.length === 0) {
        return "C001";
    }
    let lastId = Customer_db[Customer_db.length - 1].customerId;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "C" + newId.toString().padStart(3, '0');
}

// Load Customers to Table
function loadCustomers() {
    $('#customer-tbody').empty();
    Customer_db.map((customer, index) => {
        let data = `<tr>
            <td>${customer.customerId}</td>
            <td>${customer.firstname}</td>
            <td>${customer.lastname}</td>
            <td>${customer.address}</td>
            <td>${customer.email}</td>
            <td>${customer.contact}</td>
        </tr>`;
        $('#customer-tbody').append(data);
    });
}

// Save Customer
$('#customer_save').on('click', function () {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^(?:\+94|0)?[1-9][0-9]{8}$/;

    let customerID = generateCustomerID();
    $('#customerId').val(customerID);
    let firstname = $('#firstName').val();
    let lastname = $('#lastName').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    // Validation
    if (!nameRegex.test(firstname)) {
        return Swal.fire({ icon: "error", title: "Invalid First Name", text: "Use only letters (min 2 characters)." });
    }
    if (!nameRegex.test(lastname)) {
        return Swal.fire({ icon: "error", title: "Invalid Last Name", text: "Use only letters (min 2 characters)." });
    }
    if (address.trim() === '') {
        return Swal.fire({ icon: "error", title: "Invalid Address", text: "Address cannot be empty." });
    }
    if (!emailRegex.test(email)) {
        return Swal.fire({ icon: "error", title: "Invalid Email", text: "Enter a valid email address." });
    }
    if (!contactRegex.test(contact)) {
        return Swal.fire({ icon: "error", title: "Invalid Contact", text: "Enter a valid Sri Lankan contact number." });
    }

    // Save if valid
    let customer_data = new CustomerModel(customerID, firstname, lastname, address, email, contact);
    Customer_db.push(customer_data);
    loadCustomers();
    Swal.fire({ title: "Data Saved Successfully!", icon: "success" });
    clearForm();
});

// Clear Form
function clearForm() {
    $('#customerId').val(generateCustomerID());
    $('#firstName').val('');
    $('#lastName').val('');
    $('#address').val('');
    $('#email').val('');
    $('#contact').val('');
}

// Table Row Click to Load Customer
$("#customer-tbody").on('click', 'tr', function () {
    let idx = $(this).index();
    let obj = Customer_db[idx];

    $("#customerId").val(obj.customerId);
    $("#firstName").val(obj.firstname);
    $("#lastName").val(obj.lastname);
    $("#address").val(obj.address);
    $("#email").val(obj.email);
    $("#contact").val(obj.contact);
});

// Update Customer
$('#customer_update').on('click', function () {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^(?:\+94|0)?[1-9][0-9]{8}$/;

    let customerId = $('#customerId').val();
    let firstname = $('#firstName').val();
    let lastname = $('#lastName').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if (!customerId || !firstname || !lastname || !address || !email || !contact) {
        return Swal.fire({ icon: "error", title: "Oops...", text: "Select data to update!" });
    }

    // Validation
    if (!nameRegex.test(firstname)) {
        return Swal.fire({ icon: "error", title: "Invalid First Name", text: "Use only letters (min 2 characters)." });
    }
    if (!nameRegex.test(lastname)) {
        return Swal.fire({ icon: "error", title: "Invalid Last Name", text: "Use only letters (min 2 characters)." });
    }
    if (address.trim() === '') {
        return Swal.fire({ icon: "error", title: "Invalid Address", text: "Address cannot be empty." });
    }
    if (!emailRegex.test(email)) {
        return Swal.fire({ icon: "error", title: "Invalid Email", text: "Enter a valid email address." });
    }
    if (!contactRegex.test(contact)) {
        return Swal.fire({ icon: "error", title: "Invalid Contact", text: "Enter a valid Sri Lankan contact number." });
    }

    // Update
    const index = Customer_db.findIndex(c => c.customerId === customerId);
    if (index !== -1) {
        Customer_db[index].firstname = firstname;
        Customer_db[index].lastname = lastname;
        Customer_db[index].address = address;
        Customer_db[index].email = email;
        Customer_db[index].contact = contact;

        loadCustomers();
        clearForm();

        Swal.fire({ title: "Updated Successfully!", icon: "success" });
    } else {
        Swal.fire({ icon: "error", title: "Not Found", text: `Customer with ID ${customerId} does not exist.` });
    }
});

// Delete Customer
$('#customer_delete').on('click', function () {
    let customerId = $('#customerId').val();

    if (customerId === '') {
        return Swal.fire({ icon: "warning", title: "No ID", text: "Please select a customer to delete." });
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = Customer_db.findIndex(c => c.customerId === customerId);
            if (index !== -1) {
                Customer_db.splice(index, 1);
                loadCustomers();
                clearForm();
                Swal.fire("Deleted!", "Customer has been deleted.", "success");
            } else {
                Swal.fire({ icon: "error", title: "Not Found", text: `Customer with ID ${customerId} does not exist.` });
            }
        }
    });
});

// Reset Form
$('#customer_reset').on('click', function () {
    clearForm();
});
