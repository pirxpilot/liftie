export default {
  // both the lifts and the runs table have id="mpw-lifts" - anchor on the heading
  selector: '.elementor-widget-heading:contains(Alpine Lift Status) + .elementor-widget-shortcode #mpw-lifts tbody tr',
  parse: {
    name: '0',
    status: '1/0'
  }
};
