// stripe test pub key
Stripe.setPublishableKey('pk_test_rCj4CnnfXrHB4SabPngtC0K3');

// checkout form
var form = $("checkout-form");

// form submit
// func
// event
$form.submit(function(event){
  // $form find the button
  // disable it
  $form.find('button').prop("disabled", true);

  // Stripe
  // card
  // create token
  // num
  // cvc
  // month
  // year
  // call back
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-name').val() 
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
