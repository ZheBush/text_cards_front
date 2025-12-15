export class User {

    constructor(id, email, username, password, history = []) {
        this.id = id
        this.email = email
        this.username = username
        this.password = password
        this.history = history
    }

}

export default User