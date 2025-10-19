import toTitleCase from 'to-title-case';

export default {
  selector: '.table-striped > .rand', // selector for lift information
  parse: {
    name: {
      child: '2',
      fn: toTitleCase
    },
    status: '0'
  }
};
