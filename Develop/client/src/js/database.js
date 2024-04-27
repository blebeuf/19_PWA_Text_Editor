import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Open a connection to an indexedDB database named 'jate' with a 'readwrite' transaction
    const jateDB = await openDB("jate", "readwrite");
    // Get the transaction's object store named 'jate'
    const store = tx.objectStore("jate");
    // Create a put request to store the content under the key 'id: 1'
    const request = store.put({ id: 1., value: content });
    // Await the result of the put request
    const result = await request;
    console.log("Success! Data has been saved to the database", result);
  } catch (error) {
    // Log an error message if there's an issue with the database operation
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
  const jateDB = await openDB("jate", 1);
  
  const tx = jateDB.transaction("jate", "readonly");
  
  const store = tx.objectStore("jate");
  
  const request = store.getAll();
  
  const result = await request;
  console.log("Success! Data can be read from database", result);
  return result;
  } catch (error) {
    // Log an error message if there's an issue with the database operation
    console.error('Error accessing the database', error);
  }
};

initdb();
