const { EventSchema } = require("../../model");

const EventService = {
    find : async () =>
    {
        const data = await EventSchema.find({});

        return data;
    },
};

module.exports = EventService;
