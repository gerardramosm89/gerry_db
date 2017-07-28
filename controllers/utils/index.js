// Adding a prototype to string to replace all occurrences using regex
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// This is for the server so that it can take in the string and remove the dashes and replace the spaces so that it can search in the DB by title
const unWrapURL = function (urlString) {
  let removedDashes = urlString.replaceAll('-', ' ');
  return removedDashes
}
module.exports = { unWrapURL };