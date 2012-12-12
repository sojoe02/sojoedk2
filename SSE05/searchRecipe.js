/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var search = {};
var searchTable;
var searchXML;
//var resultXML;

function init(){
    
}

function addIngredient(){     
    //add the ingredient to the user table:
    var name = document.getElementById('inputIngredient').value;    
    
    var table   = document.getElementById('searchTable');
    
    var row=table.insertRow(2);
    row.setAttribute('id', name);
    
    //setup the removal button
    var removeButton = document.createElement('input');
    removeButton.setAttribute('type', 'button');
    removeButton.value = 'X';
    removeButton.onclick = function(){
        var row = document.getElementById(name);        
        row.parentNode.removeChild(row);
        for(x in recipe.ingredients){
            if(recipe.ingredients[x].name==name){
                delete recipe.ingredients[x];
                document.getElementById('preview').innerHTML = name;
                break;
            }           
        }        
    };   
    
    //append the cells to the table:   
    var removeButtonCell = row.insertCell(0);       
    var nameCell = row.insertCell(1);    
    removeButtonCell.appendChild(removeButton);
    nameCell.innerHTML = name;  
    
    //add the ingredient to the JSON object:
    var x = {};
    x[name] = {
        name:name        
    };
    $.extend(search,x);
}


function constructXML(){
    var str =""; 
    str += '<?xml version="1.0" encoding="UTF-8"?>';    
    str += '<ingredients>';
    for(x in search){
        str+='<ingredient ';
        str+='name="'+search[x].name+'"';
        str+='/>';            
    }
    str+='</ingredients>';     
    
    searchXML = str;
//var text = document.createTextNode(recipeXML);
//document.getElementById('preview').appendChild(text);
}

function submitSearch(){    
    constructXML();
    
    jQuery.post("emil/matchingredients.php",{       
        match : searchXML        
    },function(data){  
        //var resultXML = loadXMLString(data);
        buildSearchTable(data);
    });
    
    
    
}

function buildSearchTable(resultXML){
    var table = document.getElementById('displaySearchTable');    
    
    var x = resultXML.getElementsByTagName("recipe");
    
    var row = table.insertRow(1);

    for (var i=x.length-1;i>=0 ;i--){
        row = table.insertRow(2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        cell1.innerHTML = x[i].getAttribute("title");
        cell2.innerHTML = x[i].getAttribute("score");
        
        row.setAttribute('id', x[i].getAttribute("id"));   
        row.onclick =  function(){
            jQuery.get("emil/getrecipe.php",{       
                id : this.getAttribute('id')        
            },function(data){  
                //var resultXML = loadXMLString(data);
                var text = document.createTextNode(data);
                document.getElementById('preview').appendChild(text);   
                var packed = data;
                window.location = "displayRecipe.html?"+packed;
            });
        
        };        
    }
}

//utility functions:
function loadXMLString(txt){    
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(txt,"application/xml");    
    return xmlDoc;
}