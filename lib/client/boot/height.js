import debounce from 'debounce';

function notify() {
  const widget = document.querySelector('.widget');
  if (!widget) {
    return;
  }
  window.parent.postMessage(
    {
      height: widget.scrollHeight,
      resort: window.location.pathname.split('/').pop()
    },
    '*'
  );
}

export default function postHeight() {
  if (window === window.parent) {
    // we are not embedded - nothing to do
    return;
  }
  notify();
  window.addEventListener('resize', debounce(notify, 300), true);
}
