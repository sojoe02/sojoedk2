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
    
    //load the video data, throw and exception if the video tag doesn't exist:
    try{
        var vidID = XMLdoc.getElementsByTagName("video")[0].getAttribute("id");
        showVideo(vidID);
    } catch(e){         
    }     
}

function showIngredients(ingredients){

    var listing = document.getElementById('ingredients');
    var table   = document.createElement('table');
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

//Video stuff:
function initVideo(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function showVideo(link){   

    //var link = 'CEVdca9U9LM';

    var player = new YT.Player('video', {
        height: '390',
        width: '640',
        videoId: link,
        events: {
    //'onReady': onPlayerReady,
    //'onStateChange': onPlayerStateChange
    }
    });  
    
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
