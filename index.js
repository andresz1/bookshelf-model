var fs        = require('fs');
var path      = require('path');

module.exports = function(bookshelf, dir) {
  var models = {};
  
  dir += dir.substr(-1) === '/' ? '' : '/';

  fs
  .readdirSync(dir).filter(function (file) 
  {
    return ((file.indexOf('.') !== 0) && (file.slice(-3) == '.js'));
  })
  .forEach(function(file) 
  {
    var model = require(path.join(dir, file))(bookshelf); 
    var name = file[0].toUpperCase() + file.slice(1, file.length - 3).replace(/_([a-z])/g, function (str) { 
      return str[1].toUpperCase(); 
    });
    
    models[name] = model;
  });

  Object.keys(models).forEach(function (key) 
  {
    if (models[key].hasOwnProperty('associate')) 
      models[key].associate(models);
  });

  return models;
}
