import { useState } from 'react';
import axios from 'axios';

// material
import {
  Button,
  Typography,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';

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
    description: '',
    imageURL: '',
    start: '',
    end: '',
    attendees: [''],
    category: ''
  });

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleAddEvents = (e) => {
    console.log(inputField);

    console.log('Clicked');

    e.preventDefault();
    const event = {
      summary: inputField.summary,
      location: inputField.location,
      description: inputField.description,
      imageURL: inputField.imageURL,
      start: `${inputField.start}:00`,
      end: `${inputField.end}:00`,
      attendees: `[${inputField.attendees}]`,
      category: inputField.category
    };
    console.log(event);

    axios
      .post('http://localhost:5000/api/event/create', event)
      .then((response) => {
        console.log(response);
        alert('event created');
      })
      .catch((error) => {
        console.log(error.message);
      });

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
              dateTime: `${inputField.start}:00Z`,
              timeZone: 'Asia/Colombo'
            },
            end: {
              dateTime: `${inputField.end}:00Z`,
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
          <TextField
            className="mb-10"
            fullWidth
            label="Summary"
            type="text"
            name="summary"
            onChange={inputsHandler}
            placeholder="Summary"
            sx={{ width: 500, margin: 2 }}
            value={inputField.summary}
          />
          {/* <input
            type="text"
            name="summary"
            onChange={inputsHandler}
            placeholder="Summary"
            value={inputField.summary}
          /> */}
          <br />
          <TextField
            fullWidth
            label="Location"
            type="text"
            name="location"
            onChange={inputsHandler}
            placeholder="Location"
            sx={{ width: 500, margin: 2 }}
            value={inputField.location}
          />
          {/* <input
            type="text"
            name="location"
            onChange={inputsHandler}
            placeholder="Location"
            value={inputField.location}
          /> */}
          <br />
          <TextField
            fullWidth
            label="Description"
            type="text"
            name="description"
            onChange={inputsHandler}
            placeholder="Description"
            sx={{ width: 500, margin: 2 }}
            value={inputField.description}
          />
          {/* <input
            type="text"
            name="description"
            onChange={inputsHandler}
            placeholder="Description"
            value={inputField.description}
          /> */}
          <br />
          <TextField
            fullWidth
            label="Image URL"
            type="text"
            name="imageURL"
            onChange={inputsHandler}
            placeholder="Image URL"
            sx={{ width: 500, margin: 2 }}
            value={inputField.imageURL}
          />
          {/* <input
            type="text"
            name="imageURL"
            onChange={inputsHandler}
            placeholder="Image URL"
            value={inputField.imageURL}
          /> */}
          <br />
          {/* <TextField
            fullWidth
            label="Start date and Time"
            type="date"
            name="start"
            onChange={inputsHandler}
            placeholder="Start date and Time"
            value={inputField.start}
          /> */}
          <TextField
            id="datetime-local"
            label="Start date and Time"
            type="datetime-local"
            defaultValue="2021-11-24T10:30"
            sx={{ width: 500, margin: 2 }}
            name="start"
            onChange={inputsHandler}
            value={inputField.start}
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <input
            type="date"
            name="start"
            onChange={inputsHandler}
            placeholder="Start date and Time"
            value={inputField.start}
          /> */}
          <br />
          <TextField
            id="datetime-local"
            label="End date and Time"
            type="datetime-local"
            defaultValue="2021-11-25T10:30"
            sx={{ width: 500, margin: 2 }}
            name="end"
            onChange={inputsHandler}
            value={inputField.end}
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <TextField
            fullWidth
            label="End date and Time"
            type="date"
            name="end"
            onChange={inputsHandler}
            placeholder="End date and Time"
            value={inputField.end}
          /> */}
          {/* <input
            type="date"
            name="end"
            onChange={inputsHandler}
            placeholder="End date and Time"
            value={inputField.end}
          /> */}
          <br />
          <TextField
            fullWidth
            label="Attendies"
            type="gmail"
            name="gmail"
            onChange={inputsHandler}
            placeholder="Attendies"
            value={inputField.gmail}
            sx={{ width: 500, margin: 2 }}
          />
          {/* <input
            type="gmail"
            name="gmail"
            onChange={inputsHandler}
            placeholder="Attendies"
            value={inputField.gmail}
          /> */}
          <br />
          <TextField
            fullWidth
            label="Category"
            type="text"
            name="category"
            onChange={inputsHandler}
            placeholder="Category"
            value={inputField.category}
            sx={{ width: 500, margin: 2 }}
          />
          {/* <input
            type="text"
            name="category"
            onChange={inputsHandler}
            placeholder="Category"
            value={inputField.category}
          /> */}
          <br />
          <br />
          <Button
            onClick={handleAddEvents}
            variant="contained"
            size="large"
            className="m-10"
            sx={{ width: 500, margin: 2 }}
          >
            Add Event
          </Button>
        </div>
      </Container>
    </Page>
  );
}
