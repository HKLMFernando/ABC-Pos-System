import {Item_db} from "../db/DB.js";

import ItemModel from "../model/CustomerModel.js";


// load student records
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

