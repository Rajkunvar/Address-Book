export class Contact {
    firstname: string = "";
    lastname: string = "";
    mobile: string = "";
    email: string = "";
    isfavorite: string = "";

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}