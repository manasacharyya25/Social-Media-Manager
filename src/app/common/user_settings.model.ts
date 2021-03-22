export class UserSettings {
    userId: String;
    facebookIntegrated: boolean;
    instagramIntegrated: boolean;
    tumblrIntegrated: boolean;
    twitterIntegrated: boolean;
    redditIntegrated: boolean;
    linkedinIntegrated: boolean;

    constructor(userId: String) {
        this.userId = userId;
    }
}