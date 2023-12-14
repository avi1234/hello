"use strict";
console.log("🙋‍♂️ hello hello");
class House {
    constructor(address, yearOfBuilt = 1990) {
        this.yearOfBuilt = yearOfBuilt;
        this._visitors = 0;
        this.address = address;
        this.price = 50000;
    }
    get getPrice() {
        return this.price;
    }
    set setPrice(p) {
        this.price = p;
    }
}
const home = new House("Herzal 3/12, Tel Aviv, Israel", 1985);
console.log(`🏠 ${home.address} was build on ${home.yearOfBuilt} and cost ${home.getPrice}`);
