import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})

export class NewStudentComponent {
  student: Student = {
    createdAt: new Date().toISOString(),
    name: '',
    surname: '',
    nationality: '',
    dob: '',
    gender: '',
    imageUrl: '',
    marks: [],
    id: ''
  };

  constructor(private studentService: StudentService, private router: Router) {}

  addStudent() {
    this.studentService.getStudents().subscribe({
      next: () => {
        this.studentService.addStudent(this.student).subscribe({
          next: () => {
            alert('Student added successfully!');
            this.router.navigate(['/']);
          },
          error: (err) => console.error('Error adding student:', err)
        });
      },
      error: (err) => console.error('Error fetching students:', err)
    });
  }
}