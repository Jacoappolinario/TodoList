
# TodoList - Desafio para backend em NodeJS

API de To-do List desenvolvida utilizando NestJS para a Ubistart.

## Instalação

Clone o Repositorio

```bash
  $ git clone https://github.com/Jacoappolinario/TodoList.git
```
Instale as dependências

```bash
yarn install
```

Crie suas variáveis de ambiente com base nos exemplos de ```.env.example```

```cp .env.example .env```

Depois de copiar os exemplos, certifique-se de preencher as variáveis com novos valores, ou manter os mesmos.

## Executando a aplicação

Executando com docker-compose

Para preparar o banco de dados e também executar o aplicativo, defina suas variáveis de ambiente e execute docker-compose

```docker-compose up```

Execute o seguinte comando para iniciar o aplicativo em um ambiente de desenvolvimento

```yarn start:dev```

Por padrão a aplicação já vem com um administrador cadastrado, para utilizar, utilize as seguintes informações de autenticação.
```
email: admin@gmail.com
password: 12345
```

## Screenshots

![App Screenshot](/.github/print.png)

  