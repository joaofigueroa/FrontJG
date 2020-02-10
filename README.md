# FrontJG

Esse projeto envolve a utilização de um template desenvolvido pelos responsáveis do portal [themezy](themezy.com) e o projeto original pode ser encontrado nesse [link](https://www.themezy.com/free-website-templates/10-movie-reviews-responsive-template).

Esse projeto faz parte da trilha de aprendizado de backend da startUp Jovens Gênios, sendo que seus requisitos podem ser encotrados nesse [repositório](https://github.com/Jovens-Genios/Trilha-de-Aprendizado-Backend). 

A implementação do backend relacionado a esse projeto se encontra nesse [repositório](https://github.com/joaofigueroa/backendJG), onde existem instruções para seu devido funcionamento.

Para que tudo funcione de forma correta por aqui, em um ambiente local é necessário a instalação de um simples servidor em sua máquina caso não haja. Durante os testes feitos ao decorrer da implementação, foi utilizado o **http-server** . Sua instalação  é bem simples, e pode ser feita globalmente a partir de seu terminal com o comando a seguir: 

```  npm install http-server -g``` 

Pronto. agora para rodar, basta navegar pelo seu terminal até o local onde se encotra o projeto e rodar o seguinte comando: 

``` http-server -p 3010``` 

A partir desse passo, se tudo estiver certo com seu [backend](https://github.com/joaofigueroa/backendJG), bastará entrar em qualquer navegador, digitar **localhost:3010** na barra de endereços que a tela inicial será carregada.

<img src="imagesMD/Screenshot from 2020-02-06 13-58-54.png">


### Bugs conhecidos

A pesquisa demanda múltiplas tentativas para seu funcionamento.(geralmente duas tentativas retornam a pesquisa)

### Melhorias necessárias

#### HotReload.

Hoje, a cada favorito adicionado é necessário atualizar a página para que as informações estejam corretas. 

#### UX

Experiência do usuário em geral é ruim. Sem feedbacks bem implementados quanto a certas ações realizadas no front. 
