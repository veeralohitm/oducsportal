import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateqaService } from '../services/updateqa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-askinstructor',
  templateUrl: './askinstructor.component.html',
  styleUrls: ['./askinstructor.component.css']
})

export class AskinstructorComponent implements OnInit {
  createqa!: FormGroup;  
  qas: any[] = [];
  username!: string | null;
  id: string | null;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,    
    private aRoute: ActivatedRoute,
    private _updateqaService: UpdateqaService
     
     )
      { 
        this.createqa = this.fb.group({
          title: ['', Validators.required],
          content: ['', Validators.required],      
        })
        this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)

      }

  ngOnInit(): void {
    this.username = localStorage.getItem('username'); 
    this.getQas();
  }

  addQa(){
    const qa: any = {
      title: this.createqa.value.title,
      content: this.createqa.value.content,   
      Creationdate: new Date(),
      uname: this.username,     
    }
    this._updateqaService.addqa(qa).then(() => {
      console.log(qa);
      this.toastr.success('Updated Post !!');   
   
    }).catch((error: any) => {
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

  

}
