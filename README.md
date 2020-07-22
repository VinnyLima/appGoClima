# Go Clima
> Aplicativo desenvolvido para obter a localização atual do usuario via geolocalização e exibir dados climaticos.



O App tem como como objetivo auxiliar o usuario no clima da região onde ele se encontra, 
a ideia proposta seria de obter a localização geografica de onde o usuario estaria localizado e
com esse dados exibir o endereço e as condições climaticas de onde o mesmo se encontra
 e um botão para atualizar a aplicação caso ele mude de região.

<img src="assets/readme/tela1.png" height="350" width="160">

## Instalação

Android:

Realize um git clone em sua maquina

```sh
git clone https://github.com/VinnyLima/appGoClima.git
```

IOS

```sh
git clone https://github.com/VinnyLima/appGoClima.git
```
## Mais configurações

Após clonar o repositorio realize os seguinte comandos

Para instalar as libs
```sh
# YARN
yarn install

#NPM
npm install
```

Para realizar a criação do aplicativo no emulador
```sh
# YARN
yarn android
ou
yarn ios

#NPM
npm android
ou 
npm ios

#Direct
react-native run-android
react-native run-ios
```
Para executar o app no emulador;



## Exemplo de uso

Alguns exemplos interessantes e úteis sobre como seu projeto pode ser utilizado. Adicione blocos de códigos e, se necessário, screenshots.

_Para mais exemplos, consulte a [Wiki][wiki]._ 

## Configuração para Desenvolvimento

Descreva como instalar todas as dependências para desenvolvimento e como rodar um test-suite automatizado de algum tipo. Se necessário, faça isso para múltiplas plataformas.

```sh
make install
npm test
```

## Histórico de lançamentos

* 0.2.1
    * MUDANÇA: Atualização de docs (código do módulo permanece inalterado)
* 0.2.0
    * MUDANÇA: Remove `setDefaultXYZ()`
    * ADD: Adiciona `init()`
* 0.1.1
    * CONSERTADO: Crash quando chama `baz()` (Obrigado @NomeDoContribuidorGeneroso!)
* 0.1.0
    * O primeiro lançamento adequado
    * MUDANÇA: Renomeia `foo()` para `bar()`
* 0.0.1
    * Trabalho em andamento

## Meta


