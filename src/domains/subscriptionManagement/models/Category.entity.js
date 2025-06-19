export class Category {
    constructor(
        id = 0,
        name = '',
        subscribersCount= 0,

    ) {
        this.id = id;
        this.name = name;
        this.subscribersCount = subscribersCount;
    }
}
