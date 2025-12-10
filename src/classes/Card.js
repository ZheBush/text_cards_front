export class Card {

    constructor(id, cardListId, question, correctAnswer, selectedAnswer, options = []) {
        this.id = id;
        this.cardListId = cardListId;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.selectedAnswer = selectedAnswer;
        this.options = options;
    }
    
}

export default Card