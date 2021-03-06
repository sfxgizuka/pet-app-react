import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from './Results';

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  // const [animal, setAnimal] = useState("dog");
  //const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [animal, Setanimal] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

async function requestPets() {
  const { animals } = await pet.animals({
    location,
    breed,
    type: animal
  });
  setPets(animals || []);
}

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then((data) => {
      console.log(data);
      const value = data.breeds;
      const breedsNames = value.map(({ name }) => name);
      setBreeds(breedsNames);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form action="" onSubmit ={ (event)=>{
        event.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <Setanimal />
        <BreedDropdown />
        <button>Submit</button>
      </form>

      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;
