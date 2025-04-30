import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  newMark?: number;

  constructor(private studentService: StudentService, private router: Router) {}

  addMark() {
    if (this.newMark != null) {
      if (this.newMark < 0 || this.newMark > 10) {
        alert('Mark must be between 0 and 10!');
        return;
      }
      this.student.marks.push(this.newMark);
      this.newMark = undefined;
    }
  }

  removeMark(index: number) {
    this.student.marks.splice(index, 1);
  }

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