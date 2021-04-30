import { Injectable } from '@angular/core';

declare var JsStore: any;


@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor() { }

  createDb() {
    var tbl = {
     Name: 'products',
     Columns: [
     { Name: 'Id', PrimaryKey: true, AutoIncrement: true },
     { Name: 'ItemName', NotNull: true },
     { Name: 'Price', DataType: 'number' },
     ]};
    var tbl2 = {
     Name: 'employees',
     Columns: [
     { Name: 'Id', PrimaryKey: true, AutoIncrement: true },
     { Name: 'eid', NotNull: true },
     { Name: 'Service', NotNull: true, DataType: 'number' },
     { Name: 'Quantity',NotNull: true, DataType: 'number' }
     ]};
    var Db = { Name: 'sample', Tables: [tbl2, tbl] };
    var Connection = new JsStore.Instance().createDb(Db);
   }

   getSchema() {
    var DbName = 'sample';
    var connection = new JsStore.Instance();
    connection.openDb(DbName);
    JsStore.getDbSchema(DbName, function (schema) {
     console.log(schema)
    });
   }

 selectQuery(Connection){
  Connection.select({
    From: "Table_Name",
    })
    .then(function (results){
    console.log(results);
    })
    .catch(function (error) {
    alert(error.Message);
    });
   }


//  To update Data in DB-
   updatequery(Connection) {
      Connection.update({
    In: "Table_Name",
    Set: {
    Column1:{'+': 'value1' },
    //Supported operators are - +, -, *, /
    Column2: 'value2'
    },
    Where: {
    Column3: 'some_value',
    Column4: 'some_another_value'
    },
    OnSuccess:function (results){
    //results will contains no of rows updated.
    console.log(results);
    },
    OnError:function (error) {
    alert(error.value);
    }
    })
   }

//  To count record in DB-
   countrecords(Connection) {
    Connection.count({
    From: "Table_Name",
    Where: {
    Column1: 'some_value',
    Column2: 'some_another_value'
    },
    OnSuccess:function (results){
    //results will be array of objects.
    console.log(results);
    },
    OnError:function (error) {
    alert(error.value);
    }
    })
   }

//  for searching in DB-
   likequery(Connection) {
    // Like 'a%' : Finds any values that starts with "a".
    // Like '%a' : Finds any values that ends with "a".
    // Like '%a%' : Finds any values that contains "a" at any position.

    // other where conditions
        // Where: {
    // Column_Name:{
    // In:[value1, value2, ...]
    // }
    // Where: {
    // Column_Name: {'>':some_value}, //" < " ," >= " ," <= "," - "(Finds value between two supplied value)
    // },
    // Where: {
    // Column_Name: {
    // '-':{
    // Low : value1
    // High : value2
    // }
    // },

    Connection.select({
    From: "Table_Name",
    Where: {
    Column_Name: {Like:'a%'},
    },
    OnSuccess:function (results){
    //results will be array of objects.
    console.log(results);
    },
    OnError:function (error) {
    alert(error.value);
    }
    })
   }

  // JsStore supports three joins - Inner, Left, Right.
   innerjoin(Connection) {
    // Select * From Table1;
    // Inner Join Table2
    // On Table1.common_field = Table2.common_field
    // Where
    // Table1.Column1=some_value
    // And
    // Table2.Column1=some_another_value

    var JoinLogic={
    Table1:{
    Table:'table1_name',
    Column:'table1.common_field',
    Where:{
    Column1:'some_value'
    }
    },
    Join:'inner',
    Table2:{
    Table:'table2_name',
    Column:'table2.common_field',
    Where:{
    Column1:'some_another_value'
    }
    }
    }

    Connection.select({
    From: JoinLogic,
    OnSuccess:function (results){
    //results will contains objects of all tables at a index.
    console.log(results);
    },
    OnError:function (error) {
    alert(error.value);
    }
    })
   }

//  To clear data of any table-
   cleartbl(Connection) {
    Connection.clear('table_name',function (){
    console.log('data cleared successfully');
    },
    function (error) {
    alert(error.value);
    });
   }

//  To export data of table-
   exporttbl(Connection) {
    Connection.exportJson({
    From: "Table_Name",
    Where: {
    Column1: 'some_value',
    Column2: 'some_another_value'
    },
    OnSuccess:function (){
    console.log('Successfully exported');
    },
    OnError:function (error) {
    alert(error.value);
    }
    });
  }

   jsmisc(value) {
    JsStore.isNull(value)
    JsStore.enableLog()
    JsStore.disableLog()
   }

   delcon(connection) {
    connection.delete({
     From: 'Events',
     OnSuccess: function (rowsDeleted) {
      alert(rowsDeleted + ' record deleted');
     },
     OnError: function (err) {
      console.log(err);
      alert(err.Message);
     }
    });
   }

}
