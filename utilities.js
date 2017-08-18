var fs = require('fs');
module.exports = 
{
    readJson: function (url) 
    {
    var data = fs.readFileSync(url);
    var object = JSON.parse(data);
    return object;    
    },
    writeJson: function (text, json) 
    {
        var jsonfile = require('json');
        for (i=0; i <11 ; i++){
        jsonfile.writeFile('loop.json', "id :" + i + " square :" + i*i);
        }    
    },
    getRandom: function(min, max) 
    {
    return Math.floor(Math.random() * (max - min)) + min;
    },
    textContentText: function (text, text2) 
    {
        //content is a boolean is true when the first string includes the second one
        
        //replace all space, coma and - in a string
        text = text.replace( /[ ,-]/g, "");
        text2 = text2.replace( /[ ,-]/g, "");
        var content = text.toLowerCase().includes(text2.toLowerCase());
        console.log('This text-- ' + text + ' --content ');
        console.log('this text-- ' + text2);
        return content;   
    },
    hours: function () 
    {       
        var d = new Date();       
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var hours = h + "-" + m + "-" + s;
        return hours;       
    },
    isData1MenorEqualData2: function(data1, data2)
    {
        var num1 = parseInt(data1);
        var num2 = parseInt(data2);
        console.log(num1+' <= '+num2+' ?');
        if(num1<=num2)
        return true;
        else
        return false;
    }
   
}