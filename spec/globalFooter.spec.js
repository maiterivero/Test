var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
console.log('---------------------Suite---------------------');
describe('Test global footer', function() 
{

    // Open the website in the browser before each test is run
    beforeEach(function(done) {
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done); 
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) 
    {       
        controller.afterSpec(); 
        controller.quit().then(done);    
    });
    
    using(testData.linksFooter, function (data) 
    {
        it('check link '+ data.text, function(done) 
        {  
            controller.checkLinks(data.url, data.link, data.text, data.newWindows, data.pos).then(function(){
                done();
            });       
        });
    });
});