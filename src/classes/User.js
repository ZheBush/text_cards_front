export class User {

    constructor(id, email, password, fullName, createdAt) {
        this.id = id
        this.email = email
        this.password = password
        this.fullName = fullName
        this.history = history
        this.createdAt = createdAt
    }

}

export default User