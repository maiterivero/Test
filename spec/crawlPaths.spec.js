var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
console.log('---------------------Suite Crawl Paths---------------------');
describe('Test Crawl Paths', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) 
    {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done); 
    }) 

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) 
    {
        controller.afterSpec(); 
        controller.quit().then(done); 
    });
    using(testData.linkCrawlPaths, function (data) 
    {
        it('check test and link in ' + data.title, function (done) 
        {    
            controller.setSteps('Go Crawl Paths');
            controller.setSteps(data.list + ' are titles link?');
            controller.findElements(data.link).then(function(elements){
                controller.scrollToElement(elements[0]);
            });
        
            controller.compareStringArray(data.link,data.list).then(function(result)
            {   
                expect(result).toBe(true);                
            });             
            controller.getTextLink(data.link).then(function (text) 
            {
                setTimeout(function() 
                {
                    controller.getCurrentUrl().then(function (currentUrl) 
                    {
                        controller.setSteps('Check current url '+ currentUrl +' content '+ text);                    
                        expect(utilities.textContentText(currentUrl,text)).toBe(true);
                        done();    
                    });                
                },3000)                
            })             
        });
    });    
   
})



