import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Posts } from '../common/posts.model';
import { AppConfiguration } from '../common/appConfiguration';
import { WebResponse } from '../common/webResponse';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private httpClient: HttpClient) {
        
    }
        
    async publishPost(post: Posts) {
        var userId = localStorage.getItem("user_id");
        post.userId = +userId;

        return await this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/posts/publish`,
            post
        ).toPromise().then( (response: WebResponse) => {
            if (response.responseCode === AppConfiguration.SUCCESS && response.responseMessage != AppConfiguration.BLANK_STRING) {
                return `Posted Successfully to ${response.responseMessage}`;
            }
        }).catch((error) => {return 'Error Occured';});
    }
}