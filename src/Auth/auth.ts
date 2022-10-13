import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../Database/firebaseConfig';

export const createUser = (email = '', password = '') => {
   createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
         console.log(response.user);
      })
      .catch((error) => {
         alert(error.message); //FIXME: To error message
      });
};

export const signInUser = (email = '', password = '') => {
   signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
         console.log(response.user);
      })
      .catch((error) => {
         alert(error.message); //FIXME: To error message
      });
};
