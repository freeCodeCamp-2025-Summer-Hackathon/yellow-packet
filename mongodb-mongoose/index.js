import mongoose from 'mongoose'


mongoose.connect("mongodb+srv://<YOUR-USERNAME>:<YOUR-PASSWORD>@cluster0.sae5i2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    console.log(':white_check_mark: MongoDB connected!');
      })
     .catch((error) => {
      console.log(':x: Connection failed:', error);
     });
/*
const fakeDataAdd1 = new fakeDataAdd1({
    dataType: 'animal',
    petName: 'Curious George',
    animalType: 'monkey',
    animalBreed: 'chimpanzee',
    shelterName: 'Pixie Project',
    postalZip: '97202',

});

await fakeDataAdd1.save();

const firstFakeData = await fakeDataAdd1({});
console.log(firstFakeData); */

