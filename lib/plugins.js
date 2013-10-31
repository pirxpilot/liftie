var plugins = Object.create(null);

function register(name, module) {
  plugins[name] = module;
}

function forEach(fn) {
  Object.keys(plugins).forEach(function(name) {
    fn(name, plugins[name]);
  });
}

exports.forEach = forEach;
exports.register = register;