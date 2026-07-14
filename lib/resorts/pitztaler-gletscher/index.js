export default {
  // lift table in #liftStatus (pistes live in an identical table elsewhere);
  // status is a colored dot - class "tableDot closed" or bare "tableDot" (open)
  selector: '#liftStatus table tbody tr',
  parse: {
    name: '0',
    status: {
      child: '3/0',
      attribute: 'class',
      fn: c => (c?.includes('closed') ? 'closed' : 'open')
    }
  }
};
