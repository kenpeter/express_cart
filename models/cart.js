// cart
// has all items this.items[id] = {item: item, qty: ?, price: ?}
// items is obj, not array
// has total qty
// has total price
// cart has no collections
// it has add func and gen array func
module.exports = function Cart(oldCart) {
  // this, this ojb
  // items
  // old cart
  // items
  this.items = oldCart.items || {};
  
  // this
  // total qty
  // old cart
  // total qty
  this.totalQty = oldCart.totalQty || 0;

  // this
  // total price
  // old cart
  // total price
  this.totalPrice = oldCart.totalPrice || 0;
  
  
  // this only add a single item
  // this add
  // func
  // item, the product
  // id, product id
  this.add = function(item, id) {
    // var
    // stored item
    // this
    // .items, this Cart property
    // [id]
    var storedItem = this.items[id];
    
    // never inside this cart obj
    if(!storedItem) {
      // here for each item, we extend item with qty and price.
      // stored item
      // this
      // items
      // [id]
      // this.items
      // this.totalQty
      // this.totalPrice
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
  
    // stored item
    // qty
    // ++
    storedItem.qty++;
    
    // stored item
    // price, total price in cart for same kind
    // storedItem.item === a single item
    // storedItem.qty === total item num of same kind
    // storedItem.price === total price of the same kind
    storedItem.price = storedItem.item.price * storedItem.qty;
    
    // total qty in the cart
    this.totalQty++;
    
    // this only adds a single item
    this.totalPrice += storedItem.item.price;
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
