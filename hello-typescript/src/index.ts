console.log("🙋‍♂️ hello hello")

// #### classes
interface WithAddress {
    address: string
}

class House implements WithAddress {
    readonly address: string
    private price: number
    protected _visitors: number = 0
    constructor(address: string, public yearOfBuilt = 1990) {
        this.address = address
        this.price = 50000
    }

    get getPrice(): number {
        return this.price
    }

    set setPrice(p: number) {
        this.price = p
    }
}

const home = new House("Herzal 3/12, Tel Aviv, Israel", 1985)

console.log(`🏠 ${home.address} was build on ${home.yearOfBuilt} and cost ${home.getPrice}`)
