import { Injectable } from '@angular/core';
import {   IDataBase,  DATA_TYPE,  ITable, Instance } from 'jsstore';

declare var JsStore: any;
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  connection;

  dbname = 'Angular_Demo';
  constructor() {
    this.connection =  new JsStore.Instance();
    // turn on jsstore log status - help you to debug
    // turn it off in production or when you dont need
    // this.connection.setLogStatus(true);
    this.initJsStore();
  }
  // get connection() {
  //   return IdbService.idbCon;
  // }

 initJsStore() {
  const csd = this;
  this.connection.isDbExist(this.dbname).then(isExist => {
    console.log(isExist, 'isExist');

    if (isExist) {
      csd.connection.openDb(this.dbname);
    } else {
     const dataBase = this.getDatabase();
     csd.connection.initDb(dataBase);
    }
   }).catch(err => {
    // this will be fired when indexedDB is not supported.
    alert(err.message);
   });
  }

// getDbSchema
 private getDatabase() {
  const tblProduct = {
    name: 'Students',
    columns: {

        // Here "Id" is name of column
        id: { primaryKey: true, autoIncrement: true },
        name:  { notNull: true, dataType: 'string' },
        gender:  { notNull: true, dataType: 'string' },
        city:  { notNull: true, dataType: 'string' },
        country:  { notNull: true, dataType: 'string' },
        // quantity : { notNull: true, dataType: 'number' }
    }
  };
  const tblProduc = {
    name: 'Student',
    columns: {

        // Here "Id" is name of column
        id: { primaryKey: true, autoIncrement: true },
        name:  { notNull: true, dataType: 'string' },
        gender:  { notNull: true, dataType: 'string' },
        city:  { notNull: true, dataType: 'string' },
        country:  { notNull: true, dataType: 'string' },
        // quantity : { notNull: true, dataType: 'number' }
    }
  };
  const fvds = [];
  fvds.push(tblProduct);
  fvds.push(tblProduc);

  const dataBase: IDataBase = {
    name: this.dbname,
    tables: fvds
   };
  return dataBase;
  }
}
