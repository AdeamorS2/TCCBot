# TCCBot - Discord Bot
##### Um bot para Discord em javascript, sua função principal é buscar letras de músicas no site www.vagalume.com.br

## Se você só quer usar:
##### Você vai depender do bot estar online para ele responder aos seus comandos.

### 1 - Adicione o bot no seu servidor
https://discordapp.com/oauth2/authorize?&client_id=347197131104452609&scope=bot&permissions=0

### 2 - Era só isso

## Se você quer criar um bot para o discord (assim como eu queria) e não quer começar do 0, só precisa de uma base:
##### Este bot e estes passos foram feitos para windows, se você utiliza outro SO procure fazer alterações quando precisar

### 1 - Instalando o Nodejs
##### Instale o nodejs (NA VERSÃO 'CURRENT' E NÃO LTS):
https://nodejs.org/en/download/current/

### 2 - Criando um bot novo
##### Crie um bot para o Discord, consiga o id e token deste bot. Este tutorial explica de maneira bem simples como criar, conseguir essas informações e autorizar o bot no servidor:
https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

### 3 - autorizar o bot (caso não tenha feito no passo 2)
##### Antes de clicar no link, substitua "SEU_ID_AQUI" pelo id do seu bot que você conseguiu no passo 2 (você precisa administrar ou possuir um servidor):
https://discordapp.com/oauth2/authorize?&client_id=SEU_ID_AQUI&scope=bot&permissions=0

### 4 - Alterar o arquivo "tccbot.js" 
##### Alterações para iniciar o bot precisam ser feitas nas linhas 14 e 20 com o id e token do seu bot. (Pode mudar o nome do arquivo, não faz diferença. Nos próximos passos eu estarei considerando o nome padrão)

### 5 - Ligar o bot e testar
##### Abra o prompt de comando (cmd), acesse a pasta onde você colocou o arquivo "tccbot.js" e execute o arquivo com o nodejs digitando:

#### node tccbot.js

### 6 - Obtendo uma resposta
##### Se der certo, no cmd aparecerá um "Oi, Mestre!" significa que o bot ligou e você deve verificar se está funcionando no seu servidor, use qualquer comando (como por exemplo o $help)
##### Se ele não responder no cmd é porque ele não conseguiu fazer login e você está utilizando um id ou token inválido.

### 7 - Alterações adicionais
##### Se quiser modificar o bot, altere o arquivo "tccbot.js" e baixe os módulos do nodejs que precisar. 

### 8 - Se divirta.

### 9 - (Opcional) Criar um .bat pra executar o bot
##### Crie um arquivo no bloco de notas, coloque instruções para ele achar a pasta do arquivo tccbot.js e executar. O meu .bat ficou assim:

#### cd ..
#### cd documents\testfolder\tccbot-master
#### node tccbot.js
#### pause

##### Com isso eu consigo encontrar a pasta onde coloquei os arquivos e só preciso executar o .bat pra ligar o bot
