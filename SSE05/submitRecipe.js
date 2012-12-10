/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var recipe = {};
recipe.ingredients ={};
//recipe.title = {};
//recipe.description = {};

function init(){
    constructRecipe();
}

function constructRecipe(){  
    addTitle('Something Interesting');
    addDesc('this is a recipe with onions and stuffs');
    addIngredient('carrot', '5', 'ml');
    addIngredient('onion', '2', 'halves');
    addVideo('youtube','gAYL5H46QnQ');
    addImages('flikr','72157624042883634');
    constructXML();
}

function addTitle(title){
    var x = {};
    x['title'] = {title:title};
    $.extend(recipe,x);
}

function addDesc(desc){
    var x = {};
    x['desc'] = {desc:desc};
    $.extend(recipe,x);
}

function addIngredient(name, amount, amountType){    
    var x = {};
    x[name] = {name:name,amount:amount,amountType:amountType};
    $.extend(recipe.ingredients,x);
}

function addVideo(type, id){
    var video ={};
    video['video'] ={type:type, id:id};
    $.extend(recipe,video);    
}


function addImages(type, id){
    var images ={};
    images['images'] ={type:type, id:id};
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
    str += '<ingredients>'
    for(x in recipe.ingredients){
        str+='<ingredient '
        str+='name='+recipe.ingredients[x].name;
        str+=', amount=' + recipe.ingredients[x].amount;
        str+=', amountType=' + recipe.ingredients[x].amountType;
        str+='/>'
            
    }
    str+='</ingredients>'
    
    str += '</recipe>';
    
    var text = document.createTextNode(str);
    document.getElementById('preview').appendChild(text);
}