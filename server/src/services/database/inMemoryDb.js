const storage = require('node-persist');

const InMemoryDb = {
    init : async () =>
    {
        await storage.init();
    },
    save : async (key, value) =>
    {
        await storage.setItem(key, value);
    },
    get : async (key) =>
    {
        const data = await storage.getItem(key);

        return data;
    },
};

module.exports = InMemoryDb;
