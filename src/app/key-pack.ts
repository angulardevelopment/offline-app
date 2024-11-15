import { set,get,keys } from 'idb-keyval';

ngOnInit() {
//all methods return promises
set('hello', 'world')
.then(() => console.log('It worked!'))
.catch(err => console.log('It failed!', err));

get('hello').then(val => console.log(val));
keys().then(keys => console.log(keys));
}