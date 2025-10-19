// converts 'Names Like This' into 'names-like-this'
export default function canonical(str) {
  return str
    .split(' ')
    .map(s => s.toLowerCase())
    .join('-');
}
