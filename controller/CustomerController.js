import {Customer_db} from "../db/DB.js";

import CustomerModel from "../model/CustomerModel.js";

// load student records
function loadCustomer() {
    $('#customer-tbody').empty();
    Customer_db.map((item, index) => {
        let firstname = item.firstname;
        let lastname = item.lastname;
        let address = item.address;
        let email = item.email;
        let contact = item.contact;


        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${firstname}</td>
                            <td>${lastname}</td>
                            <td>${address}</td>
                            <td>${email}</td>
                            <td>${contact}</td>
                        </tr>`

        $('#customer-tbody').append(data);
    })
}

// save
$('#customer_save').on('click', function(){
    // let fname = document.getElementById('fname').value;
    let firstname = $('#firstName').val();
    let lastname = $('#lastName').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if(firstname === '' || lastname === '' || address === '' || email === '' || contact === '') {
        // alert("Invalid inputs!");

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {


        // let student_data = {
        //     fname: fname,
        //     lname: lname,
        //     address: address
        // };

        let Customer_data = new CustomerModel(firstname, lastname, address,email,contact);

        Customer_db.push(Customer_data);

        console.log(Customer_data);

        loadCustomer();

        // .push(), .pop(), .shift(), unshift()

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });

    }
});

$("#customer-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    console.log(idx);
    let obj = Customer_db[idx];
    console.log(obj);

    let firstname = obj.firstname;
    let lastname = obj.lastname;
    let address = obj.address;
    let email = obj.email;
    let contact = obj.contact;

    $("#firstName").val(firstname);
    $("#lastName").val(lastname);
    $("#address").val(address);
    $("#email").val(email);
    $("#contact").val(contact);
});

