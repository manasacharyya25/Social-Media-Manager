import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { Posts } from '../common/posts.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isSettingsEnabled: boolean;
  fileSelected: boolean;
  
  post: Posts;

  constructor(private navbarService: NavbarService, private postService: PostService) { }

  ngOnInit(): void {
    this.navbarService.settingsEnabled.subscribe(didSettingsEnable => {this.isSettingsEnabled = didSettingsEnable});
    this.post = new Posts();
  }

  onFileSelected(event): void {
    const selectedFile: File = event.target.files[0];
    
    this.fileSelected = true;
    
    const fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = event => {
      this.post.image = fileReader.result;
    }
  }

  clearSelectedFile(): void {
    this.fileSelected = false;
    this.post.image = null;
  }

  onPostClicked():void {
    if (this.post.image != null && this.post.caption.length != 0) {
      this.postService.publishPost(this.post);
    }
  }
}
