export class CardList {

    constructor(title, cardList = []) {
        this.title = title;
        this.cardList = cardList; 
    }

    getCardById(cardId) {
        return this.cardList.find(card => card.id === cardId);
    }

    getAllCards() {
        return this.cardList; 
    }

    getCardCount() {
        return this.cardList.length;
    }

    getCardsWithCorrectAnswers() {
        return this.cardList.filter(card => 
            card.answerList.includes(card.correctAnswer)
        );
    }

    getCountOfCorrectAnswers() {
        return this.getCardsWithCorrectAnswers.length
    }
}

export default CardList