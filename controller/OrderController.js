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
    $('#loadEmail').val('');
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

$('#addToOrder').on('click',function () {

    let itemID = $('#loadItemId').val();
    let itemName = $('#loadItemName').val();
    let customerName = $('#loadFirstName').val();
    let price = parseFloat($('#loadItemPrice').val());
    let needQty = parseInt($('#quantity').val());
    let item = Item_db.find(item => item.ItemCode === itemID )

    if (!item) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No Item Found",
        });
        return
    }

    if (item.QtyOnHand<needQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough Quantity",
        });
    } else {
        item.QtyOnHand -= needQty;
        let total = price*needQty;
        $('#loadTotal').text(total)
        // loadItem();
        let order_data = new OrderModel(customerName,itemName,needQty,price,total);
        Order_db.push(order_data);

        loadOrderTable();
        resetItem();
        resetCustomer();
        // setCount();

        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
})
function loadOrderTable() {
    $('#order-body').empty();
    Order_db.map((order, index) => {
        let customerName = order.customerName;
        let itemName = order.itemName;
        let qty = order.qty;
        let price = order.price;
        let total = order.total;
        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${customerName}</td>
                            <td>${itemName}</td>
                            <td>${qty}</td>
                            <td>${price}</td>
                            <td>${total}</td>
                        </tr>`
        $('#Orders-tbody').append(data);
    })
}