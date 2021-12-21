module.exports = twitterIntent;

// see: https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview.html
function twitterIntent(button) {
  if (window.__twitterIntentHandler) { return; }

  button.addEventListener('click', handleIntent, false);
  window.__twitterIntentHandler = true;

  const width = 550;
  const height = 420;
  const winHeight = screen.height;
  const winWidth = screen.width;

  function handleIntent(e) {
    const left = Math.round((winWidth / 2) - (width / 2));
    let top = 0;

    if (winHeight > height) {
      top = Math.round((winHeight / 2) - (height / 2));
    }

    const options = [
      'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`
    ].join(',');

    window.open(button.href, 'intent', options);
    e.preventDefault();
  }
}

