export default {
  selector: '.lift_image',
  parse: {
    name: '../+',
    status: {
      child: '.',
      attribute: 'alt'
    }
  }
};
