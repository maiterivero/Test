var utilities = require('../utilities');
var controller = require('../controller');
var setUpTest = require('../setUpTest');
var testData = require('./TestData.js');
var using = require('jasmine-data-provider');
var setUp = utilities.readJson('setUp.json');
var href;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;

describe('Test result page', function() 
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
    
    it('checks Bread Crumb content city', function(done) 
    {
        var city = testData.citiesProvider()[0];
        controller.makeSearch('inputForSale',city).then(function()
        { 
        controller.getELementText('resultsBreadcrumb')
        .then(function (text) 
        {                 
            var content = utilities.textContentText(text,city); 
            controller.setSteps('Bread crumb "'+ text +'" content "' + city +'"'); 
            expect(content).toBe(true);            
            done();
        })
        })
    })

    it('checks search title', function (done) 
    {    
        // var city = controller.getCityInHref(href); 
        // setTimeout(function(){
        var city = testData.citiesProvider()[0];
        controller.makeSearch('inputForSale',city).then(function()
        { 
            controller.getELementText('titleInSearch')
            .then(function (text) 
            {   
                var content = utilities.textContentText(text,city);
                controller.setSteps('Title "'+ text +'" content "' + city +'" ?');
                expect(content).toBe(true);
                
                done();
            })
        });
    })

    it('checks properties and pages',function (done) 
    {
        var itemsPerPage;
        var totalProperties;
        var pages;
        var itemInLastPage;
        var city = testData.citiesProvider()[0];
        controller.makeSearch('inputForSale',city).then(function()
        { 
            controller.clickAndWait('btnViewGallery').then(function()
            {
            //search element total properties
            controller.findElement('totalProperties')
            .then(function (element) 
            {
                //take test from element
                element.getText().then(function (text) 
                {   
                    //take only the number of properties             
                    totalProperties=controller.getStringIntoString(text,'properties');
                    totalProperties=totalProperties.replace(',','');
                    totalProperties=parseInt(totalProperties);
                    console.log('totalProperties ' + totalProperties);
                    controller.setSteps('Total properties is ' + totalProperties);
                    setTimeout(function() 
                    {  
                        //search btns page                  
                        controller.findElements('btnpages')
                        .then(function (elements) 
                        {                           
                            //select the last one
                            var element=elements[elements.length-1];
                            //take total of pages
                            element.getText()
                            .then(function (text) 
                            {
                                //pages -1 because the last page can has less properties
                                pages=(parseInt(text))-1;
                                
                            })                       
                            controller.scrollToElement(element);   
                            //go the last page of properties                     
                            element.click()
                            .then(function () 
                            {
                                setTimeout(function() 
                                {
                                    //take the properties showing in last page
                                    controller.findElements('itemInLastPage')  
                                    .then(function (elements) 
                                    {
                                        itemInLastPage=parseInt(elements.length);
                                        controller.getELementText('itemPerPages')
                                        .then(function (text) 
                                        {
                                            itemsPerPage=parseInt(text);                                        
                                            controller.setSteps('itemsPerPage '+ itemsPerPage);
                                            controller.setSteps('page '+ pages);
                                            controller.setSteps('itemsInLastPage ' + itemInLastPage);
                                            controller.setSteps(totalProperties+ ' = ' + itemsPerPage + ' * ' + pages + '+' + itemInLastPage+' ?');
                                            controller.setSteps(totalProperties+'= '+ (itemsPerPage *  pages +  itemInLastPage)+' ?');
                                            expect(totalProperties).toEqual(itemsPerPage *  pages +  itemInLastPage);
                                            done();
                                        })                                    
                                    }) 
                                }, 5000);
                            })
                        })                       
                    }, 7000);                
                });
            })
            })
        })
    })
    it('Check Property tiles', function(done)
    {
        controller.makeSearch('inputForSale',testData.citiesProvider()[0]).then(function()
        {            
            controller.clickAndWait('propertyTiles').then(function(){
                controller.elementIsDisplayed('newProperty').then(function(result){
                    expect(result).toBe(true);
                    done();
                }).catch(function (error) {                                            
                    console.log(error.message);     
                    fail(error.message);                                                                                                                
                    done();                                      
                });   
            })        
        })
    })
    it('Check second click in Property tiles', function(done)
    {
        controller.makeSearch('inputForSale',testData.citiesProvider()[0]).then(function()
        {            
            controller.clickAndWait('propertyTiles').then(function(){
                controller.getELementText('blockDetailAddress').then(function(text){
                controller.clickAndWait('propertyTiles').then(function(){
                    controller.getELementText('listingDetailAddress').then(function(text1){
                    text1=text1.replace( /[ ,]/g, "");
                    text=text.replace( /[ ,]/g, "");
                    expect(text.toLowerCase).toEqual(text1.toLowerCase);
                    done();
                    })
                })
                })
            })        
        })
    })
    using(testData.disclaimerSponsoringElement, function (data) 
    { 
    it('Check element '+ data.id +' is present', function(done)
    {
        controller.makeSearch('inputForSale',testData.citiesProvider()[0]).then(function()
        {            
           controller.clickAndWait('btnViewGallery').then(function()
            {
                controller.elementIsDisplayed(data.id).then(function(result){
                    expect(result).toBe(true);
                    done();
                }).catch(function (error) {                                            
                    console.log(error.message);     
                    fail(error.message);                                                                                                                
                    done();                                      
                });     
            })        
        })
    })
    })
})