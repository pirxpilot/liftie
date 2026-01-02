export default function addToTrip(resort) {
  const params = new URLSearchParams();
  params.set('stop[name]', resort.name);
  params.set('stop[coordinates][lon]', resort.ll[0]);
  params.set('stop[coordinates][lat]', resort.ll[1]);
  params.set('stop[url]', resort.href);
  params.set('stop[duration]', 7 * 60 * 60 * 1000);
  return params.toString();
}
