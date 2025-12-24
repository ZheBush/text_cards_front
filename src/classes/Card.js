export class Card {

    constructor(id, question, answer, cardListId, userId) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.userId = userId
        this.cardListId = cardListId;
    }
    
}

export default Card