const TelegramBot = require('node-telegram-bot-api');  //Libreria "node-telgram-bot-api"
const token = '1227252891:AAEvPQPa1DRXB42gcs_mEmTlqCvib9-4b_8'; //Token del nostro Bot rilasciato da BotFather
var fs = require('fs'); //Libreria readfile
var Deezer = require("deezer-node"); //Libreria API Deezer
var api = new Deezer();
var param_2 = "";
var help = fs.readFileSync('C:/Users/nicop/OneDrive/Desktop/BOT/help.txt', 'utf8'); //variabile di lettura del file help.txt

const bot = new TelegramBot(token, //Inizializzazione del nostro bot e variabile polling di accesso all'API di Telgram
    {
        polling: true
    });


//Messaggio di benvenuto
bot.onText(/\/start/, (msg) => //Quando l'utente scrive /start
{
    bot.sendMessage(msg.chat.id, "Benvenuti su Rastsound, Digitare il comando /help per visualizzare i comandi disponibili"); //il bot risponde con questa stringa
});

//Comando help di visualizzazione comandi
bot.onText(/\/help/, (msg) => //Quando l'utente scrive /start
{
    bot.sendMessage(msg.chat.id, help); //il bot risponde con il file "help.txt"
});


//Link Deezer relative a determinate traccie
bot.onText(/\/findtracklink/, (msg, match) => //Quando l'utente scrive /findtracklink
{
    param_2 = match.input.split(" ")[1]; //lettura tramite split del primo valore inserito
    param_3 = match.input.split(" ")[2]; //lettura tramite split del secondo valore inserito

    if (param_3 == null) // se l'utente non ha inserito un secondo valore (ovvero la canzone è composta solo da una parola)
    {
        param_2 = param_2.replace(" ", "&"); //sostituisce gli spazi con "&" per renderlo decifrabile all'API
    
        console.log(msg.chat.id); //Stampa nel terminale di msg
        console.log(param_2); //Stampa nel terminale del valore inserito dall'utente
        var arr;
   
        api.findTracks(param_2).then(data => { // funzione findtracks dell'API che salva in data il json di risposta in base al valore param_2
        console.log(data); //Stampa nel terminale il JSON di risposta dell'API
        arr = data;
        
    })
    .then(function(){
        for(let i=0; i<arr["data"].length; i++) //Scandisco tutto il file JSON stampato dall'API
        {
           bot.sendMessage(msg.chat.id, arr["data"][i].link) //Stampo il valore link nella chat telegram di tutti valori trovati nel JSON
        }
    })
    }
    else //Se invece l'utente scrive un secondo valore (ovvero la canzone è composta da due parole) STESSA FUNZIONE precedente
    {
        param_2 = param_2.replace(" ", "&"); //sostituisce gli spazi con "&" per renderlo decifrabile all'API
        param_3 = param_3.replace(" ", "&"); //sostituisce gli spazi con "&" per renderlo decifrabile all'API
        param_4 = param_2 + " " + param_3; //Assegno ad un unica variabile i due valori inseriti
    
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
bot.onText(/\/findtrackname/, (msg, match) => //Quando l'utente scrive /findtrackname
{
    param_2 = match.input.split(" ")[1]; //lettura tramite split del primo valore inserito
    param_3 = match.input.split(" ")[2]; //lettura tramite split del secondo valore inserito
    if(param_3 == null) // se l'utente non ha inserito un secondo valore (ovvero la canzone è composta solo da una parola)
    {
        param_2 = param_2.replace(" ", "&");
    
        console.log(msg.chat.id);
        console.log(param_2);
        var arr;
   
        api.findTracks(param_2).then(data => {
        
        arr = data;
        
    })
    .then(function(){
        let messaggio="";
        for(let i=0; i<arr["data"].length; i++) //scandisco l'intero JSON stampato 
        {
            messaggio += arr["data"][i].title + "\n"; //Assegno ad una variabile il risualtato da stampare
        }
         console.log(arr["data"]);
         bot.sendMessage(msg.chat.id, messaggio); //Stampo il messaggio nella chat Telegram
    })
    }
    else //se l'utente inserisce un secondo lavore STESSA FUNZIONE PRECEDENTE
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

//LE FUNZIONI SONO DI STAMPA SONO IDENTICHE, CAMBIA LA FUNZIONE UTILIZZATA DELL'API PER I VARI COMANDI

//Trovare link Deezer tutte le tracce di un determinato album
bot.onText(/\/albumfindsonglink/, (msg, match) =>
{
    param_2 = match.input.split(" ")[1];
    param_3 = match.input.split(" ")[2];
    if(param_3 == null)
    {
        param_2 = param_2.replace(" ", "&");

        var tracksalbum;

        console.log(msg.chat.id);
        console.log(param_2);

        api.findTracks({album: param_2}).then(data => { //Aggiungendo il termine album trova solo le traccie dell'album inserito
        console.log(data);
        tracksalbum = data;
        
    })
    .then(function(){
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

        var tracksalbum;

        console.log(msg.chat.id);
        console.log(param_4);

        api.findTracks({album: param_4}).then(data => {
        console.log(data);
        tracksalbum = data;
        
    })
    .then(function(){
        for(let i=0; i<tracksalbum["data"].length; i++)
        {
           bot.sendMessage(msg.chat.id, tracksalbum["data"][i].link) //Stampo i link deezer dei brani
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
            messaggio += nametrackalbum["data"][i].title + "\n"; //Stampo il titolo dei brani
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

        api.findAlbums(param_2).then(data => { //Trova gli album nel server Deezer
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

        api.findArtists(param_2).then(data => { //Trova informazioni relative ad un artista
        console.log(data);
        artistsfind = data;
        })
            .then(function(){
            bot.sendMessage(msg.chat.id, JSON.stringify(artistsfind["data"][0].link)); //Stampo il link deezer
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