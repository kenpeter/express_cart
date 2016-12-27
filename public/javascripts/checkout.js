// stripe test pub key
Stripe.setPublishableKey('pk_test_rCj4CnnfXrHB4SabPngtC0K3');

// checkout form
var $form = $("#checkout-form");

// form submit
// func
// event
$form.submit(function(event){
  // $form find the button
  // disable it
  $form.find('button').prop("disabled", true);

  var number = $('#card-number').val();
  var cvc = $('#card-cvc').val();
  var exp_month = $('#card-expiry-month').val();
  var exp_year = $('#card-expiry-year').val();
  var name = $('#card-name').val();

  console.log("test credit info");
  console.log(number);
  console.log(cvc);
  console.log(exp_month);
  console.log(exp_year);
  console.log(name);

  // Stripe
  // card
  // create token
  // num
  // cvc
  // month
  // year
  // call back
  Stripe.card.createToken({
    number: number,
    cvc: cvc,
    exp_month: exp_month,
    exp_year: exp_year,
    name: name
  }, stripeResponseHandler);

  // no submit
  return false;
});


function stripeResponseHandler(status, response) {
  if(response.error) {
    // $ charge error
    // text
    // response
    // error
    // msg
    $("#charge-error").text(response.error.message);
    
    // $ charge error
    // remove class
    // hidden
    $("#charge-error").removeClass('hidden');
    
    // form
    // find
    // button
    // prop
    // disabled
    // true
    $form.find("button").prop("disabled", true);
    
  }
  else {
    // token
    // response
    // id
    var token = response.id;
    
    //test
    console.log("test token");
    console.log(token);
    
    // $form
    // append
    // $
    // input, type="hidden"
    // name
    // stripe
    // token
    // val
    // token
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    
    // $form
    // get 0
    // submit
    $form.get(0).submit();
  }

}
