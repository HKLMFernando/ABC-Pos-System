export default class CustomerModel {
    constructor(customerId,firstname, lastname, address,email,contact) {
        this.customerId=customerId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}