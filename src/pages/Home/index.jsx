import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import api from "../../services/api";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Header from "../../components/Header";
import PokemonCard from "../../components/PokemonCard";

import { List, ContainerButton } from "./styles";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    api
      .get("pokemon", {
        params: {
          limit: 151,
          offset: searchParams.get('page') * 151,
        },
      })
      .then((response) => {
        const { results, next, previous } = response.data;

        setPokemons(results);
        setIsNextDisabled(!next);
        setIsPreviousDisabled(!previous);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <Header />
      <Container>
        <Outlet abacaxi={2} />
        <Outlet />

        <ContainerButton>
          <Button
            onClick={() => setSearchParams({ page: +searchParams.get('page') - 1 })}
            disabled={isPreviousDisabled}
            backgroundColor="#f10"
          >
            Previous
          </Button>
          <Button
            onClick={() => setSearchParams({ page: +searchParams.get('page') + 1 })}
            disabled={isNextDisabled}
            backgroundColor="#f10"
          >
            Next
          </Button>
        </ContainerButton>

        {loading ? (
          <span>Carregando...</span>
        ) : (
          <List>
            {pokemons?.map(({ name }) => (
              <PokemonCard key={name} name={name} />
            ))}
          </List>
        )}
      </Container>
    </>
  );
};

export default Home;
