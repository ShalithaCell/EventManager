import { useState } from 'react';
// material
import { Button, Typography, Container } from '@mui/material';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const { gapi } = window;
  const CLIENT_ID = '462845284501-g5cc52qk18ror4i9n8afp077l7jsr481.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCDuz8AjfQxBL7EH3JMsj2xJBr60na9THs';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  const [inputField, setInputField] = useState({
    summary: '',
    location: '',
    description: ''
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

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
            summary: inputField.summary,
            location: inputField.location,
            description: inputField.description,
            start: {
              dateTime: '2021-10-05T09:00:00-07:00',
              timeZone: 'Asia/Colombo'
            },
            end: {
              dateTime: '2021-10-06T17:00:00-07:00',
              timeZone: 'Asia/Colombo'
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }]
            // reminders: {
            //   useDefault: false,
            //   overrides: [
            //     { method: 'email', minutes: 24 * 60 },
            //     { method: 'popup', minutes: 10 }
            //   ]
            // }
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
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Events
        </Typography>
        <div>
          <input
            type="text"
            name="first_name"
            onChange={inputsHandler}
            placeholder="First Name"
            value={inputField.first_name}
          />

          <br />

          <input
            type="text"
            name="last_name"
            onChange={inputsHandler}
            placeholder="First Name"
            value={inputField.last_name}
          />

          <br />

          <input
            type="gmail"
            name="gmail"
            onChange={inputsHandler}
            placeholder="Gmail"
            value={inputField.gmail}
          />

          <br />

          <Button onClick={handleAddEvents} variant="contained" size="large" className="m-10">
            Add Event
          </Button>
        </div>
      </Container>
    </Page>
  );
}
