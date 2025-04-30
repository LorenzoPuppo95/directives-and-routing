import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  studentServ = inject(StudentService);
  student?: Student;
  age?: number;
  newMark?: number;

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
      // const currentYear = new Date().getFullYear();
      // const birthYear = birthdate.getFullYear();
      // return currentYear - birthYear;
      return new Date().getFullYear() - birthdate.getFullYear();
  }

  deleteStudent(id: string) {
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (confirmed && id) {
      this.studentServ.deleteStudent(id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => console.log('Error deleting student:', err),
        complete: () => 
          {
            alert(`Student ${id} deleted successfully!`);
            console.log('Delete operation completed')
          }
      });
    }
  }

  addMarksToStudent(marks: number[], newMark: number) {
    if (this.student) {
      const newMarks = [...marks, newMark];
      this.studentServ.updateMarks(this.student.id, newMarks).subscribe({
        next: (modifiedStudent: Student) => {
          this.student = modifiedStudent;
          alert('Marks added successfully!');
          // console.log('Updated student:', this.student);
        },
        error: (error) => {
          // console.error('Error updating marks:', error);
          alert('Failed to add marks. Please try again.');
        }
      });
    } else {
      // console.log('No student selected to add marks.');
      alert('No student selected. Please try again.');
    }
  }
}
