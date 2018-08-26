const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
      companyName:  {type: String},
      address:      {type: String, default: ''},
      city:         {type: String, default: ''},
      country:      {type: String, default: ''},
      sector:       {type: String, default: ''},
      website:      {type: String, default: ''},
      admin:        {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      imageId:      {type: String, default: ''},
      imageVersion: {type: String, default: ''},
      rating:[{
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            culture: {type: Number, default: 0},
            benefits: {type: Number, default: 0},
            balance: {type: Number, default: 0},
            speed: {type: Number, default: 0},
            review: {type: String, default: ''},
            userOverall: {type: Number, default: 0},
            created: {type: Date, default: Date.now}
      }],
      totalStars: {type: Number, default: 0},
      ratingOverall: [Number],
      cultureTotal: [Number],
      benefitsTotal: [Number],
      balanceTotal: [Number],
      speedTotal: [Number],
      employees: [{
            employee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
      }]
});

module.exports = mongoose.model('Company', companySchema);