import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly ANTI_CORS = 'https://cors-anywhere.herokuapp.com/';
  readonly BASE_URL = 'https://68109d8127f2fdac241212a7.mockapi.io/';
  readonly STUDENTS_ENDPOINT = "students/";
  constructor(private http: HttpClient) { 
    
  }

  getStudents(): Observable<Student[]>{
      return this.http.get<Student[]>(this.BASE_URL+this.STUDENTS_ENDPOINT);
  }

  getStudent(id: string | null): Observable<Student>{
    return this.http.get<Student>(this.BASE_URL+this.STUDENTS_ENDPOINT+"/"+id);
  }

  deleteStudent(id: string): Observable<void> {
    return new Observable((observer) => {
      this.http.delete(this.BASE_URL + this.STUDENTS_ENDPOINT + id).subscribe({
        next: () => {
          observer.next();
          observer.complete();
        },
        error: (err) => {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  addStudent(student: Student) {
    return this.http.post(this.BASE_URL + this.STUDENTS_ENDPOINT, student);
  }

  updateMarks(id: string, marks: number[]): Observable<Student> {
    debugger;
    console.log("Updating marks for student with ID:", id, "New marks:", marks);
    return this.http.put<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT + id, { marks });
  }
}
