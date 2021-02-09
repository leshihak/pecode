import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  filterLocations,
  getLocations,
  Location,
  LocationInfo,
} from "../../store/location";
import Locations from "../../components/Locations";
import Loader from "../../components/UI/Loader";

interface RootState {
  location: any;
}

const LocationsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [_locations, setLocations] = useState([]);
  const [_locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByName, setFilterByName] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [filterByDimension, setFilterByDimension] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    if (_locationInfo) setCount(Math.floor(_locationInfo.count / itemsPerPage));
  }, [_locationInfo]);

  const { locations, isLoading, locationInfo } = useSelector(
    (state: RootState) => state.location,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getLocations(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(filterLocations(filterByName, filterByType, filterByDimension));
  }, [filterByName, filterByType, filterByDimension, dispatch]);

  useEffect(() => {
    if (locations) setLocations(locations);
    if (locationInfo) setLocationInfo(locationInfo);
  }, [locations, locationInfo]);

  const createData = (name: string, type: string, dimension: string) => {
    return { name, type, dimension };
  };

  const rows = _locations.map((location: Location) =>
    createData(location.name, location.type, location.dimension)
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Locations
          rows={rows}
          count={count}
          onCurrentPage={setCurrentPage}
          currentPage={currentPage}
          onFilterByName={setFilterByName}
          onFilterByType={setFilterByType}
          onFilterByDimension={setFilterByDimension}
          filterByName={filterByName}
          filterByType={filterByType}
          filterByDimension={filterByDimension}
        />
      )}
    </>
  );
};

export default LocationsContainer;
