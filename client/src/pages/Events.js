import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import EVENTS from '../_mocks_/events';
import EventsSearch from '../components/_dashboard/event/EventsSearch';
import EventCard from '../components/_dashboard/event/EventCard';
import EventsSort from '../components/_dashboard/event/EventSort';
import communicationService from '../utils/communication/communication.service';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Events() {
  const [token, setToken] = useState('');

  const [eventList, setEventList] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setToken(code);
    }

    communicationService.getEvents(null, onSuccess, onError);
  }, []);

  const onSuccess = (response) => {
    console.log('success');
    console.log(response);
    setEventList(response.data.data.events);
  };

  const onError = (res) => {
    console.log('err');
    console.log(res);
  };

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <EventsSearch events={EVENTS} />
          <EventsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {eventList &&
            eventList.map((event, index) => (
              <EventCard key={event._id} post={event} index={index} token={token} />
            ))}
        </Grid>
      </Container>
    </Page>
  );
}
