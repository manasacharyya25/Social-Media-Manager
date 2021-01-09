import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isSettingsEnabled: boolean;
  selectedImageUrl: String | ArrayBuffer;
  fileSelected: boolean;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.settingsEnabled.subscribe(didSettingsEnable => {this.isSettingsEnabled = didSettingsEnable});
    this.fileSelected = false;
  }

  onFileSelected(event): void {
    const selectedFile: File = event.target.files[0];
    
    this.fileSelected = true;
    
    const fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = event => {
      this.selectedImageUrl = fileReader.result;
    }
  }

  clearSelectedFile(): void {
    this.fileSelected = false;
    this.selectedImageUrl = null;
  }
}
