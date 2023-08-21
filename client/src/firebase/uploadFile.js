import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
//import { storage } from './config'
//import storage from './config,js';
import { storage } from './config.js';


const uploadFile = (file, filePath) => {
  //console.log('file uploaded')
  return new Promise(async (resolve, reject) => {
    //console.log('file uploaded')
    const storageRef = ref(storage, filePath);
    //console.log('fileuploaded')
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
      
    } catch (error) {
      reject(error);
    }
  });
};

export default uploadFile;