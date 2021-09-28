import axios from 'axios';
import { EVENTS_END_POINTS } from '../../config';

const communicationService = {
  getEvents: (body, onSuccess, onError) =>
    axios
      .get(EVENTS_END_POINTS)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error.response ?? error.request ?? error))
};

export default communicationService;
