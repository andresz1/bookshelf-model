## bookshelf-model

Save your models in a central location so that you can refer them easily instead of having to require it every time and helps deal with the challenges of circular module dependencies in Node.

### Usage

You must define your models as this:

```javascript
var models = null;

module.exports = function(bookshelf) {
  var Administrator = bookshelf.Model.extend({
    tableName: 'administrators',
    user: function() {
      return this.belongsTo(models.User);
    }
  },
  {
    // if your model has one or more relations, you should define this function
    // db contains all the models that have been found
    associate: function(db) {
      models = db;
    }
  });

  return Administrator;
}
```

In your main app.js file simply call the helper (the first parameter is the bookshelf object and the second one is the directory where your models are):

```javascript
//...

var knex = require('knex')(dbConfig.development),
    bookshelf = require('bookshelf')(knex),
    bookshelfModel = require('bookshelf-model');
    
var models = bookshelfModel(bookshelf, __dirname + '/models');

// if you are using express you should do this
app.locals.models = models;

//...
```

The model's name is taken from the file's name, if your file is named `user.js` the model's name will be `User`. To separate words of a file's name you must use `sneake_case` and the model's name wil be in `PascalCase` (E.g: `police_officer` -> `PoliceOfficer`)

### Feedback

Pull requests, feature ideas and bug reports are welcome

### License

MIT
