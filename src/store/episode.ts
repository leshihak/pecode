import { createSlice } from "@reduxjs/toolkit";

export interface Episode  {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
  created: string;
}

export interface EpisodesInfo {
  count: number,
  pages: number,
  next: string,
  prev: string;
}

type EpisodeState = {
  episodes: Episode[];
  episodesInfo: EpisodesInfo | null;
  isLoading: boolean;
  error: any;
};

const initialState: EpisodeState = {
  episodes: [],
  episodesInfo: null,
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: "episode",
  initialState,
  reducers: {
    getEpisodesRequest(state) {
      state.isLoading = true;
    },

    setEpisodes(state, action) {
      state.episodes = action.payload;
      state.isLoading = false;
    },

    setEpisodesInfo(state, action) {
      state.episodesInfo = action.payload;
      state.isLoading = false;
    },

    getEpisodesFailed(state) {
      state.isLoading = false;
    },

    getEpisodesSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setEpisodes,
  getEpisodesRequest,
  getEpisodesFailed,
  getEpisodesSuccess,
  setEpisodesInfo,
} = actions;

export const getEpisodes = (page: number) => async (dispatch: any) => {
  try {
    dispatch(getEpisodesRequest());
    const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setEpisodes(data.results));
      dispatch(setEpisodesInfo(data.info));
    }

    dispatch(getEpisodesSuccess());
  } catch (error) {
    dispatch(getEpisodesFailed());
  }
};

export const filterEpisodes= (
  name: string,
) => async (dispatch: any) => {
  try {
    const url = `https://rickandmortyapi.com/api/episode${
      name !== ""
        ? `?name=${name}`
        : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();

      if (data.error) {
        dispatch(setEpisodes([]));
        dispatch(setEpisodesInfo(1));
      } else {
        dispatch(setEpisodes(data.results));
        dispatch(setEpisodesInfo(data.info));
      }
    }
  } catch (error) {
    dispatch(getEpisodesFailed());
  }
};


export default reducer;
