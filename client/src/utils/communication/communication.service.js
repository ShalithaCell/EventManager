import axios from 'axios';
import { EVENTS_END_POINTS, LOGIN_END_POINTS, SHARE_POST_END_POINTS } from '../../config';

const communicationService = {
  getEvents: (body, onSuccess, onError) =>
    axios
      .get(EVENTS_END_POINTS)
      .then((response) => {
        console.log(response);
        onSuccess(response);
      })
      .catch((error) => onError(error.response ?? error.request ?? error)),
  auth: (body, onSuccess, onError) =>
    axios
      .get(LOGIN_END_POINTS)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error.response ?? error.request ?? error)),
  sharePost: (body, onSuccess, onError) =>
    axios
      .post(SHARE_POST_END_POINTS, body)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error.response ?? error.request ?? error))
};

export default communicationService;
