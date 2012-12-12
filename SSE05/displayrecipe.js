/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var XMLdoc;
var query;
//Video stuff:
function init(){   
    getRecipeData();
}

var vidID;

function processData(){
    
}

function getRecipeData(){    

    query = unescape(window.location.search);
    //query =
    if (query.substring(0, 1) == '?') {
        query = query.substring(1);
    }
    //var XMLdoc = loadXMLDoc("recipe.xml")
    //var text = document.createTextNode(query);
    //document.getElementById('submit').appendChild(text);
    
    XMLdoc = loadXMLString(query);   
    
    var ingredients = [];
    var x = XMLdoc.getElementsByTagName("ingredient");

    for (var i=0;i< x.length ;i++){
        var inner = [3];
        inner[0] = x[i].getAttribute("name");
        inner[1] = x[i].getAttribute("amount");
        inner[2] = x[i].getAttribute("amountType");
        inner[3] = x[i].getAttribute("id");
        ingredients[i] = inner;
    }

    showIngredients(ingredients);
    showTitle(XMLdoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);
    showDesc(XMLdoc.getElementsByTagName("desc")[0].childNodes[0].nodeValue);
    
    //load the video data, throw an exception if the video tag doesn't exist:
    try{
        var vidID = XMLdoc.getElementsByTagName("video")[0].getAttribute("id");
        var vidType = XMLdoc.getElementsByTagName("video")[0].getAttribute("type");
        if(vidID != ""){
            showVideo(vidType);                    
        }
    } catch(e){}       
    try{
        var setID = XMLdoc.getElementsByTagName("images")[0].getAttribute("id");
        if(setID != ""){            
            showImages(setID);                    
        } else{
            var div = document.getElementById('images');
            div.parentNode.removeChild(div);
        }
    } catch(e){}
    
}

function loadXMLString(txt){    
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(txt,"application/xml");    
    return xmlDoc;
}

function showIngredients(ingredients){

    //var listing = document.getElementById('ingredients');
    var table   = document.getElementById('ingredientTable');
    var row=table.insertRow(1);

    for (var i=0; i<ingredients.length;i++){

        row = table.insertRow(2);        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);   
        var cell3 = row.insertCell(2);

        cell1.innerHTML=ingredients[i][0];
        cell2.innerHTML=ingredients[i][1];
        cell3.innerHTML=ingredients[i][2];
        
        row.setAttribute('id', ingredients[i][3]);         
        
        row.onclick =  function(){
            jQuery.get("emil/getingredientrep.php",{       
                id : this.getAttribute('id')        
            },function(data){  
                var table = document.getElementById('alternativesTable');
                //clear the table:                
                //or use :  var table = document.all.tableid;
                for(var i = table.rows.length-1; i >= 0; i--)                {
                    table.deleteRow(i);
                }
                
                var x = data.getElementsByTagName("ingredient");
                var row = table.insertRow(0);
                row.setAttribute('class', 'tableHead');
                var cellHead = row.insertCell(0);
                cellHead.innerHTML = "Alternatives:";
                
                for(var j=x.length-1; j>=0;j--){
                    row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = x[j].getAttribute('name');
                }               
            });
        
        }; 
        
    }   
}

function showTitle(title){
    document.getElementById("title").innerHTML = title;
}

function showDesc(desc){
    //document.getElementById("desc").innerHTML = desc;
    var text = document.createTextNode(desc);
    document.getElementById('desc').appendChild(text);   
}


/*
 * Video playback enabling code:
 */

function onYouTubeIframeAPIReady()
{    
    window.player = new YT.Player('video', {
        width: '640',
        height: '480',
        videoId: vidID,
        events: {
            'onReady': onPlayerReady            
        }
    });
}

function onPlayerReady(event){    
    event.target.playVideo();
}

function showVideo(type){  
    
    document.getElementById('video').innerHTML = "";
    
    if(type == "youtube"){   
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);        
    }            
    else if(type == "vimeo"){
        var frame = document.createElement('iframe');
        frame.setAttribute("src", "http://player.vimeo.com/video/"+ vidID);
        frame.setAttribute("width", 640);
        frame.setAttribute("height", 480);        
        document.getElementById('video').appendChild(frame);    
        document.getElementsByTagName('video')[0].play();
    }
    
}



function showImages(setID){    
    document.getElementById('images').innerHTML = "";  
    
    var func = 'getPics';
    
    jQuery.get("imageFetch.php",{
        func : func ,
        setID : setID
        
    },function(data){     
        var jsonobj = JSON.parse(data) ;
        var photoarray = jsonobj.photoset;
        
        for(var i=0; i<photoarray.photo.length;i++){            
            jQuery("<img/>").attr({
                //building the image:
                src : 'http://farm' 
                + photoarray.photo[i].farm
                + '.static.flickr.com/'
                + photoarray.photo[i].server + '/'
                + photoarray.photo[i].id + '_'
                + photoarray.photo[i].secret + '.jpg',            
                id : photoarray.photo[i].id ,
                //setting the class and title:
                'class' : 'click',
                title : 'Click to show location on map'
            }).appendTo("#images");
        }
    });
    
}

function submitRecipe(){
    jQuery.post("emil/addrecipe.php",{
        recipe : query
    });
    
    alert("Recipe Posted");
    
    window.location = "start.html";
        
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

