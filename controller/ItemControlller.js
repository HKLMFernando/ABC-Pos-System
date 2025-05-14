import {Customer_db, Item_db} from "../db/DB.js";

import ItemModel from "../model/ItemModel.js";


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
$('#item_save').on('click', function(){
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

        let Item_data = new ItemModel(ItemCode,ItemName,QtyOnHand,PricePerUnit);

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

$("#item-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    console.log(idx);
    let obj = Item_db[idx];
    console.log(obj);

    let ItemCode = obj.ItemCode;
    let ItemName = obj.ItemName;
    let QtyOnHand = obj.QtyOnHand;
    let PricePerUnit = obj.PricePerUnit;

    $("#ItemCode").val(ItemCode);
    $("#ItemName").val(ItemName);
    $("#QtyOnHand").val(QtyOnHand);
    $("#PricePerUnit").val(PricePerUnit);
});

function clearForm() {
    $('#ItemCode').val('');
    $('#ItemName').val('');
    $('#QtyOnHand').val('');
    $('#PricePerUnit').val('');
    // // Reset edit mode
    // isEditMode = false;
    // editIndex = -1;
    // // Change button text back to "Save"
    // $('#customer_save').text('Save');
}
$('#item_update').on('click', function () {
    let ItemCode = $('#ItemCode').val();
    let ItemName = $('#ItemName').val();
    let QtyOnHand =$('#QtyOnHand').val();
    let PricePerUnit = $('#PricePerUnit').val();


    if (ItemCode === '' || ItemName === '' || QtyOnHand === '' || PricePerUnit === '' ) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select data to update!",
        });
        return;
    }

    /*Find index of customer by ID*/
    const index = Item_db.findIndex(c => c.ItemCode === ItemCode);

    if (index !== -1) {
        Item_db[index].ItemCode = ItemCode;
        Item_db[index].ItemName = ItemName;
        Item_db[index].QtyOnHand = QtyOnHand;
        Item_db[index].PricePerUnit = PricePerUnit;

        loadItem();
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
            text: "Item with ID " + ItemCode+ " does not exist.",
        });
    }
});

// -------------------------Delete Item--------------------------
$('#item_delete').on('click', function () {
    let ItemCode = $('#ItemCode').val();

    if (ItemCode === '') {
        Swal.fire({
            icon: "warning",
            title: "No ID",
            text: "Please select a Item to delete.",
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
            const index = Item_db.findIndex(c => c.ItemCode === ItemCode);
            if (index !== -1) {
                Item_db.splice(index, 1); // Remove from array
                loadItem();
                clearForm();
                Swal.fire(
                    "Deleted!",
                    "Item has been deleted.",
                    "success"
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Not Found",
                    text: "Item with ID " +ItemCode + " does not exist.",
                });
            }
        }
    });
});


