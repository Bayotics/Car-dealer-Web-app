const moment = require('moment');
const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const trade1Id = mongoose.Types.ObjectId();
const trade2Id = mongoose.Types.ObjectId();
const trade3Id = mongoose.Types.ObjectId();
const trade4Id = mongoose.Types.ObjectId();
const trade5Id = mongoose.Types.ObjectId();
const trade6Id = mongoose.Types.ObjectId();

const thread1Id = mongoose.Types.ObjectId();
const thread2Id = mongoose.Types.ObjectId();
const thread3Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();
const post5Id = mongoose.Types.ObjectId();

const category1Id = mongoose.Types.ObjectId();
const category2Id = mongoose.Types.ObjectId();
const category3Id = mongoose.Types.ObjectId();
const category4Id = mongoose.Types.ObjectId();
const category5Id = mongoose.Types.ObjectId();

const brand1Id = mongoose.Types.ObjectId();
const brand2Id = mongoose.Types.ObjectId();
const brand3Id = mongoose.Types.ObjectId();
const brand4Id = mongoose.Types.ObjectId();
const brand5Id = mongoose.Types.ObjectId();

const price1Id = mongoose.Types.ObjectId();
const price2Id = mongoose.Types.ObjectId();
const price3Id = mongoose.Types.ObjectId();
const price4Id = mongoose.Types.ObjectId();
const price5Id = mongoose.Types.ObjectId();


module.exports = {
  "trades": [
     {
      "_id": trade1Id,
      "location": "Bratislava, SK",
      "processedLocation": "bratislavask",
      "title": "Honda civic 2022",
      "priceTag" : "1000000",
      "whatsApp" : "09031360523",
      "image": "https://static.fzinternal.com/dealers/60a3c971ba90d.jpg",
      "description": "Honda for sale",
      "shortInfo": "Come and buy car",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(2, 'days').toISOString(),
      // "timeFrom": "14:00",
      // "timeTo": "18:00",
      "joinedPeopleCount": 1,
      "status": "active",
      "category": category1Id,
      "price" : price1Id,
      "brand" : brand4Id,
      "joinedPeople": [user2Id],
      "tradeCreator": user1Id
    },
    {
      "_id": trade2Id,
      "location": "New York, US",
      "processedLocation": "newyorkus",
      "title": "Honda Accord 2018",
      "priceTag" : "2000000",
      "whatsApp" : "09031360523",
      "image": "https://imageio.forbes.com/blogs-images/kbrauer/files/2017/10/2018-Honda-Accord-Sport-2.0T-Red-Driving.jpg?fit=bounds&format=jpg&width=960",
      "description": "Honda evil spirit for sale",
      "shortInfo": "Come and buy car",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(7, 'days').toISOString(),
      // "timeFrom": "08:00",
      // "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category2Id,
      "price" : price2Id,
      "brand" : brand4Id,
      "joinedPeople": [user1Id, user3Id],
      "tradeCreator": user2Id
    },
    {
      "_id": trade3Id,
      "location": "Lisbon, PT",
      "processedLocation": "lisbonpt",
      "title": "Lexus 450h 2021",
      "priceTag" : "5000000",
      "whatsApp" : "09031360523",
      "image": "https://suv2021.com/wp-content/uploads/2020/07/2021-Lexus-RX-450h.jpg",
      "description": "Very neat lexus 450 for sale",
      "shortInfo": "Come and buy lexus",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(7, 'days').toISOString(),
      // "timeFrom": "08:00",
      // "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category5Id,
      "price" : price3Id,
      "brand" : brand3Id,
      "joinedPeople": [user1Id, user3Id],
      "tradeCreator": user2Id
    },
    {
      "_id": trade4Id,
      "location": "Los Angeles, US",
      "processedLocation": "losangelesus",
      "title": "Benz 4matic 2020",
      "whatsApp" : "09031360523",
      "priceTag" : "10000000",
      "image": "https://i.gaw.to/content/photos/40/45/404575_2020_Mercedes-Benz_CLA-Class.jpg?460x287",
      "description": "Neat Mercedes benz 4matic 2020 for sale. Hmu",
      "shortInfo": "Come and buy benz abeg",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(7, 'days').toISOString(),
      // "timeFrom": "08:00",
      // "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category1Id,
      "price" : price4Id,
      "brand" : brand2Id,
      "joinedPeople": [user1Id, user3Id],
      "tradeCreator": user2Id
    },
    {
      "_id": trade5Id,
      "location": "Berlin, GE",
      "processedLocation": "berlinge",
      "title": "2021 BMW X2",
      "priceTag" : "8000000",
      "whatsApp" : "09031360523",
      "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-x2-mmp-1-1601402776.jpg?crop=1.00xw:0.750xh;0,0.127xh&resize=1200:*",
      "description": "Come and buy moto",
      "shortInfo": "This is a very neat car.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(7, 'days').toISOString(),
      // "timeFrom": "08:00",
      // "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category2Id,
      "price" : price5Id,
      "brand" : brand5Id,
      "joinedPeople": [user1Id, user3Id],
      "tradeCreator": user2Id
    },
    {
      "_id": trade6Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Ford Expedition 2021",
      "priceTag" : "7000000",
      "whatsApp" : "09031360523",
      "image": "https://cdn.jdpower.com/JDPA_2021%20Ford%20Expedition%20Platinum%20Gray%20Front%20Quarter%20View.jpg",
      "description": "Ford for sale",
      "shortInfo": "Come and buy ford",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      // "startDate": moment().add(7, 'days').toISOString(),
      // "timeFrom": "08:00",
      // "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "price" : price1Id,
      "brand" : brand3Id,
      "joinedPeople": [user1Id, user3Id],
      "tradeCreator": user2Id
    }
  ],
  "users": [
    {
      "_id": user1Id,
      "avatar": "https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg",
      "email": "abdullahi@gmail.com",
      "name": "Abdullahi Osomo",
      "info": "Bla bla bla bla",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "Ab99",
      "password": "testtest",
      joinedTrades: [trade2Id, trade3Id, trade4Id, trade5Id, trade6Id]
    },
    {
      "_id": user2Id,
      "avatar": "https://www.clipartmax.com/png/middle/195-1956720_%5B-img%5D-avatar.png",
      "email": "abolaji@gmail.com",
      "name": "Abolaji Abdullahi",
      "info": "Bla bla bla bla",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "Bayospending",
      "password": "testtest1",
      joinedTrades: [trade1Id]
    },
    {
      "_id": user3Id,
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU",
      "email": "bayotics.com",
      "name": "Kevin Rock",
      "info": "I have a famous name",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "username": "bayotics",
      "password": "testtest2",
      joinedTrades: [trade2Id, trade3Id, trade4Id, trade5Id, trade6Id]
    }
  ],
  "threads": [
    {
      "_id": thread1Id,
      "title": "Should I take some food?",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "trade": trade1Id,
      "user": user1Id,
      "posts": [post1Id, post2Id]
    },
    {
      "_id": thread2Id,
      "title": "I dont know what to think about this.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "trade": trade2Id,
      "user": user2Id,
      "posts": [post3Id, post4Id]
    },
    {
      "_id": thread3Id,
      "title": "Here should be something about thread 3",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "trade": trade2Id,
      "user": user2Id,
      "posts": [post5Id]
    }
  ],
  "posts": [
    {
      "_id": post1Id,
      "text": "I will be late",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread1Id, 
      "user": user1Id
    },
    {
      "_id": post2Id,
      "text": "I like turtles",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread1Id,
      "user": user1Id
    },
    {
      "_id": post3Id,
      "text": "I will be late",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread2Id,
      "user": user2Id,
    },
    {
      "_id": post4Id,
      "text": "I like turtles",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread2Id,
      "user": user2Id,
    },
    {
      "_id": post5Id,
      "text": "I like writing about nothing",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "thread": thread3Id,
      "user": user2Id,
    }
  ],
  "categories": [
    {
      "_id": category1Id,
      "name": "Convertible",
      "image": "https://static.tcimg.net/vehicles/primary/3329ad05d0a366af/2021-Mercedes-Benz-AMG_GT-silver-full_color-driver_side_front_quarter.png"
    },{
      "_id": category2Id,
      "name": "Sedan",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/9eb880fa-f0d3-4471-8c23-547b5d1fb3a9/3fba41df-5999-4ad5-96dc-459b3f4b78ee.png"
    },
    {
      "_id": category3Id,
      "name": "SUV",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/a9d82472-18d8-47bf-8efd-1074891f641d/a2ad0690-2a06-447d-b875-93934b14787b.png"
    },
    {
      "_id": category4Id,
      "name": "Vans",
      "image": "https://static.tcimg.net/vehicles/primary/ef17a1495cc6ad30/2022-Chrysler-Pacifica-gray-full_color-driver_side_front_quarter.png"
    },
    {
      "_id": category5Id,
      "name": "Muscle",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/f3da061b-cfba-4795-95f7-6d19c0ae3d73/b17936a2-3886-4cdb-b3a2-ef7436be9e51.png"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "Pickup",
      "image": "https://platform.cstatic-images.com/medium/in/v2/stock_photos/20f936ac-e1f1-4ce9-8faf-4e10b61889ee/9b050979-ccf5-4c4a-8aad-4b9c7809b010.png"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "Hatchback",
      "image": "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/f5755b05-2baa-4b6b-8ec4-9a003db4dc85/424e0afa-e58d-4174-9c99-489bb690b0df.png"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "Others",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/2fdd1601-41e8-4eb5-9501-5d3694b2c5af/b58406ff-6de6-4345-8776-bace68e228a0.png"
    }
  ],
  "brands": [
    {
      "_id": brand1Id,
      "name": "Toyota",
      "image": "https://www.freeiconspng.com/minicovers/toyota-car-logo-png-0.png"
    },
    {
      "_id": brand2Id,
      "name": "Mercedes",
      "image": "https://freepngimg.com/thumb/mercedes_benz/36521-9-mercedes-benz-hd-thumb.png"
    },
    {
      "_id": brand3Id,
      "name": "Ford",
      "image": "https://www.carlogos.org/car-logos/ford-logo-2017-show.png"
    },
    {
      "_id": brand4Id,
      "name": "Honda",
      "image": "https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-png-picture-20.png"
    },
    {
      "_id": brand5Id,
      "name": "Nissan",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/2378px-Nissan-logo.svg.png"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "Lexus",
      "image": "https://wallpaperaccess.com/full/1974456.jpg"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "BMW",
      "image": "https://i.pinimg.com/originals/da/2e/8d/da2e8dd3a98bb396db73301932157ab9.png"
    },
    {
      "_id": mongoose.Types.ObjectId(),
      "name": "Others",
      "image": "https://i.pinimg.com/736x/6d/cc/f2/6dccf2937c808f0a22f82e1be59d5a91.jpg"
    }
  ],
  "prices": [
    {
      "_id" : price1Id,
      "name": "< ₦1m",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/9546e54b-f7e7-4ebd-b2d6-4930c9141079/86b465d3-d6f8-4919-87d4-7203106c31ce.png"
    },
    {
      "_id" : price2Id,
      "name": "₦1m - ₦2m",
      "image": "https://platform.cstatic-images.com/medium/in/v2/stock_photos/82ade758-2efe-4764-90bc-45229fdb28a9/c9896353-f768-4b07-8bd3-3aaf4d1c4d3f.png"
    },
    {
      "_id" : price3Id,
      "name": "₦2m - ₦5m",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/ae200b79-9c82-455a-98d6-07e825f549e6/019e3d6c-6cf2-482d-a88b-6a7e46966b7d.png"
    },
    {
      "_id" : price4Id,
      "name": "₦5m - ₦10m",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/c560afaf-fdc9-46fb-933d-39c8bd01a76a/3a0550ce-9641-4c52-bc63-1e86ebba857f.png"
    },
    {
      "_id" : mongoose.Types.ObjectId(),
      "name": "> ₦20m",
      "image": "https://platform.cstatic-images.com/large/in/v2/stock_photos/2fdd1601-41e8-4eb5-9501-5d3694b2c5af/b58406ff-6de6-4345-8776-bace68e228a0.png"
    },
    {
      "_id" : price5Id,
      "name": "₦10m - 20m",
      "image": "https://platform.cstatic-images.com/medium/in/v2/stock_photos/ff8eeab5-7eb7-4dc1-879f-c7399deb0de1/4f0cbac9-1451-47a8-b5ed-bfd0120ceb1a.png"
    },
   
  ]

};
