const { EventSchema } = require("../../model");

const { Events } = require("../../model/event/events");

const EventService = {
    find : async () =>
    {
        const data = await EventSchema.find({});

        return data;
    },
    create : async (data) =>
    {
        console.log(data);
        try
        {
            const event = new EventSchema({
                Summary     : data.summary,
                Location    : data.location,
                Description : data.description,
                imageURL    : data.imageURL,
                Start       : data.start,
                End         : data.end,
                Attendees   : [ data.attendees ],
                Category    : data.category,

            });

            console.log(event);

            // create category
            const result = await event.save();

            // console.log(data);

            return result;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = EventService;
