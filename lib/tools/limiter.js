const { RateLimiter } = require('limiter');

module.exports = Limiter;

function Limiter(...args) {
  const items = argsToLimiters(args);
  return limit;

  function hasTokens() {
    return items.every(l => l.getTokensRemaining() > 0);
  }

  function removeToken() {
    return Promise.all(items.map(l => l.removeTokens(1)));
  }

  function limit(fn) {
    return hasTokens() ?
      removeToken().then(() => fn(), fn) :
      process.nextTick(fn, { fetchLater: true });
  }

  function argsToLimiters(args) {
    const rts = [];
    for (let i = 0; i < args.length; i += 2) {
      const rt = new RateLimiter({
        tokensPerInterval: args[i],
        interval: args[i + 1]
      });
      rts.push(rt);
    }
    return rts;
  }
}
