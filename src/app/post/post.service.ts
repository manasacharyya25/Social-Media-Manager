import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Posts } from '../common/posts.model';
import { AppConfiguration } from '../common/appConfiguration';

@Injectable({providedIn: 'root'})
export class PostService {
    userId : string;

    constructor(private httpClient: HttpClient) {
        this.userId = localStorage.getItem("user_id");
    }
        
    publishPost(post: Posts): void {
        post.userId = +this.userId;

        this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/posts/publish`,
            post
        ).subscribe( response => {
            console.log(response);
        });
    }
}