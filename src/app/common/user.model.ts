export class User 
{
    userName: String;
    email: String;
    photoUrl: String;
    userId: String;
    provider: String;

    constructor(name, email, photoUrl, userId, provider) {
        this.userName = name;
        this.email =  email;
        this.photoUrl = photoUrl;
        this.userId = userId;
        this.provider = provider;
    }
}