var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    local: {
      name: String,
      zipcode: Number,
      email: String,
      password: String
    }
  })


  id: 11507869,
  url: "http://www.bandsintown.com/event/11507869?app_id=YOUR_APP_ID&artist=Skrillex&came_from=233",
  datetime: "2016-07-08T19:00:00",
  ticket_url: "http://www.bandsintown.com/event/11507869/buy_tickets?app_id=YOUR_APP_ID&came_from=233",
  artists: [
  {
  name: "Skrillex",
  url: "http://www.bandsintown.com/Skrillex",
  mbid: "ae002c5d-aac6-490b-a39a-30aa9e2edf2b"
  }
  ],
  venue: {
  id: 3207321,
  url: "http://www.bandsintown.com/venue/3207321",
  name: "Ruissalo Park",
  city: "Turku",
  region: "15",
  country: "Finland",
  latitude: 60.45,
  longitude: 22.2833333
  },
  ticket_status: "available",
  on_sale_datetime: null


var Event = mongoose.model('Event', eventSchema)

module.exports = Event
