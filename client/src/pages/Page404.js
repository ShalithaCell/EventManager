import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const { gapi } = window;
  const CLIENT_ID = '462845284501-g5cc52qk18ror4i9n8afp077l7jsr481.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCDuz8AjfQxBL7EH3JMsj2xJBr60na9THs';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  const handleAddEvents = () => {
    console.log('Clicked');
    gapi.load('client:auth2', () => {
      console.log('Client loaded.');
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      });

      gapi.client.load('calender', 'v3', () => console.log('Loaded'));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: 'Google I/O 2021',
            location: '800 Howard St., San Francisco, CA 94103',
            description: "A chance to hear more about Google's developer products.",
            start: {
              dateTime: '2021-10-05T09:00:00-07:00',
              timeZone: 'Asia/Colombo'
            },
            end: {
              dateTime: '2021-10-06T17:00:00-07:00',
              timeZone: 'Asia/Colombo'
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
              ]
            }
          };
          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <RootStyle title="404 Page Not Found | Minimal-UI">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>
            <Button onClick={handleAddEvents} variant="contained" size="large" className="m-10">
              Add Event
            </Button>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
