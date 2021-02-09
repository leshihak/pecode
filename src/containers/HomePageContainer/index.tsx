import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import WatchListContainer from '../WatchListContainer';
import TabPanel from '../../components/UI/TabPanel';
import LocationsContainer from '../LocationsContainer';
import EpisodesContainer from '../EpisodesContainer';
import CharactersContainer from '../CharactersContainer';

const a11yProps = (index: any) => {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomePageContainer: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="one"
            label="Characters"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="Episodes" {...a11yProps('two')} />
          <Tab value="three" label="Locations" {...a11yProps('three')} />
          <Tab value="four" label="My watch list" {...a11yProps('four')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <CharactersContainer />
      </TabPanel>
      <TabPanel value={value} index="two">
        <EpisodesContainer />
      </TabPanel>
      <TabPanel value={value} index="three">
        <LocationsContainer />
      </TabPanel>
      <TabPanel value={value} index="four">
        <WatchListContainer />
      </TabPanel>
    </div>
  );
}

export default HomePageContainer;