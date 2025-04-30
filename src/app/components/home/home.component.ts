import { Component, inject } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/student/student.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  students: Student[] = [];
  studentServ = inject(StudentService);

  constructor() {
    this.studentServ.getStudents().subscribe({
      next:(data) => this.students = data,
      error:(err) => console.log(err)
    })
  }

  orderByName(){
    this.students.sort((a,b) => a.surname.localeCompare(b.surname))
  }

  orderByAge(){
    this.students.sort((a,b) => +new Date(a.dob) - +new Date(b.dob));
  }
}
