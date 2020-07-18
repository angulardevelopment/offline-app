import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IStudent } from '../student';
@Injectable({
  providedIn: 'root'
})
export class StudentService  {
  connection;
  constructor(service: BaseService) {
    this.connection = service.connection;
  }

  getStudents() {
    return this.connection.select({
      from: 'Students'
    });
  }

  addStudent(student: IStudent) {
    return this.connection.insert({
      into: 'Students',
      return: true, // as id is autoincrement, so we would like to    get the inserted value
      values: [student]
    });
  }
  deleteStudent(studentId: number) {
    return this.connection.remove({
      from: 'Students',
      where: {
        id: studentId
      }
    });
  }

  updateStudent(studentId: number, updateValue: IStudent) {
    return this.connection.update({
      in: 'Students',
      where: {
        id: studentId
      },
      set: updateValue
    });
  }

  getStudent(studentId: number) {
    return this.connection.select({
      from: 'Students',
      where: {
        id: studentId
      }
    });
  }

}
