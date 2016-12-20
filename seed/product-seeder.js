var Product = require("../models/product.js");

var mongoose = require('mongoose');

// connect
mongoose.connect('localhost:27017/shopping');

// arr
var products = [
  new Product({
    imagePath: "http://cdn.iphonehacks.com/wp-content/uploads/2014/08/walking-dead-free.jpg",
    title: "Walking dead season 1",
    description: "good game",
    price: 4
  }),

  
  new Product({
    imagePath: "http://oceanofgames.com/wp-content/uploads/2013/08/grand-theft-auto-5-trailer.png",
    title: "GTA 5",
    description: "yoyo game",
    price: 14
  }),
  
  
  new Product({
    imagePath: "https://i.imgur.com/TUHkX3b.jpg",
    title: "Another GTA 5",
    description: "good game!!",
    price: 40
  }),
  
  
  new Product({
    imagePath: "http://www.rollingvideogamesnj.com/images/minecraft.jpg",
    title: "Mine craft",
    description: "AAA",
    price: 20
  }),
  
  
  new Product({
    imagePath: "http://www.gamereader.com/wp-content/uploads/2016/07/Tulula.jpg",
    title: "Tulula",
    description: "good game",
    price: 22
  }),
  
  
  new Product({
    imagePath: "http://www.freetechtricks.com/wp-content/uploads/2014/01/Latest-Top-Trending-Free-Android-Games-of-2014-Most-Downloaded-aNGRY-bIRD-gO.jpg",
    title: "Angry bird go",
    description: "good game",
    price: 44
  }),
  
  
  new Product({
    imagePath: "http://cdn.iphonehacks.com/wp-content/uploads/2014/08/walking-dead-free.jpg",
    title: "Walking dead season 1",
    description: "good game",
    price: 4
  }),
];


var done = 0;
for(var i=0; i < products.length; i++) {
  products[i].save(function(err, res){
    done++;
    if(done === products.length) {
      exit();
    }
  });

}


function exit() {
  mongoose.disconnect();
}
