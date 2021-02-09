import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Episodes from "../../components/Episodes";
import Loader from "../../components/UI/Loader";

import { Episode, EpisodesInfo, filterEpisodes, getEpisodes } from "../../store/episode";

interface RootState {
  episode: any;
}

const EpisodesContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [_episodes, setEpisodes] = useState([]);
  const [_episodesInfo, setEpisodesInfo] = useState<EpisodesInfo | null>(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByName, setFilterByName] = useState("");
  const itemsPerPage = 20;

  useEffect(() => {
    if (_episodesInfo) setCount(Math.floor(_episodesInfo.count / itemsPerPage));
  }, [_episodesInfo]);

  const { episodes, isLoading, episodesInfo } = useSelector(
    (state: RootState) => state.episode,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getEpisodes(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (episodesInfo) setEpisodesInfo(episodesInfo);
    if (episodes) setEpisodes(episodes);
  }, [episodesInfo, episodes]);

  useEffect(() => {
    if (filterByName !== "") {
      dispatch(filterEpisodes(filterByName));
    }
  }, [filterByName, dispatch]);

  const createData = (
    name: string,
    episode: string,
    url: string,
    created: string
  ) => {
    return { name, episode, url, created };
  };

  const rows = _episodes.map((episode: Episode) =>
    createData(
      episode.name,
      episode.episode,
      episode.url,
      episode.created
    )
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Episodes
      onCurrentPage={setCurrentPage}
      currentPage={currentPage}
      rows={rows}
      count={count}
      filterByName={filterByName}
      onFilterByName={setFilterByName}
    />
  );
};

export default EpisodesContainer;
