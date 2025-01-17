import { useQuery } from '@tanstack/react-query';
import './App.css'
import BreedSelector from './components/BreedSelector'
import ImageFrame from './components/ImageFrame';
import { useState } from 'react';

const IMAGE_BY_BREED_URL = 'https://dog.ceo/api/breed/:breed/images/random';

async function fetchBreedImage(breed: string) {
  const res = await fetch(IMAGE_BY_BREED_URL.replace(':breed', breed));
  const data = await res.json();
  return data.message;
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState('');

  const { data, isLoading } = useQuery({ 
    queryKey: ['image', selectedBreed], 
    queryFn: () => fetchBreedImage(selectedBreed)
  });

  const handleBreedChange = (breed: string) => {
    console.log(`Selected breed: ${breed}`);
    setSelectedBreed(breed);
  }

  return (
    <>
      <div className="mb-4">
        <BreedSelector onChange={handleBreedChange}/>
      </div>
      <ImageFrame url={data} />
    </>
  )
}

export default App
