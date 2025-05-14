import { Item_db} from "../db/DB.js";
import { Customer_db} from "../db/DB.js";
import { Order_db} from "../db/DB.js";
import CustomerModel from "../model/CustomerModel.js";
import OrderModel from "../model/OrderModel.js";
import ItemModel from "../model/ItemModel.js";


// searchCustomer
$('#searchCustomer').on('click',function () {
    searchCustomer();
})

function searchCustomer() {
    let id = $('#searchCustomerInput').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    const c = Customer_db.find(cust => cust.customerId === id);
    if (c){
        $('#loadCid').val(c.customerId);
        $('#loadFirstName').val(c.firstname);
        $('#loadLastName').val(c.lastname)
        $('#loadAddress').val(c.address);
        $('#loadEmail').val(c.email);
        $('#loadContact').val(c.contact);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}
function resetCustomer() {
    $('#searchCustomerInput').val('');
    $('#loadCid').val('');
    $('#loadFirstName').val('');
    $('#loadLastName').val('');
    $('#loadAddress').val('');
    $('#loadContact').val('');
}
$('#resetCustomerDetails').on('click',function () {
    resetCustomer();
})


// search Item
$('#searchItem').on('click',function () {
    searchItem();
})

function searchItem() {
    let id = $('#itemIDInput').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    const c = Item_db.find(item => item.ItemCode === id);
    if (c){
        $('#loadItemId').val(c.ItemCode);
        $('#loadItemName').val(c.ItemName);
        $('#loadItemQty').val(c.QtyOnHand);
        $('#loadItemPrice').val(c.PricePerUnit);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}

function resetItem() {
    $('#itemIDInput').val('');
    $('#loadItemId').val('');
    $('#loadItemName').val('');
    $('#loadItemQty').val('');
    $('#loadItemPrice').val('');
    $('#quantity').val('');
}
$('#resetItemDetails').on('click',function () {
    resetItem();
})

// add to Cart function


