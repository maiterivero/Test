
var utilities = require('../utilities');
var controller = require('../controller');
var setUpTest = require('../setUpTest');
var testData = require('./TestData.js');
var using = require('jasmine-data-provider');
var setUp = utilities.readJson('setUp.json');
var href;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;

describe('Test Listing Details Page', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done);         
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        controller.afterSpec(); 
        controller.quit().then(done); 
    });
    using(testData.elementListingDetailsPage, function (data) 
    { 
    it('checks element: '+ data.id, function(done) 
    {
    var mail=testData.loginData()[1]['mail'];
    var pass=testData.loginData()[1]['pass'];
    controller.login(mail,pass).then(function(){
        controller.findElements('propertyForSale').then(function(elements){
            var pos=utilities.getRandom(0,elements.length-1);
            controller.clickAndWait('propertyForSale',pos).then(function(){               
                controller.clickAndWait('propertyForSale',pos).then(function(){
                    if(data.id==='shareItems')
                    {
                    controller.click('btnShare');    
                    }
                    controller.elementIsDisplayed(data.id).then(function(result){
                        expect(result).toBe(true);
                        done();
                    }).catch(function (error){                                            
                    console.log(error.message);     
                    fail(error.message);                                                                                                                
                    done();                                      
                    });     
                })        
            }).catch(function (error){                                            
            console.log(error.message);     
            fail(error.message);                                                                                                                
            done();                                      
            });    
            
       })        
    })       
    })
    })
})