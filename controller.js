var fs = require('fs');
var setUp = require('./setUpTest');
var utilities = require('./utilities');
var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var driver;
var actionSequence = require('selenium-webdriver').ActionSequence;
var specImg=0;
var pageObject = utilities.readJson('objectRepository.json');
/******************/
var log4js = require('log4js');
var log;
var logger = log4js.getLogger('STEPS<br/>');

var steps='';
var clearSteps=false;
module.exports = {
  
    /**call function getDriver to setUp driver and go url passed in parameter */
    getUrl: function (url) 
    { 
         return new Promise(function (resolve,reject) 
        {
            var title;     
            driver= setUp.getDriver();   
            clearSteps=true;
            module.exports.setSteps('go to url - ' + url); 
            clearSteps=false;
            driver.get(url).then(function()
            {
                setTimeout(function()
                {               
                    resolve();
                },8000);   
            })
        })  
    },
    /**take screenshot and save log */
    afterSpec: function ()
    {
        module.exports.screenShot().then(function(image, err) 
        {
            fs.writeFile('report/screenShot/img'+  module.exports.getSpecImg() +'.png', image, 'base64', function(err) 
            {
                console.log(err);
            })
        });
        log4js.configure({
        appenders: { specStep: { type: 'file', filename: 'report/step/specStep'+module.exports.getSpecImg()+'.txt' }},
        categories: { default: { appenders: ['specStep'], level: 'info' } }
        });
        module.exports.log(module.exports.getSteps()); 
        
    },   
    log: function (text) 
    {        
        logger.info(text);    
    }, 
    /**open new url */
    setUrl: function (url) 
    {        
       // logger.fatal('go to url' + url);
        return driver.get(url);    
    } ,
    /**add new steps in spec log, if begin a new spec clear old log*/
    setSteps: function (text) {
        if(clearSteps)
        steps='';
        steps+='-'+text+'<br />';
        
    },
    /**return steps(steps log for each spec) */
    getSteps: function () {
        return steps;
    },
    /**take screenshot */
    screenShot:function () 
    {
       specImg++;
       return  driver.takeScreenshot(); 
    },

    getSpecImg: function () {
        return specImg;        
    },
    /**compare two values passed in parameters */
    assert: function (value1, value2) 
    {
        var value1Aux = value1.replace( /[ ,-]/g, "");
        var value2Aux = value2.replace( /[ ,-]/g, "");
        value2Aux = value2Aux.toLowerCase();
        value1Aux = value1Aux.toLowerCase();
        var message = 'Error '+ value1 + ' is different ' + value2;
        // try {
            return assert.equal(value1Aux,value2Aux,message);
        // }
        // catch(err) {
        //     console.log('--------------------****' + message + '****--------------------');
        // }        
    },
    /**return current url */
    getCurrentUrl:function () 
    {        
        return driver.getCurrentUrl();
    },
    /**quit driver */
    quit:function () 
    {        
        return driver.quit();        
    },
    /**return page title */
    getTitle:function () 
    {       
        return driver.getTitle();
    },
    /**return a webelement with selector type and selector = parameters value */
    findElement: function (id) 
    {
        var element;
        var selectorType=pageObject[id].selectorType;       
        var selector=pageObject[id].selector;
        
        switch (selectorType) 
        {
            case 'className':
                element = driver.findElement(By.className(selector))
                break;
            case 'id':
                element = driver.findElement(By.id(selector))
                break;
            case 'css':
                element = driver.findElement(By.css(selector))
                break;
            case 'name':
                element = driver.findElement(By.name(selector))
                break;
            case 'js':
                element = driver.findElement(By.js(selector))
                break;
            case 'linkText':
                element = driver.findElement(By.linkText(selector))
                break;
            case 'xpath':
                element = driver.findElement(By.xpath(selector))
                break;
            default:
                break;
        }   
        return element; 
    },
    /**return a webelement list with selector type and selector = parameters value */
    findElements: function (id) 
    {
        var elements;
        var selectorType=pageObject[id].selectorType;       
        var selector=pageObject[id].selector;
        switch (selectorType) {
            case 'className':
                elements = driver.findElements(By.className(selector))
                break;        
            case 'css':
                elements = driver.findElements(By.css(selector))
                break;        
            case 'js':
                elements = driver.findElements(By.js(selector))
                break;        
            case 'xpath':
                elements = driver.findElements(By.xpath(selector))
                break;
            default:
                break;
        }        
        return elements; 
    },
    /**wait a time before search an element, click element */
    waitForElementToClick: function (id, time) 
    {         
        setTimeout(function()
        { 
            console.log('wait for element with selector: ' + id);
            module.exports.findElement(id)
            .then(function (element) 
            {
               element.click();
            })               
        }, time)              
    },
    /**wait a time before search an element */
    waitForElement: function (id, time) 
    {         
        setTimeout(function()
        { 
            console.log('wait for element with selector: ' + id);
            module.exports.findElement(id);
                        
        }, time)              
    },
    /**search a webelement list, compare element's text with text in list */
    compareStringArray: function (id, list) 
    { 
        return new Promise(function (resolve) 
        {  
        console.log(id+' '+list);
        module.exports.findElements(id)
        .then(function (elements)
        {
            var i=0;
            var result=true;
            var message;
            var text1;
            elements.forEach(function (element) 
            {
                element.getText()
                .then(function(text)
                {            
                    text1=module.exports.assert(list[i],text);
                    i++; 
                    if(i===elements.length)
                    {
                        resolve(result) ; 
                    }  
                });           
            }); 
        });
        }); 
    },
     /**search a webelement list, select random element, click in random element and return element's href */
    goToLink: function(id) 
    {
        return new Promise(function (resolve) 
        {
            module.exports.setSteps('Search element ' + id);
            module.exports.findElements(id)        
            .then(function (elements)
            {   
                console.log('Total elements ' + elements.length);
                var pos = utilities.getRandom(0,elements.length);   
                console.log('Select element in pos ' + pos);  
                module.exports.setSteps('Select random element and take href attribute');    
                elements[pos].getAttribute('href').then(function (href) 
                {
                    console.log('href is :' + href);
                    module.exports.setSteps('Click element and return href');
                    elements[pos].click();                   
                    resolve(href) ; 
                })  
            })
        }); 
    },
    /**search a webelement list, select random element, click in random element and return element's text */
    getTextLink: function(id) 
    {
        return new Promise(function (resolve) 
        {
            module.exports.findElements(id)        
            .then(function (elements)
            {   
                console.log('Total elements ' + elements.length);
                var pos = utilities.getRandom(0,elements.length);   
                console.log('Select element in pos ' + pos);   
                module.exports.setSteps('Select a random element');   
                elements[pos].getText().then(function (text) 
                {
                    var n = text.lastIndexOf(" ");
                    text=text.slice(n,text.length)
                    console.log('text link is :' + text);
                    elements[pos].click();     
                    module.exports.setSteps('Take text "'+ text +'" and click in element');               
                resolve(text) ; 
                });  
            });
        });
    },
    /**scroll page until element is visible */
    scrollToElement: function (element)
    {
        driver.executeScript("arguments[0].scrollIntoView(true);",element);
    },   
    getStringIntoString: function(text,word) 
    {            
        var pos = text.search(word);        
        var res = text.slice(0, pos-1);
        return res;
    },
    /**return webelement's text */
    getELementText: function (id) 
    {
        return new Promise(function (resolve) 
        {
            module.exports.findElement(id)
            .then(function (element) 
            {                 
                element.getText().then(function(text){
                    module.exports.setSteps('Take element text ' + text + ' in element ' + id); 
                    resolve(text);
                }) 
            });     
        }
        ); 
    },
    /**Take city inside href */
    getCityInHref: function (href) 
    {        
        var posIni = href.lastIndexOf('/');
        var posEnd = href.lastIndexOf('-');
        var city = href.slice(posIni+1, posEnd);
        city = city.replace('-', ', ');
        module.exports.setSteps('City in href is ' + city);        
        return city;
    },
    /**
     * Search a web element with attribute canonical, if yes: return element's href, if no: return an error message
     */
    getCanonical: function () 
    {
        return new Promise(function (resolve,reject) 
        {
            var element;           
            driver.findElements( By.css('link[rel=canonical]')).then(function ( links ) 
            {
                console.log('length '+ links.length);
                if(links.length>0)
                {
                    var url='';
                    for (var i = 0; i < links.length; i ++) {
                        element=links[i];
                        element.getAttribute('rel').then(function (rel) {
                            if (rel === 'canonical') {
                                module.exports.setSteps('Find an element with attribute rel= canonical and return element href');
                                element.getAttribute('href').then(function (hrefl) {
                                    console.log('canonical href: ' + hrefl);
                                    url=hrefl;
                                    resolve(url);   
                                });               
                            };                             
                        });            
                    }; 
                }
                else
                {                        
                var reason = new Error('this page dont have canonical url');
                reject(reason); // reject    
                }                      
            });    
        });
    },
    /**switch windows */
    changePage: function () 
    {
        var aux;       
        driver.getAllWindowHandles().then(function(idHandles) 
        {
            aux=idHandles[1];
            driver.switchTo().window(aux);
        }); 
    },
    sendKey: function(id, text)
    {
        return new Promise(function (resolve,reject) 
        { 
        module.exports.findElement(id).then(function(element){
            element.click().then(
                element.clear().then(
                    element.sendKeys(text).then(
                    resolve()
                    )
                )
            )
            
        });
        });
    },
    click: function(id)
    {
        return new Promise(function (resolve,reject) 
        { 
        module.exports.findElements(id).then(function(elements){   
        if(elements.length>0)
        {
            module.exports.scrollToElement(elements[0]);         
            elements[0].click().then(
                module.exports.setSteps('Click element: ' + id),
                resolve()
            );
        }
        else{var reason = new Error('element ' +id+ ' is not present');
            reject(reason); // reject
        } 
        });
        });   
    },
    doubleClick: function(id,pos){
        
        module.exports.findElements(id).then(function(elements){ 
            //new actionSequence( driver ).mouseMove(elements[pos]).doubleClick().perform();  
        driver.executeScript("arguments[0].doubleClick();",elements[pos]);
        })
    },
    clickAndWait: function(id,pos)
    {
        console.log('pos is '+ pos);
        if(pos>0)
        pos=pos;
        else
        {pos=0;}
        console.log('pos1 is '+ pos);
        return new Promise(function (resolve,reject) 
        { 
        module.exports.findElements(id).then(function(elements){   
            //module.exports.scrollToElement(element); 
                
            elements[pos].click().then(function(){  
                       
                setTimeout(function(){    
                    module.exports.setSteps('Click element and wait: ' + id) 
                    resolve();
                },4000)            
            });
        });
        });   
    },
    
    elementIsDisplayed: function (id) 
    {
        return new Promise(function (resolve,reject) 
        {            
            setTimeout(function()
            {
                module.exports.findElements(id).then(function (element) 
                { 
                    if(element.length>0)
                    {                       
                        element[0].isDisplayed().then(function (displayed) 
                        {                            
                            resolve(displayed);                            
                        }) 
                    } 
                    else
                    {
                        var reason = new Error('element ' +id+ ' is not present');
                        reject(reason); // reject    
                    };  
                });

            },5000);   
        });
    },
    /**purl is the new URL when clicking in link plink
     * plink is an id to find an element or an element list
     * ptext is the link text
     * pnewWindows is true when link opens a new window
     * ppos is element position in element list
    */
    checkLinks:function(purl, plink, ptext, pnewWindows, ppos)
    {
        return new Promise(function (resolve) 
        { 
            module.exports.findElements(plink).then(function(elements)
            {   
                module.exports.setSteps('Scroll to element: ' + plink);
                module.exports.scrollToElement(elements[ppos]);                   
                elements[ppos].getText().then(function(text){
                    if(text!=='')
                    {
                        module.exports.setSteps(text + ' is equal  ' + text + ' ?')
                        expect(text.toLowerCase()).toBe(ptext.toLowerCase());
                        module.exports.setSteps('click in element : ' + text );
                    }
                    else
                    {
                        module.exports.setSteps('click in element : ' + ptext );    
                    }
                   
                })              
                elements[ppos].click().then(function(){
                    setTimeout(function()
                    {
                        if(pnewWindows==='true')
                        module.exports.changePage();
                        module.exports.getCurrentUrl().then(function(url)
                        {
                            module.exports.setSteps(url + ' content : ' + purl +' ?');
                            var result=utilities.textContentText(url,purl);
                            expect(result).toBe(true); 
                            resolve(); 
                        });                            
                    },4000)
                }) 
            })
        });
    },
    makeSearch: function(elementId,data)
    {
        return new Promise(function (resolve) 
        {
            module.exports.click(elementId)            
            .then(
                module.exports.setSteps('Clear input search and insert '+ data),                
                module.exports.sendKey(elementId,data)
                .then(
                    module.exports.waitForElementToClick('autocompleteItem',4000), 
                   
                    setTimeout(function()
                    { 
                    module.exports.setSteps('Select the first result that show autocomplete element'),     
                    resolve();     
                    }, 10000)                                
                )       
            )
        });          
    },
    save: function(city)
    {
        return new Promise(function (resolve) 
        {
        module.exports.clickAndWait('btnLogo').then(function(){
            module.exports.makeSearch('inputForSale',city).then(function()
            {
                module.exports.clickAndWait('btnSave').then(function(){                                                
                    module.exports.clickAndWait('btnConfirmBlue').then(function(){
                        setTimeout(function(){
                        module.exports.click('myRemaxBtns').then(
                            module.exports.clickAndWait('myRemaxLoggedin').then(function(){   
                            module.exports.clickAndWait('btnSavedSearches').then(function(){                   
                                module.exports.getELementText('savedSearchesDetails').then(function(text){
                                    expect(utilities.textContentText(text,city)).toBe(true);
                                    resolve();   
                                })                       
                            })  
                            })
                        ) 
                        },4000)                                          
                    })
                })
            })   
        }) 
        })     
    }, 
    login: function(user,pass)
    {
        return new Promise(function (resolve) 
        {
        //maked login
        module.exports.setSteps('Make login with user: '+user+' and pass: '+pass);
        module.exports.clickAndWait('btnMyRemax').then(function(){            
            module.exports.sendKey('inputMail',user).then(
                module.exports.sendKey('inputPassword',pass).then(function(){
                    setTimeout(function () {
                    module.exports.clickAndWait('btnSignIn').then(function(){ 
                    resolve();
                    })   
                    },3000)
                    
                })
            )
        })
        })
    },
    /**
     * location, minPrice, maxPrice, beds, baths, squareFeet, lotSize, ageHome, new, openHouses,
     * priceCuts, Luxury, virtualTours, singleFamily, condoTownHouse, multiFamily, vacantLand, movileHome
     */
    selectOption:function(id, value)
    {
        return new Promise(function (resolve) 
        {
        module.exports.click(id).then(function(){
            var selector=pageObject[id].selector;
            value++;
            selector+='> option:nth-child('+value+')';
            driver.findElement(By.css(selector)).then(function(element){
                element.click();
                resolve();
            })
            
        })
        })
    },
    advancedSearch: function(location, minPrice, maxPrice, beds, baths/*, squareFeet, lotSize, ageHome, new, openHouses, priceCuts, Luxury, virtualTours, singleFamily, condoTownHouse, multiFamily, vacantLand, movileHome*/)
    {
        return new Promise(function (resolve) 
        {
        //maked login
        module.exports.setSteps('Fill in all element');
                 
            module.exports.sendKey('inputLocation', location).then(
                module.exports.sendKey('inputMinPrice', minPrice).then(
                    module.exports.sendKey('inputMaxPrice', maxPrice).then(function(){ 
                        module.exports.selectOption('selectBeds', beds).then(function(){ 
                            module.exports.selectOption('selectBaths', baths).then(function(){ 
                                module.exports.clickAndWait('btnViewHomes').then(function(){ 
                                    setTimeout(function(){
                                        resolve();
                                    },3000)                                
                                });
                            })
                        })
                    })
                )
            )
      
        })   
    }  
}