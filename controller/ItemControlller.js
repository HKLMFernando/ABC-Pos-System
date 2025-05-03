import {Item_db} from "../db/DB.js";

import ItemModel from "../model/CustomerModel.js";



function loadItem() {
    $('#item-tbody').empty();
    Item_db.map((item, index) => {
        let ItemCode = item.ItemCode;
        let ItemName = item.ItemName;
        let QtyOnHand = item.QtyOnHand;
        let PricePerUnit = item.PricePerUnit;



        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${ItemCode}</td>
                            <td>${ItemName}</td>
                            <td>${QtyOnHand}</td>
                            <td>${PricePerUnit}</td>
                         
                        </tr>`

        $('#item-tbody').append(data);
    })
}

// save
$('#itemSave').on('click', function(){
    // let fname = document.getElementById('fname').value;
    let ItemCode = $('#ItemCode').val();
    let ItemName = $('#ItemName').val();
    let QtyOnHand = $('#QtyOnHand').val();
    let PricePerUnit = $('#PricePerUnit').val();

    if(ItemCode === '' || ItemName === '' || QtyOnHand === '' || PricePerUnit === '' ) {
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

        let Item_data = new ItemModel(ItemCode ,ItemName ,QtyOnHand ,PricePerUnit);

        Item_db.push(Item_data);

        console.log(Item_data);

        loadItem();


        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
        clearForm();

    }
});

