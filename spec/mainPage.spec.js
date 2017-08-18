var controller = require('../controller');
var utilities = require('../utilities');
var setUp = utilities.readJson('setUp.json');
var testData = require('./TestData.js');
var using = require('jasmine-data-provider');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 800000;
console.log('---------------------Suite mainPage---------------------');
describe('Test Main page', function() 
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
    
    it('scroll down banner is display', function(done)
    {
        controller.findElement('btnAgentsSearch').then(function(element)
        {  
            controller.scrollToElement(element);
            setTimeout(function()
            {
                controller.findElement('stickyHeader').then(function(element)
                {
                    element.getAttribute('style').then(function(style)
                    {                    
                    var result=utilities.textContentText(style,'display:block');
                    controller.setSteps('Style property of element stickyHeader:'+ style +' content display:block?, '+result);
                    expect(result).toBe(true); 
                    done();
                    })    
                })
            },3000)            
        });        
    });
    it('search link', function (done) 
    {        
        controller.setSteps('The following searches are available: '+testData.searchTypes()+' ?');
        controller.findElements('searchType')
        .then(function(elements)
        {
            var i=0;
            elements.forEach(function (element) 
            {
                element.getText()
                .then(function(text)
                {
                    controller.setSteps(text + ' is equal to ' + testData.searchTypes()[i] + ' ?');  
                    expect(testData.searchTypes()[i]).toEqual(text);         
                    i++;
                });
            });                
            done();          
        });   
       
    })
    using(testData.placeholder, function (data) 
    {
        it('check '+data.input+' placeholder', function (done) 
        {            
            var text=data.title;
            checkPlaceHolder(data.link,data.input).then(function (placeholder) 
            {
                controller.setSteps('placeholder: '+placeholder+' is equal text: '+ text);
                expect(placeholder).toBe(text);
                done();      
            })   
        })
    });    
});

function checkPlaceHolder(idlink,idinput) 
{
    return new Promise(
    function (resolve) 
    {
        controller.findElement(idlink)
        .then (function (element) 
        {
            element.click();           
            controller.findElement(idinput)
            
            .then(function (element) 
            {
                controller.setSteps('take placeholder attribute');
                console.log('take placeholder attribute');
                return element.getAttribute('placeholder')
                .then(function (placeholder) 
                { 
                    resolve(placeholder) ;            
                });  
            })
        }) 

    })      
}
