import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from '../services/update.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateqaService } from '../services/updateqa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  createpost!: FormGroup;
  createreply!: FormGroup;
  submitted = false; 
  id: string | null;
  posts: any[] = []; 
  qas: any[] = [];
  username!: string | null;

  constructor(
    private fb: FormBuilder,
    private _updateService: UpdateService,
    private router: Router,
    private toastr: ToastrService,    
    private aRoute: ActivatedRoute,
    private _updateqaService: UpdateqaService
  ) { 
    this.createpost = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],      
    })
    this.createreply = this.fb.group({
      rcontent: ['', Validators.required],
      runame: [this.username, Validators.required],    
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.getPosts();
    this.editposts();
    this.getQas();
    this.username = localStorage.getItem('username');   
    
  }

  addeditpost() {
    this.submitted = true;

    if (this.createpost.invalid) {
      return;
    }

    if (this.id === null) {
      this.addpost();
    } else {
      this.editpost(this.id);
    }

  }

addpost(){

  const post: any = {
    title: this.createpost.value.title,
    content: this.createpost.value.content,   
    Creationdate: new Date(),
    Updateddate: new Date()
  }
  this._updateService.addpost(post).then(() => {
    console.log(post);
    this.toastr.success('Updated Post !!');   
 
  }).catch((error: any) => {
    console.log(error);
   
  })

}
editpost(id: string){
  const post: any = {
    title: this.createpost.value.title,
    content: this.createpost.value.content,     
    Updateddate: new Date()
  } 

    this._updateService.updatepost(id, post).then(() => {
      
      this.toastr.success('Success!!!'); 
      this.router.navigate(['/dashboard']);      
    })
}

editposts() {  
  if (this.id !== null) {    
    this._updateService.getpost(this.id).subscribe(data => {     
      this.createpost.setValue({
        title: data.payload.data()['title'],
        content: data.payload.data()['content'],
       
      })
    })
  }
}

getPosts() {
  this._updateService.getposts().subscribe(data => {
    this.posts = [];
    data.forEach((element: any) => {
      this.posts.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
    console.log(this.posts);
  });
}

removepost(id: string) {
  this._updateService.deletepost(id).then(() => {
    console.log('deleted');
    this.toastr.error('deleted!', 'sdsfds',{
      positionClass: 'toast-bottom-right'
    });
  }).catch(error => {
    console.log(error);
  })
}

getQas() {
  this._updateqaService.getqas().subscribe(data => {
    this.qas = [];
    data.forEach((element: any) => {
      this.qas.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
    console.log(this.qas);
  });
}


addreply(id: string) {

  const reply: any = {
    rcontent: this.createreply.value.rcontent,
    runame: this.username,   
  } 

    this._updateqaService.updatereply(id, reply).then(() => {
      
      this.toastr.success('Success!!!'); 
      this.router.navigate(['/dashboard']);      
    })
  
}

}
