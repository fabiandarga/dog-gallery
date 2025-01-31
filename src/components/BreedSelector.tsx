import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";

type Breed = string;
type BreedSelectorProps = {
  onChange: (breed: Breed | undefined) => void;
}
type BreedsResult = Record<Breed, string[]>;

async function fetchBreedList() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  return data.message;
}

function convertBreedData(breeds: BreedsResult): string[] {
  const list: string[] = [];
  for (const breed in breeds) {
    if (breeds[breed].length === 0) {
      list.push(breed);
    } else {
      for (const subBreed of breeds[breed]) {
        list.push(`${breed}/${subBreed}`);
      }
    }
  }
  return list;   
}

export default function BreedSelector({ onChange }: BreedSelectorProps)  {
  const [value, setValue] = useState<Breed>();
  const { data, isLoading } = useQuery<BreedsResult>({queryKey: ['breed-list'], queryFn: fetchBreedList })
  const breeds = !data ? [] : convertBreedData(data);

  useEffect(() => {
    if (data) {
      setValue(Object.keys(data)[0]);
    }
  }, [data]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div>
    { isLoading
      ? (<p className="animate-pulse">Loading...</p>)
      : (
          <Select onValueChange={setValue} value={ value } >
           <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rasse auswählen" />
          </SelectTrigger>
          <SelectContent>
            { breeds.map((breed, index) => (
            <SelectItem key={index} value={breed}>{breed.replace('/', ' ')}</SelectItem>
            ))
            }
          </SelectContent>
        </Select>
    )}
    </div>
  );
};
