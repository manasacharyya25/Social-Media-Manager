export class UserSettings {
    userId: number;
    facebookIntegrated: boolean;
    instagramIntegrated: boolean;
    tumblrIntegrated: boolean;
    twitterIntegrated: boolean;
    redditIntegrated: boolean;
    linkedinIntegrated: boolean;

    constructor(userId: number) {
        this.userId = userId;
    }
}