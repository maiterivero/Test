var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
console.log('---------------------Suite---------------------');
describe('Test remax interactions', function() 
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

    it('Clicking on the RE/MAX Movile App direct users to a new page with information about the Mobile App', function(done) 
    { 
        controller.findElement('btnGetApp').then(function(element)
        {
            controller.scrollToElement(element);   
            element.getText().then(function(text)
            {
                controller.setSteps('click element '+ text)
            })   
            element.click().then(function()
            {   
                setTimeout(function()
                {
                    controller.changePage(); 
                    controller.elementIsDisplayed('btnAppStore').then(function(result)
                    {
                        controller.setSteps('Element btnAppStore is present? '+ result);
                        expect(result).toBe(true);
                        controller.elementIsDisplayed('btnGooglePlay').then(function(result)
                        {
                            controller.setSteps('Element btnGooglePlay is present? '+ result);
                            expect(result).toBe(true);
                            done();  
                        });  
                    });                        
                   
                },4000);  
            });  
        })             
    });
    using(testData.interactionLinks, function (data) 
    {
        it('Check link '+ data.text, function(done) 
        { 
            controller.checkLinks(data.url, data.link, data.text, data.newWindows, data.pos).then(function(){
                done();
            });            
        });
    });  
    
});