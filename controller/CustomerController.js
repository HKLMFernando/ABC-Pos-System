import {Customer_db} from "../db/DB.js";

import CustomerModel from "../model/CustomerModel.js";




/*---------------------Load Customer ID When The Page is Loading-------------------*/
$(document).ready(function() {
    $('#customerId').val(generateCustomerID());
    loadCustomers();
});



/*--------------------------Generate next Customer Id----------------------------*/
function generateCustomerID() {
    if (Customer_db.length === 0) {
        return "C001";
    }
    // Get the last customer ID (assuming last added is at the end)
    let lastId = Customer_db[Customer_db.length - 1].customerId;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "C" + newId.toString().padStart(3, '0');
}
/*-----------------------Load Table Data--------------------------------------------*/
function loadCustomers() {
    $('#customer-tbody').empty();
    Customer_db.map((customer,index)=>{
        let customerId = customer.customerId;
        let firstname= customer.firstname;
        let lastname = customer.lastname;
        let address = customer.address;
        let email = customer.email;
        let contact = customer.contact;



        let  data = `<tr>
                            <td>${customerId}</td>
                            <td>${firstname}</td>
                            <td>${lastname}</td>
                            <td>${address}</td>
                            <td>${email}</td>
                            <td>${contact}</td>
                        </tr>`
        $('#customer-tbody').append(data);

    })
}

/*---------------------------Save Customer----------------------------------------*/
$('#customer_save').on('click',function () {
    let customerID = generateCustomerID()
    $('#customerId').val(customerID);
    let firstname = $('#firstName').val();
    let lastname = $('#lastName').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if(firstname === '' || lastname === '' || address === '' || email === '' || contact === '') {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please enter valid customer details.",
        });
    }else {
        let customer_data = new  CustomerModel (customerID,firstname,lastname,address,email,contact);
        Customer_db.push(customer_data);
        loadCustomers();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
        clearForm();
    }
});
/*---------------------------Clear data in the form--------------------------------------------*/
function clearForm() {
    $('#customerId').val(generateCustomerID());
    $('#firstName').val('');
    $('#lastName').val('');
    $('#address').val('');
    $('#email').val('');
    $('#contact').val('');

}


/*-----------------------Table Onclick Action-------------------------------------*/
$("#customer-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    let obj = Customer_db[idx];

    let customerId = obj.customerId;
    let firstname = obj.firstname;
    let lastname = obj.lastname;
    let address = obj.address;
    let email = obj.email;
    let contact = obj.contact;

    $("#customerId").val(customerId);
    $("#firstName").val(firstname);
    $("#lastName").val(lastname);
    $("#address").val(address);
    $("#email").val(email);
    $("#contact").val(contact);

});
/*---------------Update Customer Details-------------------------------*/
$('#customer_update').on('click', function () {
    let customerId = $('#customerId').val();
    let firstname = $('#firstName').val();
    let lastname =$('#lastName').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if (customerId === '' || firstname === '' || lastname === '' || address === '' || email === '' || contact === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select data to update!",
        });
        return;
    }

    /*Find index of customer by ID*/
    const index = Customer_db.findIndex(c => c.customerId === customerId);

    if (index !== -1) {
        Customer_db[index].firstname = firstname;
        Customer_db[index].lastname = lastname;
        Customer_db[index].address = address;
        Customer_db[index].email = email;
        Customer_db[index].contact = contact;

        loadCustomers();
        clearForm();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Not Found",
            text: "Customer with ID " + customerId+ " does not exist.",
        });
    }
});
// -------------------------Delete Customer--------------------------
$('#customer_delete').on('click', function () {
    let customerId = $('#customerId').val();

    if (customerId === '') {
        Swal.fire({
            icon: "warning",
            title: "No ID",
            text: "Please select a customer to delete.",
        });
        return;
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
                Customer_db.splice(index, 1); // Remove from array
                loadCustomers();
                clearForm();
                Swal.fire(
                    "Deleted!",
                    "Customer has been deleted.",
                    "success"
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Not Found",
                    text: "Customer with ID " + customerId + " does not exist.",
                });
            }
        }
    });
});







