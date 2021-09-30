import faker from 'faker';

const events = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=BlazerSweater&eyeType=EyeRoll&eyebrowType=Default&mouthType=Eating&skinColor=Pale%27`
  },
  summary: 'Test',
  location: 'Test',
  description: 'Test',
  imageURL:
    'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
  start: Date.now(),
  end: Date.now(),
  attendees: ['shalitha', 'tkily'],
  category: 'Test'
}));

export default events;
