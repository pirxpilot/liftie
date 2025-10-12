const plugins = Object.create(null);

export function register(name, module) {
  plugins[name] = module;
}

export function forEach(fn) {
  Object.entries(plugins).forEach(([name, plugin]) => fn(name, plugin));
}
