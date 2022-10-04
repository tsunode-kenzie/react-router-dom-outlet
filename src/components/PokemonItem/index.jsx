import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Container } from "./styles";

const PokemonItem = ({abacaxi}) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);

  console.log(abacaxi);

  const { name } = useParams();

  useEffect(() => {
      api
        .get(`pokemon/${name}`)
        .then((response) => setCurrentPokemon(response.data));
  }, [name])

  if (!currentPokemon) {
    return null;
  }

  return (
    <Container>
      <img
        src={currentPokemon.sprites.front_default}
        alt={currentPokemon.name}
      />
      <span>{currentPokemon.name}</span>
    </Container>
  );
};

export default PokemonItem;
