# 🚀 Aplicação Backend com Spring Boot, Angular e PostgreSQL no Docker
# teste JoinTech

## Tecnologias Utilizadas

- **Java 17**
- **Spring Boot**
- **Angular**
- **PostgreSQL**
- **Docker**
- **Apache Maven**
- **Node.js** / **npm**

---

## Passos para Configuração

### 1. Instalação do Java 17

Certifique-se de que o Java 17 esteja instalado em seu sistema. Para verificar a instalação, utilize:

```bash
java -version
```

### 2 .Instalar Docker Desktop ou CLI (Linux)
Baixe e instale o Docker para rodar o banco de dados PostgreSQL.

Rodar PostgreSQL no Docker
Execute o seguinte comando para inicializar o banco de dados:

```bash
docker run --name postgres-crud -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=crud_db -p 5432:5432 -d postgres
```
### 3. Instalar Maven
Certifique-se de ter o Maven instalado. Verifique com o comando:

```bash
mvn -v
```

### 4. Compilar e Rodar a Aplicação Spring Boot
Execute os seguintes comandos na pasta do projeto:

```bash
mvn clean install
mvn spring-boot:run
```

### 5. Instalar Angular CLI
Se você ainda não possui o Angular CLI, instale com o comando:

```bash
npm install -g @angular/cli
```
### 6 Baixar Dependências do Frontend
Na pasta do frontend Angular, execute:

```bash
npm install
```

### 7. Rodar o Frontend Angular
Execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
ng serve
```
### 8. Acessar a Aplicação

```bash
Backend: http://localhost:8080
Frontend: http://localhost:4200
```

### 9. utilizar usuario e password para um usuario padrao login

```bash
user
passowrd
```

    
