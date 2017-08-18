var controller = require('../controller');
var utilities = require('../utilities');
var setUp = utilities.readJson('setUp.json');
var testData = require('./TestData.js');
var using = require('jasmine-data-provider');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 800000;
console.log('---------------------Suite searchInfoBlock---------------------');
describe('Test search info block', function() 
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
    
    it('check btn save with user logout', function(done)
    {
        controller.makeSearch('inputForSale','Boca Raton').then(function()
        {  
            controller.click('btnSave').then(
                controller.elementIsDisplayed('formRegister').then(function(result){
                    expect(result).toBe(true);
                    done();  
                }) 
            )  
        });   
    });
    it('check btn save with user login', function(done)
    {  
        //make login       
        var user=testData.loginData()[1]['mail'];
        var pass=testData.loginData()[1]['pass'];
        controller.login(user,pass).then(function(){
            // go user page 'My RE/max'                    
            controller.click('myRemaxBtns').then(                                
            controller.clickAndWait('myRemaxLoggedin').then(function(){   
                //click in btn saved searches                 
                controller.clickAndWait('btnSavedSearches').then(function(){  
                    //check btn for remove saved searches is present                                    
                    controller.elementIsDisplayed('btnRemoveSavedSearches').then(function(result){
                        // if is present, delete all saved searches    
                        controller.findElements('btnRemoveSavedSearches').then(function(elements){
                        controller.setSteps('Remove '+elements.length+' searches save by User');
                            elements.forEach(function (element) 
                            { 
                                element.click();                                                
                            })                                         
                        })                              
                    }).catch(function (error) {   
                       controller.setSteps('User don\'t have searches save');
                    })
                    //make a search and save it
                    setTimeout(function(){
                        controller.clickAndWait('btnCloseSavedSearches').then(function(){                                                                                            
                            controller.save(testData.citiesProvider()[0]).then(function(){
                                done();
                            })                                                                          
                        }); 
                    },5000)                         
                })
            })
            )                  
        });
    });
    it('check btn alerts', function(done)
    {
        //make login       
        var user=testData.loginData()[1]['mail'];
        var pass=testData.loginData()[1]['pass'];
        controller.login(user,pass).then(function(){
            // make search
            controller.clickAndWait('btnLogo').then(function(){
            controller.makeSearch('inputForSale',testData.citiesProvider()[0]).then(function()
            {
                controller.clickAndWait('btnAlerts').then(function(){
                controller.elementIsDisplayed('btnConfirmBlue').then(function(result){
                    expect(result).toBe(true);
                    controller.getELementText('btnConfirmBlue').then(function(text){
                        expect(text).toEqual('Activate Alert');
                        done();
                    })
                }).catch(function (error) {   
                       controller.setSteps('element "Activate Alert" is not present');
                       done();
                    })

                })
            })
            });
        })                       
    });
  
    using(testData.infoBlock, function (data) 
    { 
        it('check when click btn '+data.btn+' element '+data.elementToCheck+' is present', function(done)
        {        
            controller.makeSearch('inputForSale',testData.citiesProvider()[0]).then(function()
            { 
                if(data.btn==='btnViewMap') 
                {
                controller.clickAndWait(testData.infoBlock()[0]['btn']).then(function(){
                    controller.setSteps('Click in element "'+ testData.infoBlock()[0]['btn'] +'" to show ' + data.btn);  
                    });  
                } 
                setTimeout(function(){             
                    controller.click(data.btn).then(function(){
                    controller.elementIsDisplayed(data.elementToCheck).then(function(result){
                        expect(result).toBe(true); 
                        controller.setSteps('element "'+ data.elementToCheck +'" is present'); 
                        done();                
                    }).catch(function (error){
                        controller.setSteps(error+ ' '+data.elementToCheck+ ' '+ i);                        
                        done();
                    })
                    }).catch(function (error){                         
                        controller.setSteps(error+ ' '+data.btn);                        
                        done();
                    })
                },6000)
            })                             
        });
    });
});
