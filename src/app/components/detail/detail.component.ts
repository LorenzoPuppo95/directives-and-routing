import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  route = inject(ActivatedRoute);
  studentServ = inject(StudentService);
  student?: Student;
  age?: number;

  constructor(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.studentServ.getStudent(id).subscribe({
        next: (data) => {  
          console.log(data); 
          this.student = data;
          this.student.age = this.calculateAge(new Date(this.student.dob));
          },
        error: (err) => console.log(err)
      });
    }

  }

  
  calculateAge(birthdate: Date){
      const currentYear = new Date().getFullYear();
      const birthYear = birthdate.getFullYear();
      return currentYear - birthYear;
  }
}
