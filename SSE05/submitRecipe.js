/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var recipe = {};
recipe.ingredients ={};
//recipe.title = {};
//recipe.description = {};
var ingredientsTable;

function init(){
    constructRecipe();
}


function constructRecipe(){  
//    addTitle('Something Interesting');
//    addDesc('this is a recipe with onions and stuffs');
//    addIngredient('carrot', '5', 'ml');
//    addIngredient('onion', '2', 'halves');
//    addVideo('youtube','gAYL5H46QnQ');
//    addImages('flikr','72157624042883634');
//    constructXML();
}



function addTitle(title){
    var x = {};
    x['title'] = {
        title:title
    };
    $.extend(recipe,x);
}

function addDesc(desc){
    var x = {};
    x['desc'] = {
        desc:desc
    };
    $.extend(recipe,x);
}

function removeIngredient(name){    
    var row = document.getElementById(name);
    document.getElementById('preview').innerHTML = name;
    row.parentNode.removeChild(row);
}

function addIngredient(){     
    //add the ingredient to the user table:
    var name = document.getElementById('inputIngredient').value;
    var amount = document.getElementById('inputAmount').value;
    var amountType = document.getElementById('inputAmountType').value; 
    
    var table   = document.getElementById('ingredientTable');
    
    var row=table.insertRow(2);
    row.setAttribute('id', name);
    
    //setup the removal button
    var removeButton = document.createElement('input');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('name', 'x');
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
    var amountCell = row.insertCell(2)
    var amountTypeCell = row.insertCell(3);
    
    
    
    removeButtonCell.appendChild(removeButton);
    nameCell.innerHTML = name;
    amountCell.innerHTML = amount;
    amountTypeCell.innerHTML = amountType;
    
    //add the ingredient to the JSON object:
    var x = {};
    x[name] = {
        name:name,
        amount:amount,
        amountType:amountType
    };
    $.extend(recipe.ingredients,x);
}

function addVideo(type, id){
    var video ={};
    video['video'] ={
        type:type, 
        id:id
    };
    $.extend(recipe,video);    
}


function addImages(type, id){
    var images ={};
    images['images'] ={
        type:type, 
        id:id
    };
    $.extend(recipe,images);      
}

function showRecipe(){    
    var str =""; 
    
    for(x in recipe.ingredients){
        str += recipe.ingredients[x].toSource()+"\n";
    }  
    
    document.getElementById("preview").innerHTML = recipe.toSource();
}


function constructXML(){
    var str = '<?xml version="1.0" encoding="UTF-8"?>';
    str += '<recipe>';
    //add ingredients:
    str += '<ingredients>';
    for(x in recipe.ingredients){
        str+='<ingredient ';
        str+='name='+recipe.ingredients[x].name;
        str+=', amount=' + recipe.ingredients[x].amount;
        str+=', amountType=' + recipe.ingredients[x].amountType;
        str+='/>';            
    }
    str+='</ingredients>';    
    str += '</recipe>';
    
    var text = document.createTextNode(str);
    document.getElementById('preview').appendChild(text);
}