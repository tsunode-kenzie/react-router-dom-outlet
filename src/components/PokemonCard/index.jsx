import React from 'react';
import { LinkStyled as Link } from './styles';

const PokemonCard = ({ name }) => {
  return (
    <li>
      <Link to={`${name}`}>
        <span>{name}</span>
        <span>Ver</span>
      </Link>
    </li>
  )
}

export default PokemonCard