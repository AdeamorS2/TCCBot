/* ################# REQUISITOS ############### */
const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);

/* ############# VARIAVEIS GLOBAIS ############ */
//PREFIXO DE COMANDOS DO TCC BOT
var prefixo = '$'; 		
var botId = 'xxxxxxxxxxxxxxxxxxxx';	 //ID DO BOT

//ID DA MANTARO BOT
var mantaroId = '213466096718708737';

/*	################## LOGIN ################## */
client.login('xxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxx');	//TOKEN DO BOT

/*	############### INICIALIZAÇÃO ############# */
client.on('ready', () => {
	console.log('Oi Mestre!');
});

/*	########## CORPO E COMPORTAMENTO ########## */
//ROTINA PADRÃO AO ESCUTAR QUALQUER MENSAGEM NO CHAT, AQUI COMEÇA O FLUXO
client.on('message', message => {
	if(!verificaMantaro(message)){
		if(message.content.charAt(0) == prefixo){
			respostas(message);
		}
	}
	return true;
});

//VERIFICA SE A MANTARO BOT ENVIOU A MENSAGEM DE MÚSICA TOCANDO
function verificaMantaro(message){
	if(message.author.id == mantaroId){
		str = message.content;
		comandoIsNowPlaying = str.search("Now playing ");
		if(comandoIsNowPlaying > 0){
			var str = retiraExcesso(str);
			var query = trataString(str);
			
			procuraLetra(query, message, 1);
			return true;
		}
	}else{
		return false;
	}	
}

//RESPOSTAS DE ROTINA, CUSTOMIZE
function respostas(message){
	var str = message.content;
	var mensagem = str.toLowerCase();
	switch(mensagem){
		case prefixo+'ping':
			//message.reply('Eu estou viva');
			message.channel.send({embed: {
			color: 0xFE3775,
			description: 'Não se preocupe, eu estou viva'}});
			break;
		case prefixo+'oi':
			message.channel.send({embed: {
			color: 0xFE3775,
			description: 'Oii, tudo bem? ^~^'}});
			break;
		case prefixo+'salve':
			message.channel.send({embed: {
			color: 0xFE3775,
			description: 'Salve!'}});
			break;
		case prefixo+'tchau':
		case prefixo+'boa noite':
			message.channel.send({embed: {
			color: 0xFE3775,
			description: 'Não vai embora não, eu to fazendo bolo'}});
			break;
		case prefixo+'ajuda':
		case prefixo+'help':
			ajuda(message);				
			break;
		default:
			//VERIFICAÇÃO PRA VER SE É UM COMANDO DE LETRA
			achouComandoLetra = mensagem.search("letra ");	
			if(achouComandoLetra > 0){
				var query = trataString(str);
				resultado = procuraLetra(query, message, 1);
			}else{
				message.channel.send({embed: {
				color: 0xFE3775,
				title: 'Não saquei',
				description: 'Me perdoa, eu não entendi mesmo :C'}});
			}
			break;
	}
}

//TRATAMENTO DE TÍTULO (SOMENTE ACONTECE QUANDO É UMA MENSAGEM DA MANTARO E O BOT PRECISA ACHAR O AUTOR E TÍTULO DA MÚSICA)
function retiraExcesso(str){
	var fim = str.search(" \\(");
	var str = str.substring(17, fim);
	
	var fim2 = str.search("\\[");
	if(fim2>0){
		var str = str.substring(0, fim2);
	}
	
	return str;
}

//RETORNOS DE BUSCA
function saidasTccBot(message, valor, dados){
	switch(valor){
		case 'sem letra':
			message.channel.send({embed: {
				color: 0xFE3775,
				title: 'A busca.. Falhou',
				description: 'Não encontrei esta letra, desculpe desapontá-lo(a) :C\nLembre-se que eu procuro assim:\nwww.vagalume.com.br/nome-do-autor/nome-da-musica :)'
			}});
		break;
		case 'com letra':
			//DIVISÃO DE STRINGS PARA O DISCORD ACEITAR MAIS DE 1024 CARACTERES
			var str1 = letra.substring(0, 1000);
			var str2 = letra.substring(1000, 2000);
			var str3 = letra.substring(2000, 3000);
			var str4 = letra.substring(3000, 4000);
			var str5 = letra.substring(4000, 5000);
			var str6 = letra.substring(5000, letra.length);

			var tamanhoLetra = 0;
			
			if(str6 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1},
				{name: '(^~^)', value: str2},
				{name: '(e.e)', value: str3},
				{name: '(@o@)', value: str4},
				{name: '(o.o)', value: str5},
				{name: '($.$)', value: str6}
				]};
			}else if(str5 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1},
				{name: '(^~^)', value: str2},
				{name: '(e.e)', value: str3},
				{name: '(@o@)', value: str4},
				{name: '(o.o)', value: str5}
				]};
			}else if(str4 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1},
				{name: '(^~^)', value: str2},
				{name: '(e.e)', value: str3},
				{name: '(@o@)', value: str4}
				]};
			}else if(str3 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1},
				{name: '(^~^)', value: str2},
				{name: '(e.e)', value: str3}
				]};
			}else if(str2 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1},
				{name: '(^~^)', value: str2}
				]};
			}else if(str1 != ''){
				embed = {color: 0xFE3775,author: {name: titulo,},title: autor,url: "https://"+url,fields: [
				{name: "Letra: ",value: str1}
				]};
			}
			//process.on('unhandledRejection', console.error); //detalhes de exceções
			message.channel.send({embed});
		break;
		default:
			message.channel.send({embed: {
				color: 0xFE3775,
				description: 'Caiu no default :T'
			}});
		break;
	}
}

//FUNÇÃO PRINCIPAL DE BUSCA DA LETRA
function procuraLetra(query, message, tentativa){
	const options = {
		hostname: 'www.vagalume.com.br',
		port: 443,
		path: '/',
		method: 'GET'
	};
	options['path'] += query + '.html'
	url = options['hostname'] + options['path'];
	
	//DESCOMENTE PARA DEBUG OU PARA SABER A QUERY/URL
	console.log(url);
	console.log('query = '+query);
	//message.channel.send({embed: { color: 0xFE3775, description: 'musica = '+query }});
	
	var body = '';
	
	callback = function(response) {
		response.on('data', function (chunk) {
			body += chunk;
		});

		response.on('end', function () {
			retorno = trataBodyHTML(body, message);
			if(retorno != null){
				dados = [retorno[0], retorno[1], retorno[2], url];
				console.log('achei!\n');
				saidasTccBot(message, 'com letra', dados);
			}else{
				if(tentativa == 2){
					retorno2 = trataBodyHTML(body, message);
					if(retorno != null){
						dados = [retorno[0], retorno[1], retorno[2], url];
						console.log('achei!\n');
						saidasTccBot(message, 'com letra', dados);
					}else{
						console.log('nao achei!\n');
						saidasTccBot(message, 'sem letra', arrayNulo=[]);
					}
				}else{
					query = inverteQuery(query);
					procuraLetra(query, message, 2);
				}
			}
		});
	}
	var req = https.request(options, callback).end();
	
	return true;
}

//INVERTE O NOME DO AUTOR E DA MÚSICA
function inverteQuery(query){
	var divisao = query.search("\/");
	var str1 = query.substring(0, divisao);
	var str2 = query.replace(str1+"\/", "");
	
	return query;
}

//FUNÇÃO DE TRATAMENTO DO RETORNO HTML (ESPECIFICAMENTE PARA O SITE VAGALUME)
function trataBodyHTML(body, message){
	// APRESENTACAO (AUTOR + TITULO)
	tipo = 1;
	var inicioApresentacao = 0;
	inicioApresentacao = body.search("<div id=header>");
	if(inicioApresentacao == -1){
		inicioApresentacao = body.search('<div id=header class=notHasAlbum>');
		tipo=2;
	}
		
	var fimApresentacao = 0;
	
	if(tipo == 2){
		fimApresentacao = body.search("<div id=content>");
		var apresentacao = body.substring(inicioApresentacao+38, fimApresentacao);
	}else{
		fimApresentacao = body.search("<div id=boxData class=close>");
		var apresentacao = body.substring(inicioApresentacao+22, fimApresentacao);
	}

	apresentacao = trataApresentacao(apresentacao);
	var semAutorizacao = body.search('<div class="notAuthorized noselect">');
	if(semAutorizacao != -1){
		apresentacao = '';
	}
	
	// TITULO 
	titulo = trataTitulo(apresentacao);
	
	//AUTOR 
	autor = trataAutor(apresentacao);
	
	// LETRA 
	var inicioLetra = body.search("<div itemprop=description>");
	var fimLetra = body.search("<div id=lyrFoot>");
	letra = body.substring(inicioLetra, fimLetra);
	letra = trataLetra(letra);
	
	//FINALMENTE
	//console.log(titulo);
	//console.log(autor);
	//console.log(letra);
	
	if(titulo != '' && autor != '' && letra != ''){
		var dados = [titulo, autor, letra];
		return dados;
	}else{
		return null;
	}
}

//RETIRA O EXCESSO NO TÍTULO
function trataTitulo(apresentacao){
	var fim = apresentacao.search('"');
	var titulo = apresentacao.substring(0, fim);
	titulo = titulo.replace('"', "");
	
	return titulo;
}

//RETIRA O EXCESSO NO AUTOR
function trataAutor(apresentacao){
	var inicio = apresentacao.search('"');
	var autor = apresentacao.substring(inicio, apresentacao.length);
	autor = autor.replace('"', "");
	return autor;
}

//RETORNA SOMENTE O TÍTULO E O AUTOR 
function trataApresentacao(apresentacao){
	var inicio = apresentacao.search('<a');
	var fim = apresentacao.search('">');
	var str1 = apresentacao.substring(0, inicio);
	var str2 = apresentacao.substring(fim, apresentacao.length);
	apresentacao = str1 + str2;
	apresentacao = apresentacao.replace(" id=header", "");
	apresentacao = apresentacao.replace("href=", "");
	for(i=0;i<apresentacao.length;i++){
		apresentacao = apresentacao.replace("/", "");
	}
	apresentacao = apresentacao.replace("<p id=extra>", "");
	apresentacao = apresentacao.replace(/<h1>/g, "");
	apresentacao = apresentacao.replace(/<p>/g, "");
	apresentacao = apresentacao.replace(/<div>/g, "");
	apresentacao = apresentacao.replace(/<a>/g, "");
	apresentacao = apresentacao.replace(/>/g, "");

	return apresentacao;
}

//RETORNA SOMENTE A LETRA
function trataLetra(letra){
	letra = letra.replace("<div itemprop=description>", "");
	for(i=0;i<letra.length;i++){
		letra = letra.replace("/", "");
	}
	letra = letra.replace(/<br>/g, "\n");
	letra = letra.replace(/<div>/g, "");
	letra = letra.replace(/<hr>/g, "");
	return letra;
}


//VOCÊ DEVE ALTERAR CASO ADICIONE COMANDOS
function ajuda(message){
	message.channel.send({embed: {
		color: 0xFE3775,
		title: "Acho que você precisa de ajuda..",
		description: '\nOs comandos não tem diferenciação de letras maíusculas ou minúsculas, é indiferente com acentuação.\nLembre-se de usar o (' + prefixo +  ') antes de algum comando.\n',
		fields: [{
        name: prefixo+"ping",
        value: "Não é realmente um ping."
		},{
		name: prefixo+"ajuda ou " + prefixo+"help",
        value: "Abre esta tela linda de comandos."
		},{
		name: prefixo+"letra <nome do autor> - <nome da música> ou \n"+prefixo+"letra <nome da música> - <nome do autor>",
        value: "Busco letras de músicas no site Vagalume\nTenha em mente que eu busco assim: \nwww.vagalume.com.br/nome-do-autor/nome-da-musica\nEntão tente facilitar para mim, tudo bem?"
		},{
		name: '"Era só isso?"',
        value: "Não, este não é um comando. Ajude o Ademin sugerindo comandos (simples), nós todos queremos ver esta lista crescer (ღ˘⌣˘ღ)"
		}]
	}});
}


//TRATAMENTO DE BUSCA, RETIRA ACENTUAÇÃO DO PORTUGUÊS E MAIS UM POUCO
function trataString(str){
	//str = message.content;
	//console.log(str);
	
	str = str.toLowerCase();

	str = str.replace(" jr. ", ' jr ');
	str = str.replace(" -♫", '');
	str = str.replace(" \| ", '');
	str = str.replace(prefixo+"letra ", '');
	str = str.replace(" - lyrics", "");
	str = str.replace(" lyrics", "");
	str = str.replace(/ã/g, 'a');
	str = str.replace(" - versao", "");
	str = str.replace(" versao", "");
	str = str.replace(" - version", "");
	str = str.replace(" version", "");
	str = str.replace(" - ver", "");
	str = str.replace(" ver.", "");
	
	str = str.replace(" - clipe", "");
	str = str.replace(" clipe", "");
	str = str.replace(" oficial", "");
	str = str.replace(" official", "");
	str = str.replace(" - clip", "");
	str = str.replace(" clip", "");
	str = str.replace(" - letra", "");
	str = str.replace(" letra", "");
	str = str.replace(" - hd", "");
	str = str.replace(" hd", "");
	str = str.replace(" - live", "");
	str = str.replace(" live", "");
	str = str.replace(" - ao vivo", "");
	str = str.replace(" ao vivo", "");
	
	str = str.replace(" .mp3", "");
	str = str.replace(" .mp4", "");
	str = str.replace(".mp3", "");
	str = str.replace(".mp4", "");
	
	str = str.replace(/ú/g, 'u');
	str = str.replace(" - acustico", "");
	str = str.replace(" acustico", "");
	str = str.replace(" - acoustic", "");
	str = str.replace(" acoustic", "");
	
	str = str.replace("\\", "");
	str = str.replace(" - ", "/");
	str = str.replace(" by ", "/");
	str = str.replace("-", "-");
	str = str.replace(/ /g, '-');
	str = str.replace(/  /g, ' ');
	str = str.replace(/\,/g, '');
	str = str.replace(/\ ?/g, '');
	str = str.replace(/\?/g, '');
	str = str.replace(/\.../g, '');
	str = str.replace(/\../g, '');
	str = str.replace(/\. /g, '-');
	str = str.replace(/\./g, '-');
	str = str.replace(/\(/g, '');
	str = str.replace(/\)/g, '');
	str = str.replace(/\---/g, '-');
	str = str.replace(/\--/g, '-');
	str = str.replace(/\&/g, 'and');
	str = str.replace(/á/g, 'a');
	str = str.replace(/â/g, 'a');
	str = str.replace(/à/g, 'a');
	str = str.replace(/å/g, 'a');
	str = str.replace(/ä/g, 'a');
	str = str.replace(/é/g, 'e');
	str = str.replace(/ê/g, 'e');
	str = str.replace(/è/g, 'e');
	str = str.replace(/ë/g, 'e');
	str = str.replace(/í/g, 'i');
	str = str.replace(/î/g, 'i');
	str = str.replace(/ì/g, 'i');
	str = str.replace(/ï/g, 'i');
	str = str.replace(/ó/g, 'o');
	str = str.replace(/ô/g, 'o');
	str = str.replace(/ò/g, 'o');
	str = str.replace(/ø/g, 'o');
	str = str.replace(/õ/g, 'o');
	str = str.replace(/ö/g, 'o');
	str = str.replace(/û/g, 'u');
	str = str.replace(/ù/g, 'u');
	str = str.replace(/ü/g, 'u');
	str = str.replace(/ñ/g, 'n');
	str = str.replace(/ç/g, 'c');
	str = str.replace(/ý/g, 'y');
	str = str.replace(/'/g, '');
	str = str.replace(/\"/g, "");
	str = str.replace(/!/g, "");
	str = str.replace(/\*/g, '');
	
	return str;
}


