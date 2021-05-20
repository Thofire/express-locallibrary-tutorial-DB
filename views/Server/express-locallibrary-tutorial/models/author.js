var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
	if (this.date_of_death && this.date_of_birth) {
 		 return  DateTime.fromJSDate(this.date_of_death).year - DateTime.fromJSDate(this.date_of_birth).year
	}
	else if (this.date_of_birth) {
		  return 'Birth Only ' + DateTime.fromJSDate(this.date_of_birth).toLocaleString();
	}
	else if (this.date_of_death) {
		  return 'Death Only ' + DateTime.fromJSDate(this.date_of_death).toLocaleString();
	}
	else{
		return 'No Lifespan Data'
	}
});
// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

