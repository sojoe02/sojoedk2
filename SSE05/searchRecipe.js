/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var search = {};
var searchTable;

function init(){
    constructSearch;
}

function addIngredient(){     
    //add the ingredient to the user table:
    var name = document.getElementById('inputIngredient').value;
    var amount = document.getElementById('inputAmount').value;
    var amountType = document.getElementById('inputAmountType').value; 
    
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
    $.extend(search,x);
}