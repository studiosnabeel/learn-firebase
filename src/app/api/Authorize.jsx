'use client';
import { auth, googleProvider } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';

const Authorize = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser?.photoURL);

  return (
    <div>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <div className="flex flex-col gap-4 ">
        <button
          className="text-white border px-2 bg-gray-700 rounded-half "
          onClick={signIn}
        >
          Sign In
        </button>
        <button
          className="text-white border px-2 bg-gray-700 rounded-half "
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>

        <button
          className="text-white border px-2 bg-gray-700 rounded-half "
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Authorize;
