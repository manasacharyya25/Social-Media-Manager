import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Posts } from '../common/posts.model';
import { AppConfiguration } from '../common/appConfiguration';

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(private httpClient: HttpClient) {
        
    }
        
    publishPost(post: Posts): void {
        var userId = localStorage.getItem("user_id");
        post.userId = +userId;

        this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/posts/publish`,
            post
        ).subscribe( response => {
            console.log(response);
        });
    }
}