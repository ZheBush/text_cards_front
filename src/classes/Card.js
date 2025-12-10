export class Card {

    constructor(id, cardListId, question, correctAnswer, selectedAnswer, options = []) {
        this.id = id;
        this.cardListId = cardListId;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.selectedAnswer = selectedAnswer;
        this.options = options;
    }

    getAnswerList() {
        return this.options;
    }

    getAnswerCount() {
        return this.options.length;
    }

    getCorrectAnswer() {
        return this.correctAnswer;
    }

    isCorrectAnswer(answer) {
        return answer === this.correctAnswer;
    }

    chooseAnswer(answer) {
        this.selectedAnswer = answer
    }

}

export default Card