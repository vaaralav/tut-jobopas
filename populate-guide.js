var scraper = require('tut-guide-scraper'),
    Course = require('./api/models/Course.js'),
    Department = require('./api/models/Department.js'),
    Guide = require('./api/models/Guide.js');


var getDepartments = function getDepartments() {
  var departments = scraper["2015"].getDepartments('http://www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/index.html');
}
function resetGuides(populate) {
  Course.destroy({}).exec(function(err){
    if(err) throw err;
    Department.destroy({}).exec(function(err) {
      if(err) throw err;
      Guide.destroy({}).exec(function(err) {
        if(err) throw err;
        populate();
      })
    })
  })
}

function populateGuide() {
  Guide.create({year:2015}).exec(function(err, createdGuide) {
    if(err) throw err;
    Department.create({name:'Arkkitehtuuri', url:''}).exec(function(err, createdDepartments) {
      request
    })
  })
}


var departments = scraper["2015"].getDepartments('http://www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/index.html');

departments.forEach(function(department) {
  Department.create({
    name
  })
})
