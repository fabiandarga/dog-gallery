import './App.css'
import BreedSelector from './components/BreedSelector'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const handleBreedChange = (breed: string) => {
    console.log(`Selected breed: ${breed}`);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BreedSelector onChange={handleBreedChange}/>
    </QueryClientProvider>
  )
}

export default App
