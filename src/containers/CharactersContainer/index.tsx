import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Characters from "../../components/Characters";
import Loader from "../../components/UI/Loader";
import { CharactersInfo, filterCharacters, getCharacters } from "../../store/character";

interface RootState {
  character: any;
}

const CharactersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [_characters, setCharacters] = useState([]);
  const [_charactersInfo, setCharactersInfo] = useState<CharactersInfo | null>(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBySpecies, setFilterBySpecies] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [filterByGender, setFilterByGender] = useState("");
  const itemsPerPage = 10;

  const { isLoading, charactersInfo, characters } = useSelector(
    (state: RootState) => state.character,
    shallowEqual
  );

  useEffect(() => {
    if (_charactersInfo) setCount(Math.floor(_charactersInfo.count / itemsPerPage));
  }, [_charactersInfo]);

  useEffect(() => {
    dispatch(getCharacters(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (charactersInfo) setCharactersInfo(charactersInfo);
    if (characters) setCharacters(characters);
  }, [charactersInfo, characters]);
  
  useEffect(() => {
    if (
      filterBySpecies !== "" ||
      filterByStatus !== "" ||
      filterByGender !== ""
    ) {
      dispatch(filterCharacters(filterBySpecies, filterByStatus, filterByGender));
    }
  }, [filterBySpecies, filterByStatus, filterByGender, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Characters
      count={count}
      characters={_characters}
      onCurrentPage={setCurrentPage}
      currentPage={currentPage}
      onFilterBySpecies={setFilterBySpecies}
      onFilterByStatus={setFilterByStatus}
      onFilterByGender={setFilterByGender}
      filterBySpecies={filterBySpecies}
      filterByStatus={filterByStatus}
      filterByGender={filterByGender}
    />
  );
};

export default CharactersContainer;
