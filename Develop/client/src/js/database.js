import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateSave')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateSave', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Open a connection to an indexedDB database named 'jate' with a 'readwrite' transaction
    const jateDb = await openDB('jate', 1);
    // Get the transaction's object store named 'jate'
    const tx = jateDb.transaction('jateSave', 'readwrite');

    const store = tx.objectStore('jateSave');
    // Create a put request to store the content under the key 'id: 1'
    const request = store.put({ jate: content });
    // Await the result of the put request
    const result = await request;
    console.log('Success! Data has been saved to the database', result);
  } catch (error) {
    // Log an error message if there's an issue with the database operation
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
  const jateDb = await openDB('jate', 1);
  
  const tx = jateDb.transaction('jateSave', "readonly");
  
  const store = tx.objectStore('jateSave');

  const request = store.getAll();
  
  const result = await request;
  console.log('Success! Data can be read from database', result);
  return result;
  } catch (error) {
    // Log an error message if there's an issue with the database operation
    console.error('Error accessing the database', error);
  }
};

initdb();
