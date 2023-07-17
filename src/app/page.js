'use client';
import MovieList from '@/components/movielist/MovieList';
import Authorize from './api/Authorize';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Authorize />
      <MovieList />
    </main>
  );
}
