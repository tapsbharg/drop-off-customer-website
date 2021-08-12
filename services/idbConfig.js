
import { openDB, deleteDB, wrap, unwrap } from 'idb';



const dbPromise = openDB('admin', 1, {
    upgrade(db) {
      db.createObjectStore('admin_store');
    },
  });
  
const idb = {
    async get(key) {
      return (await dbPromise).get('admin_store', key);
    },
    async set(key, val) {
      return (await dbPromise).put('admin_store', val, key);
    },
    async delete(key) {
      return (await dbPromise).delete('admin_store', key);
    },
    async clear() {
      return (await dbPromise).clear('admin_store');
    },
    async keys() {
      return (await dbPromise).getAllKeys('admin_store');
    },
};

export default idb;