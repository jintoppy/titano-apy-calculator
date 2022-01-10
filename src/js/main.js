(function () {
  const win = window
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  const tokenPriceLabel = document.getElementById('lbl-token-price');
  const initialUSDLabel = document.getElementById('lbl-initial-Dollar');
  const txtTokenAmount = document.getElementById('txtTokenAmount');
  const txtNumberOfDays = document.getElementById('txtNumberOfDays');
  const lblFinalTokenAmount = document.getElementById('lblFinalTokenAmount');
  const lblFinalDollarAmount = document.getElementById('lblFinalDollarAmount');

  let tokenPrice = 0;

  const setTokenValue = (res) => {
      tokenPrice = parseFloat(res.usdPrice);
      tokenPriceLabel.innerText = tokenPrice.toFixed(6);
      initialUSDLabel.innerText = "$0";
  };

  const getTokenValue = () => {
      const promise = fetch('https://deep-index.moralis.io/api/v2/erc20/0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f/price?chain=0x38', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'X-API-Key': 'nt7iGNZbNrRtx0VEYMbmzgCPtV1Tve0o6iUP70D5vQB4raJbxpRHTN9ztwazERps'
          }
      });

      promise
        .then(res => res.json())
        .then(setTokenValue);
  };

  const calculate = () => {
    tokenPrice = 0.1131;
    const tokenAmount = txtTokenAmount.value;
    const noOfDays = txtNumberOfDays.value;

    if(!tokenAmount || !noOfDays){
      return false;
    }

    initialUSDLabel.innerText = `$${(parseFloat(tokenAmount) * tokenPrice).toFixed(2)}`;
    
    const r = 0.000013189284
    const n = parseInt(noOfDays) * 48;
    const t = parseInt(noOfDays) * 1440;
    try {
      let P = parseFloat(tokenAmount)
      if (isNaN(P)) {
        lblFinalTokenAmount.innerText = "0";
        lblFinalDollarAmount.innerText = "$0";
      }
      else {
        let finalValue = P*((1 + r / n) ** (n * t))
        let finalUsdValue = finalValue * tokenPrice;
        lblFinalTokenAmount.innerText = parseFloat(finalValue.toFixed(4)).toLocaleString(); 
        lblFinalDollarAmount.innerText = `$${parseFloat(finalUsdValue.toFixed(2)).toLocaleString()}`;
      }
    } catch (error) {
      lblFinalTokenAmount.innerText = "0";
      lblFinalDollarAmount.innerText = "$0";
    }
  };

  document.querySelector('.calculator').addEventListener('keyup', calculate, true);

  getTokenValue();
}())
