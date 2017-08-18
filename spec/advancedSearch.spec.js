var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
console.log('---------------------Suite search---------------------');
describe('Test property search', function() 
{

    // Open the website in the browser before each test is run
    beforeEach(function(done) {
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.urlAdvancedSearch).then(done); 
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) 
    {       
        controller.afterSpec(); 
        controller.quit().then(done);    
    });

    using(testData.listingType, function (data) 
    {
        it('check element ' + data.text + ' in Listing Type', function(done) 
        {  
        controller.findElements('listingType').then(function(elements){
            elements[data.pos].getText()
            .then(function(text)
            { 
                controller.setSteps(text + ' is equal to ' + data.text + ' ?');  
                expect(data.text).toEqual(text);   
            });     
            done();        
        })   
        });
    });
    using(testData.propertyType, function (data) 
    {
        it('check element ' + data.text + ' in Property Type', function(done) 
        {  
        controller.findElements('propertyType').then(function(elements){
            elements[data.pos].getText()
                .then(function(text)
                { 
                    controller.setSteps(text + ' is equal to ' + data.text + ' ?');  
                    expect(data.text).toEqual(text); 
                });     
            done();        
        })   
        });
    });
    using(testData.elementAdvancedSearch, function (elements) 
    {
        it('check element ' + elements.id + ' is present', function(done) 
        {  
        controller.findElement(elements.id).then(function(element){
            element.isDisplayed().then(function (displayed) 
            {                            
                expect(displayed).toBe(true);
                done();                          
            })   
        }) 
        });
    });
    
    using(testData.advancedSearchData, function (data) 
    {        
        it('search for ', function(done) 
        {             
            var location = data.location;
            var minPrice = data.minPrice;
            var maxPrice = data.maxPrice;
            var beds = data.beds;
            var baths = data.baths;
            var squareFeet = data.squareFeet;
            var lotSize = data.lotSize;
            var ageHome = data.ageHome;
            var newApt = data.new;
            var openHouses = data.openHouses;
            var priceCuts = data.priceCuts;
            var Luxury = data.Luxury;
            var virtualTours = data.virtualTours;
            var singleFamily = data.singleFamily;
            var condoTownHouse = data.condoTownHouse;
            var multiFamily = data.multiFamily;
            var vacantLand = data.vacantLand;
            var movileHome = data.movileHome;


            controller.advancedSearch(location, minPrice, maxPrice, beds,baths).then(function(){
            controller.setSteps('make search with location: '+location+ ' min price: ' + minPrice + ' max price: ' + maxPrice +' beds: '+beds+ ' baths: '+baths); 
            //take property ramdom and check the result is rigth     
            controller.clickAndWait('propertyTiles').then(function(){
                controller.clickAndWait('propertyTiles').then(function(){
                controller.getELementText('propertyBeds').then(function(text){
                    controller.setSteps('Beds: '+beds+' is <= '+text),
                    expect(true).toBe(utilities.isData1MenorEqualData2(beds,text));
                    
                    controller.getELementText('propertyBaths').then(function(text1){
                        controller.setSteps('Baths: '+baths+' is <= '+text1),
                        expect(true).toBe(utilities.isData1MenorEqualData2(baths,text1));
                        
                        controller.getELementText('propertyHouseSize').then(function(text2){
                        controller.setSteps('squareFeet: '+squareFeet+' is <= '+text2),
                        expect(true).toBe(utilities.isData1MenorEqualData2(squareFeet,text2));
                        done();
                        })
                    })                   
                })                
                }) 
            })
         
          })             
        });
    });
    it('empty advanced search show a message', function (done) 
    {   
        controller.setSteps('Press btn "View Homes" with empty location'),
        controller.click('btnViewHomes')
        .then(
            setTimeout(function() 
            {
                controller.getELementText('messageInvalidSearch').then(function (text) 
                {
                var content = utilities.textContentText(text,'Oops - please try that again');
                controller.setSteps('Remax show a message with text "Oops - please try that again"'),
                expect(content).toBe(true);
                done();                             
                })    
            }, 6000)                        
        )            
            
    })
    
});