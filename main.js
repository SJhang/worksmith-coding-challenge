window.onload = () => {
  const totalAmount = document.querySelector('.inputAmount');
  const chboxButtons = document.querySelectorAll('.checkbox-button');
  const submitForm = document.querySelector('form.panel-body');

  const validateTotal = input => {
    // regex match to validate input amount
    let regex = /^((\d+\.?|\.(?=\d))?\d{0,2})$/;
    return input.value.match(regex) ? parseFloat(input.value) : alert('Wrong Input Value');
  }

  const coinAmount = coin => {
    let coinName = coin.classList[1];
    // for easier computation, each coins return int value in cents
    switch (coinName) {
      case 'quarter': return 25;
      case 'dime': return 10;
      case 'nickel': return 5;
      case 'penny': return 1;
      case 'optional':
        let value = coin.nextElementSibling.value;
        return (
          value ?
          (
            (value <= .99 && value >= 0.02 && value != .25 || value != .10 || value != .05) ?
            value * 100 : alert('wrong value')
          ) :
          alert('insert value')
        )
    }
  }

  const makeChange = (total, coins) => {
    if (total === 0) return [];
    // this method relies on coins being in descending order
    let bestChange = null;
    let change = []

    for (var i = 0; i < coins.length; i++) {
      let coin = coins[i];
      debugger;
      if (coin > total) {
        debugger
        continue;
      } else {
        debugger;
        let changeForRest = makeChange(total-coin, coins);
        change = [coin].concat(changeForRest);
      }

      if (!bestChange || change.length < bestChange.length ) {
        bestChange = change
      }
    }

    return bestChange
  }

  // runs when submit button is hit
  const handleSubmit = (e) => {
    e.preventDefault();
    let coins = [];
    let total = validateTotal(totalAmount);
    total = total * 100; // for easier computation, change total in cents

    chboxButtons.forEach(btn => {
      if (btn.checked) coins.push(coinAmount(btn));
    })
    coins.sort((a,b) => b-a);
    let a = makeChange(total, coins)
    debugger;
    return false;
  }


  submitForm.addEventListener("submit", handleSubmit);
}
