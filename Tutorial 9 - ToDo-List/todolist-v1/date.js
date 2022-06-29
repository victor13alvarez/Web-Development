exports.getCompleteDate = function() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let date = new Date();
  return date.toLocaleDateString('en-UK', options);
}

exports.getDay = function() {
  const options = {
    weekday: 'long'
  };
  let date = new Date();
  return date.toLocaleDateString('en-UK', options)
}