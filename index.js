const TelegramBot = require('node-telegram-bot-api');
const token = '1227252891:AAEvPQPa1DRXB42gcs_mEmTlqCvib9-4b_8';
var Deezer = require("deezer-node");
var api = new Deezer();
var param_2 = "";

const bot = new TelegramBot(token,
    {
        polling: true
    });


//Link Deezer relative a determinate traccie
bot.onText(/\/findtracklink/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];

    if (param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var tracks;
    
        console.log(msg.chat.id);
        console.log(param_2);
        var arr;
   
        api.findTracks(param_2).then(data => {
        console.log(data);
        arr = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<arr["data"].length; i++)
        {
           bot.sendMessage(msg.chat.id, arr["data"][i].link)
        }
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var tracks;
    
        console.log(msg.chat.id);
        console.log(param_4);
        var arr;
   
        api.findTracks(param_4).then(data => {
        console.log(data);
        arr = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<arr["data"].length; i++)
        {
           bot.sendMessage(msg.chat.id, arr["data"][i].link)
        }
    })
    }
});

//Nomi relativi a determinate tracce
bot.onText(/\/findtrackname/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];
    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var tracks;
    
    console.log(msg.chat.id);
    console.log(param_2);
    var arr;
   
    api.findTracks(param_2).then(data => {
        
        arr = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<arr["data"].length; i++)
        {
            messaggio += arr["data"][i].title + "\n";
        }
         console.log(arr["data"]);
         bot.sendMessage(msg.chat.id, messaggio);
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var tracks;
    
    console.log(msg.chat.id);
    console.log(param_4);
    var arr;
   
    api.findTracks(param_4).then(data => {
        
        arr = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<arr["data"].length; i++)
        {
            messaggio += arr["data"][i].title + "\n";
        }
         console.log(arr["data"]);
         bot.sendMessage(msg.chat.id, messaggio);
    })
    }
});

//Trovare link Deezer tutte le tracce di un determinato album
bot.onText(/\/albumfindsonglink/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];
    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var tracks;
        var arr;

        console.log(msg.chat.id);
        console.log(param_2);

        api.findTracks({album: param_2}).then(data => {
        console.log(data);
        tracksalbum = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<tracksalbum["data"].length; i++)
        {
           bot.sendMessage(msg.chat.id, tracksalbum["data"][i].link)
        }
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var tracks;
        var arr;

        console.log(msg.chat.id);
        console.log(param_4);

        api.findTracks({album: param_4}).then(data => {
        console.log(data);
        tracksalbum = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<tracksalbum["data"].length; i++)
        {
           bot.sendMessage(msg.chat.id, tracksalbum["data"][i].link)
        }
    })
    }
});

//Trovare nomi tutte le tracce di un determinato album
bot.onText(/\/albumfindsongname/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];
    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var nametrackalbum

    console.log(msg.chat.id);
    console.log(param_2);

    api.findTracks({album: param_2}).then(data => {

        nametrackalbum = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<nametrackalbum["data"].length; i++)
        {
            messaggio += nametrackalbum["data"][i].title + "\n";
        }
         console.log(nametrackalbum["data"]);
         bot.sendMessage(msg.chat.id, messaggio);
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var nametrackalbum

    console.log(msg.chat.id);
    console.log(param_4);

    api.findTracks({album: param_4}).then(data => {

        nametrackalbum = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<nametrackalbum["data"].length; i++)
        {
            messaggio += nametrackalbum["data"][i].title + "\n";
        }
         console.log(nametrackalbum["data"]);
         bot.sendMessage(msg.chat.id, messaggio);
    })
    }
});

//Trova un determinato album (inserire nome album)
bot.onText(/\/findalbum/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];

    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");
    
        var albumsfind;

        console.log(msg.chat.id);
        console.log(param_2);

        api.findAlbums(param_2).then(data => {
        console.log(data);
        albumsfind = data;
    })
    .then(function(){
        for(let i=0; i<albumsfind["data"].length; i++)
        {
            bot.sendMessage(msg.chat.id, JSON.stringify(albumsfind["data"][i].link));
        }
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var albumsfind;

        console.log(msg.chat.id);
        console.log(param_4);

        api.findAlbums(param_4).then(data => {
        console.log(data);
        albumsfind = data;
    })
    .then(function(){
        for(let i=0; i<albumsfind["data"].length; i++)
        {
            bot.sendMessage(msg.chat.id, JSON.stringify(albumsfind["data"][i].link));
        }
    })
    }
});

//Informazioni su un determinato album (inserire l'id deezer dell'album)
bot.onText(/\/albuminfo/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_2 = param_2.replace(" ", "&");
    
    var albums;

    console.log(msg.chat.id);
    console.log(param_2);

    api.getAlbum(param_2).then(data => {
        console.log(data);
        albums = data;
    })
    .then(function(){
        for(let i=0; i<albums["data"].length; i++)
        {
            bot.sendMessage(msg.chat.id, JSON.stringify(albums["data"][i].link));
        }
    })
});

//Trova informazioni di un artista (inserire nome artista)
bot.onText(/\/findartist/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];

    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var artistsfind;

        console.log(msg.chat.id);
        console.log(param_2);

        api.findArtists(param_2).then(data => {
        console.log(data);
        artistsfind = data;
        })
            .then(function(){
            bot.sendMessage(msg.chat.id, JSON.stringify(artistsfind["data"][0].link));
            })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;
    
        var artistsfind;

        console.log(msg.chat.id);
        console.log(param_4);

         api.findArtists(param_4).then(data => {
        console.log(data);
        artistsfind = data;
    })
    .then(function(){
            bot.sendMessage(msg.chat.id, JSON.stringify(artistsfind["data"][0].link));
    })
    }
});

 //Informazioni su un determinato artista (inserire l'id deezer dell'album)
bot.onText(/\/artistinfo/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];
    param_2 = param_2.replace(" ", "&");
    param_3 = param_3.replace(" ", "&");
    param_4 = param_2 + " " + param_3;
    
    var artists;

    console.log(msg.chat.id);
    console.log(param_4);

    api.getArtist(param_4).then(data => {
        console.log(data);
        artists = data;
    })
    .then(function(){
        bot.sendMessage(msg.chat.id, JSON.stringify(artists["data"]));
    })
});

//Trova classifica
bot.onText(/\/findchart/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];

    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var chartss;

        console.log(msg.chat.id);
        console.log(param_2);

        api.getChart(param_2).then(data => {
        console.log(data);
        chartss = data;
    })
    .then(function(){
        bot.sendMessage(msg.chat.id, JSON.stringify(chartss["tracks"]["data"][0]));
    })
    }
    else
    {
        param_2 = param_2.replace(" ", "&");
        param_3 = param_3.replace(" ", "&");
        param_4 = param_2 + " " + param_3;

        var chartss;

        console.log(msg.chat.id);
        console.log(param_4);

        api.getChart(param_4).then(data => {
        console.log(data);
        chartss = data;
    })
    .then(function(){
        bot.sendMessage(msg.chat.id, JSON.stringify(chartss["tracks"]["data"][0]));
    })
    }
});

bot.on("polling_error", function(err)
{
    console.log(err);
});