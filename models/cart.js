// cart
// has all items this.items[id] = {item: item, qty: ?, price: ?}
// items is obj, not array
// has total qty
// has total price
// cart has no collections
// it has add func and gen array func
module.exports = function Cart(oldCart) {
  // old carts items
  this.items = oldCart.items || {};
  
  // old cart has total qty
  this.totalQty = oldCart.totalQty || 0;

  // old cart has total price
  this.totalPrice = oldCart.totalPrice || 0;
  
  
  // add
  // item and product id
  this.add = function(item, id) {
    // this
    // .items
    // [id]
    var storedItem = this.items[id];
    
    // no such item
    if(!storedItem) {
      // item: item
      // qty: 0, why 0? increment below
      // price: total price of same kind
      // so they are referenced with each, one changes, the other changes.
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
  
    // now here we add one, it can be empty or existing
    storedItem.qty++;
    
    // here we actually change the price of store item.
    storedItem.price = storedItem.item.price * storedItem.qty;
    
    // total qty in the cart
    this.totalQty++;
    
    // this only adds a single item
    this.totalPrice += storedItem.item.price;
    
    /*
    // what happend to this.items[id]
    console.log("test");
    console.log(storedItem);
    console.log(this.items[id]);
    */
  }
  
  // reduce an single item of same kind
  this.reduceByOne = function(id) {
    // product of same kind
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    
    // total
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    
    if(this.items[id].qty <= 0) {
      // so you can delete obj like this.
      delete this.items[id];
    }
  }
  
  // remove all items of same kind
  this.removeItem = function(id) {    
    // qty is total qty of same kind, see db
    this.totalQty -= this.items[id].qty;
    
    // price is total price of same kind, see db
    this.totalPrice -= this.items[id].price;
   
    // delete
    delete this.items[id]; 
  }
  
  
  this.generateArray = function() {
    // empty arr
    var arr = [];
    
    // for id in
    // this cart obj
    // items
    for(var id in this.items) {
      // array
      // push
      // push a single item into array
      arr.push(this.items[id]);
    }
    
    // return
    return arr;
  }
  
  
}
