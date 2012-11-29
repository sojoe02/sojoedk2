/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function getRecipeData(){
    
    document.getElementById('ingredients').innerHTML ="" ;
    
    var XMLdoc = loadXMLDoc("ingredients.xml");    
    var ingredients = [];    
    var x = XMLdoc.getElementsByTagName("ingredient");        
 
    for (var i=0;i< x.length ;i++){
        var inner = [2];
        inner[0] = x[i].getAttribute("name");        
        inner[1] = x[i].getAttribute("calories");
        
        ingredients[i] = inner;
    }
    
    showIngredients(ingredients);
    showTitle(XMLdoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);
    showDesc(XMLdoc.getElementsByTagName("desc")[0].childNodes[0].nodeValue);
}

function showIngredients(ingredients){    
    
    var listing = document.getElementById('ingredients');
    var table       = document.createElement('table');
    var row=table.insertRow(0);     
    
    for (var i=0; i<ingredients.length;i++){   
        
        row         = table.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        
        cell1.innerHTML=ingredients[i][0];
        cell2.innerHTML=ingredients[i][1];                
    }  
    listing.appendChild(table); 
    
}

function showTitle(title){
    document.getElementById("title").innerHTML = title;
}


function showDesc(desc){
    document.getElementById("desc").innerHTML = desc;
}



function createIngredientArray(rows){   
    
}


function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}

