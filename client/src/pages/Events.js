// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import EVENTS from '../_mocks_/events';
import EventsSearch from '../components/_dashboard/event/EventsSearch';
import EventCard from '../components/_dashboard/event/EventCard';
import EventsSort from '../components/_dashboard/event/EventSort';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Events() {
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
          {EVENTS.map((event, index) => (
            <EventCard key={event.id} post={event} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
