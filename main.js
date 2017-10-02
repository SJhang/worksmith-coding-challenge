window.onload = () => {
  const totalAmount = document.querySelector('.inputAmount');
  const chboxButtons = document.querySelectorAll('.checkbox-button');
  const submitForm = document.querySelector('form.panel-body');
  const displayResults = document.querySelector('.results');
  const resultPanel = displayResults.parentNode;

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
        let value = parseFloat(coin.nextElementSibling.value);
        return (
          value ?
          (
            (value <= .99 && value >= 0.02 && value != .25 || value != .10 || value != .05) ?
            Math.floor(value * 100) : alert('wrong value')
          ) :
          alert('insert value')
        )
    }
  }

  const makeChange = (total, coins) => {
    if (total === 0) return [];
    let bestChange = null;
    let change = []

    // loops through with a coin until the coin amount is greater than the total amount
    coins.some(coin => {
      // once the coin > total, move on to the next coin
      if (total < coin) return;
      // continue doesn't work with each(), forEach() loop in javascript
      // but some() return; works as continue

      let changeForRest = makeChange(total-coin, coins);
      change = [coin].concat(changeForRest);

      if (!bestChange || change.length < bestChange.length) {
        bestChange = change;
      }
    })

    return bestChange
  }

  const displayCoinCounts = (changes, coins) => {
    coins.forEach(coin => {
      let count = changes.filter(change => coin === change).length;
      displayResults.innerText += count ? `${count} ${matchCoin(coin/100)}\n` : ''
    })
  }

  const matchCoin = (cents) => {
    switch (cents) {
      case 0.25:
        return 'Quarter(s)';
      case 0.10:
        return 'Dime(s)';
      case 0.05:
        return 'Nickel(s)';
      case 0.01:
        return 'Penny(s)';
      default:
        return `${Math.floor(cents*100)} cents`;
    }
  }

  // runs when submit button is hit
  const handleSubmit = (e) => {
    e.preventDefault();

    // reset result panel
    if (displayResults.innerText) displayResults.innerText = "";
    resultPanel.classList.remove('panel-success');
    resultPanel.classList.add('panel-default');

    let coins = [];
    let total = validateTotal(totalAmount);
    total = Math.floor(total * 100); // for easier computation, change total in cents

    chboxButtons.forEach(btn => {
      if (btn.checked) coins.push(coinAmount(btn));
    })

    // sorts coins array in descending order
    coins.sort((a,b) => b-a);
    let changes = makeChange(total, coins)

    // render results
    if (changes.length) {
      // change the color of the panel
      resultPanel.classList.remove('panel-default');
      resultPanel.classList.add('panel-success');
      displayCoinCounts(changes, coins);
    }

    return false;
  }

  submitForm.addEventListener("submit", handleSubmit);
}
