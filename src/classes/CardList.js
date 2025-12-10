export class CardList {

    constructor(title, userId, score, cardList = []) {
        this.title = title
        this.userId = userId
        this.score = score
        this.cardList = cardList
    }

}

export default CardList