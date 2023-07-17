'use client';
import { db, auth, storage } from '@/config/firebase';
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  //New Movie states
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //Update Movie title state
  const [updateTitle, setUpdateTitle] = useState('');

  //File upload states
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovieList = async () => {
    //read the data
    // set the movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  // getMovieList();
  useEffect(() => {
    getMovieList();
  }, []);

  //add movie helper function
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        userId: auth?.currentUser?.uid,
        title: newMovieTitle,
        year: newMovieYear,
        receivedOscar: isNewMovieOscar,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  //helper function for upload files
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-4">
      {movieList.map((movie) => (
        <div>
          <h3
            className="text-2xl"
            style={{ color: movie.receivedOscar ? 'green' : 'red' }}
          >
            {movie.title}
          </h3>
          <p className="text-sm font-light text-center text-gray-500">
            Date: {movie.year}
          </p>
          <button
            onClick={() => deleteMovie(movie.id)}
            className="text-white border px-2 bg-gray-700 rounded-half "
          >
            Delete Movie
          </button>

          <input
            onChange={(e) => setUpdateTitle(e.target.value)}
            placeholder="New Title..."
            className="ml-2 border-2 outline-none"
          />
          <button
            onClick={() => updateMovieTitle(movie.id)}
            className="text-white border px-2 bg-gray-700 rounded-half "
          >
            Update Title
          </button>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Movie title...."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date...."
          onChange={(e) => setNewMovieYear(Number(e.target.value))}
        />
        <div className="flex gap-2 text-gray-600">
          <input
            type="checkbox"
            checked={isNewMovieOscar}
            onChange={(e) => {
              setIsNewMovieOscar(e.target.checked);
            }}
          />
          <label htmlFor="">Received an Oscar</label>
        </div>
        <button
          className="text-white border px-2 bg-gray-700 rounded-half "
          onClick={onSubmitMovie}
        >
          Submit Movie
        </button>
      </div>
      {/* upload files from firebase storage */}
      <section>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button
          className="text-white border px-2 bg-gray-700 rounded-half "
          onClick={uploadFile}
        >
          Upload Files
        </button>
      </section>
    </div>
  );
};

export default MovieList;
