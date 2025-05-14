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
