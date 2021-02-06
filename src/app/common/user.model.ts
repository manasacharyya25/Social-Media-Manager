export class User 
{
    userName: String;
    email: String;
    photoUrl: String;
    accessToken: String;
    provider: String;

    constructor(name, email, photoUrl, provider, accessToken) {
        this.userName = name;
        this.email =  email;
        this.photoUrl = photoUrl;
        this.provider = provider;
        this.accessToken = accessToken;
    }
}