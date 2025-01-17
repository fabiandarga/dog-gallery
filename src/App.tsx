import { useQuery, useQueryClient } from '@tanstack/react-query';
import './App.css'
import BreedSelector from './components/BreedSelector'
import ImageFrame from './components/ImageFrame';
import { useState } from 'react';
import ShuffleButton from './components/ShuffleButton';

const IMAGE_BY_BREED_URL = 'https://dog.ceo/api/breed/:breed/images/random';

async function fetchBreedImage(breed: string) {
  const res = await fetch(IMAGE_BY_BREED_URL.replace(':breed', breed));
  const data = await res.json();
  return data.message;
}

function App() {
  const queryClient = useQueryClient();
  const [selectedBreed, setSelectedBreed] = useState('');

  const { data, isLoading } = useQuery({ 
    queryKey: ['image', selectedBreed], 
    queryFn: () => fetchBreedImage(selectedBreed)
  });

  const handleBreedChange = (breed: string | undefined) => {
    console.log(`Selected breed: ${breed}`);
    if (!breed) {
      return;
    }
    setSelectedBreed(breed);
  }
  const handleShuffleClick = () => {
    queryClient.invalidateQueries({ queryKey: ['image', selectedBreed] });
  }

  return (
    <>
      <div className="mb-4">
        <BreedSelector onChange={handleBreedChange}/>
      </div>
      <div className="mb-4">
        <ImageFrame url={data} />
      </div>
      <div>
        <ShuffleButton onClick={handleShuffleClick} />
      </div>
    </>
  )
}

export default App
