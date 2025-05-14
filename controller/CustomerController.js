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
    let obj = customer_db[idx];

    let customerID = obj.customerID;
    let firstname = obj.firstname;
    let lastname = obj.lastname;
    let address = obj.address;
    let email = obj.email;
    let contact = obj.contact;

    $("#customerId").val(customerID);
    $("#firstName").val(firstname);
    $("#lastName").val(lastname);
    $("#address").val(address);
    $("#email").val(email);
    $("#contact").val(contact);

});

