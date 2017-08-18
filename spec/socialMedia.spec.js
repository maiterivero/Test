
var controller = require('../controller');
var utilities = require('../utilities');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 800000;
console.log('---------------------Suite social media---------------------');
describe('Test social media', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) 
    {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done); 
    }) 

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        controller.afterSpec(); 
        controller.quit().then(done);       
    });
    var i=0;
    using(testData.classesLink, function (classes) 
    {
        it('RE/MAX Social media includes links to several Social Media Networks like ' + classes, function (done) 
        {              
            controller.findElements('btnSocialMedia')            
            .then(function(elements)
            {
                var element=elements[i];
                
                controller.scrollToElement(element);
                element.getAttribute('class').then(function(att)
                {   
                    controller.setSteps('Element with '+ att +' is present');                      
                    controller.setSteps('Element has class ' + att + ' equal to text ' + classes + ' ?');         
                    expect(att).toEqual(classes);         
                    i++;   
                });                          
                done();                 
            });           
        })
    })
   
    using(testData.socialMediaLinks, function (data) 
    { 
        it('Url content '+ data.url, function(done) 
        { 
            controller.checkLinks(data.url, data.link, data.text, data.newWindows, data.pos).then(function(){
                done();
            });            
        });       
    })
});


