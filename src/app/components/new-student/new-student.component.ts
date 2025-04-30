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

  countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See',
    'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
    'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
    'North Macedonia (formerly Macedonia)', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay',
    'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

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
    if (this.student.name==='') {
      alert('name is required!');
      return;
    }
    if (this.student.surname==='') {
      alert('surname is required!');
      return;
    }
    if (this.student.dob==='') {
      alert('date of birth is required!');
      return;
    }
    const today = new Date();
    const dob = new Date(this.student.dob);
    if (dob >= today) {
      alert('Date of birth must be earlier than today!');
      return;
    }
    if (this.student.nationality==='') {
      alert('nationality is required!');
      return;
    }
    if (this.student.gender==='') {
      alert('gender is required!');
      return;
    }
    if (this.student.imageUrl==='') {
      this.student.imageUrl = 'data:image/jpeg;base64,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';
    }
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