import { Item_db } from "../db/DB.js";
import ItemModel from "../model/ItemModel.js";

/*------------------- Load Item Table -------------------*/
function loadItem() {
    $('#item-tbody').empty();
    Item_db.map((item, index) => {
        $('#item-tbody').append(`
            <tr>
                <td>${index + 1}</td>
                <td>${item.ItemCode}</td>
                <td>${item.ItemName}</td>
                <td>${item.QtyOnHand}</td>
                <td>${item.PricePerUnit}</td>
            </tr>`);
    });
}

/*------------------- Regex Validation -------------------*/
function validateInput(id, pattern) {
    const $input = $(id);
    const isValid = pattern.test($input.val().trim());
    $input.toggleClass("input-error", !isValid);
    return isValid;
}

function validateForm() {
    const codeReg = /^I\d{3}$/; // Example: I001
    const nameReg = /^[A-Za-z0-9 ]{2,}$/;
    const qtyReg = /^\d+$/;
    const priceReg = /^\d+(\.\d{1,2})?$/;

    let valid = true;

    valid = validateInput('#ItemCode', codeReg) && valid;
    valid = validateInput('#ItemName', nameReg) && valid;
    valid = validateInput('#QtyOnHand', qtyReg) && valid;
    valid = validateInput('#PricePerUnit', priceReg) && valid;

    return valid;
}

/*------------------- Save -------------------*/
$('#item_save').on('click', function () {
    if (!validateForm()) {
        Swal.fire("Error!", "Fix red fields before saving.", "error");
        return;
    }

    const ItemCode = $('#ItemCode').val().trim();
    const ItemName = $('#ItemName').val().trim();
    const QtyOnHand = $('#QtyOnHand').val().trim();
    const PricePerUnit = $('#PricePerUnit').val().trim();

    const Item_data = new ItemModel(ItemCode, ItemName, QtyOnHand, PricePerUnit);
    Item_db.push(Item_data);
    loadItem();
    clearForm();

    Swal.fire("Added!", "Item added successfully.", "success");
});

/*------------------- Click Row -------------------*/
$("#item-tbody").on('click', 'tr', function () {
    const idx = $(this).index();
    const obj = Item_db[idx];

    $("#ItemCode").val(obj.ItemCode);
    $("#ItemName").val(obj.ItemName);
    $("#QtyOnHand").val(obj.QtyOnHand);
    $("#PricePerUnit").val(obj.PricePerUnit);
});

/*------------------- Update -------------------*/
$('#item_update').on('click', function () {
    if (!validateForm()) {
        Swal.fire("Error!", "Fix red fields before updating.", "error");
        return;
    }

    const ItemCode = $('#ItemCode').val().trim();
    const index = Item_db.findIndex(c => c.ItemCode === ItemCode);

    if (index !== -1) {
        Item_db[index] = new ItemModel(
            ItemCode,
            $('#ItemName').val().trim(),
            $('#QtyOnHand').val().trim(),
            $('#PricePerUnit').val().trim()
        );
        loadItem();
        clearForm();

        Swal.fire("Updated!", "Item updated successfully.", "success");
    } else {
        Swal.fire("Not Found", `Item with ID ${ItemCode} does not exist.`, "error");
    }
});

/*------------------- Delete -------------------*/
$('#item_delete').on('click', function () {
    const ItemCode = $('#ItemCode').val().trim();
    if (ItemCode === '') {
        Swal.fire("No ID", "Please select an item to delete.", "warning");
        return;
    }

    Swal.fire({
        title: "Delete?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = Item_db.findIndex(c => c.ItemCode === ItemCode);
            if (index !== -1) {
                Item_db.splice(index, 1);
                loadItem();
                clearForm();
                Swal.fire("Deleted!", "Item removed.", "success");
            } else {
                Swal.fire("Not Found", `Item with ID ${ItemCode} does not exist.`, "error");
            }
        }
    });
});

/*------------------- Reset -------------------*/
$('#item_reset').on('click', clearForm);

/*------------------- Clear Form -------------------*/
function clearForm() {
    $('#ItemCode, #ItemName, #QtyOnHand, #PricePerUnit').val('').removeClass("input-error");
}

/*------------------- Real-time Validation -------------------*/
$('#ItemCode').on('input', () => validateInput('#ItemCode', /^I\d{3}$/));
$('#ItemName').on('input', () => validateInput('#ItemName', /^[A-Za-z0-9 ]{2,}$/));
$('#QtyOnHand').on('input', () => validateInput('#QtyOnHand', /^\d+$/));
$('#PricePerUnit').on('input', () => validateInput('#PricePerUnit', /^\d+(\.\d{1,2})?$/));
