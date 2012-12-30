module.exports=init;

/*global document*/

function init(fn) {
  if (document.readyState === "complete") {
    fn();
  } else {
    document.onreadystatechange = function() {
      if (document.readyState === "complete") {
        fn();
      }
    };
  }
}