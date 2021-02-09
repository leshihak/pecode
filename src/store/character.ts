import { createSlice } from "@reduxjs/toolkit";

export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface CharactersInfo {
  count: number,
  pages: number,
  next: string,
  prev: string;
}

type CharacterState = {
  characters: Character[];
  charactersInfo: CharactersInfo | null;
  isLoading: boolean;
  error: any;
};

const initialState: CharacterState = {
  characters: [],
  charactersInfo: null,
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: "character",
  initialState,
  reducers: {
    getCharactersRequest(state) {
      state.isLoading = true;
    },

    setCharacters(state, action) {
      state.characters = action.payload;
      state.isLoading = false;
    },

    setCharactersInfo(state, action) {
      state.charactersInfo = action.payload;
      state.isLoading = false;
    },

    getCharactersFailed(state) {
      state.isLoading = false;
    },

    getCharactersSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setCharacters,
  setCharactersInfo,
  getCharactersRequest,
  getCharactersFailed,
  getCharactersSuccess,
} = actions;

export const getCharacters = (page: number) => async (dispatch: any) => {
  try {
    dispatch(getCharactersRequest());
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setCharacters(data.results));
      dispatch(setCharactersInfo(data.info));
    }

    dispatch(getCharactersSuccess());
  } catch (error) {
    dispatch(getCharactersFailed());
  }
};

export const filterCharacters = (
  species: string,
  status: string,
  gender: string
) => async (dispatch: any) => {
  try {
    const url = `https://rickandmortyapi.com/api/character/${
      species !== ""
        ? `?species=${species}`
        : status !== ""
        ? `?status=${status}`
        : gender !== ""
        ? `?gender=${gender}`
        : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      
      dispatch(setCharacters(data.results));
    }
  } catch (error) {
    dispatch(getCharactersFailed());
  }
};

export default reducer;
