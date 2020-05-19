# Recuperação de senha

- [x] Rotas e Controllers
- [x] Repositório de tokens (TypeORM)
- [x] Criar Migration de Tokens
- [x] Provider de envio de email( DEV )
- [x] Registrar providers no container
- [x] Testar Tudo

<!-- Requisitos funcionais -->
**RF**

- [x] o usuário deve  poder recuperar sua senha informando o seu e-mail;.
- [x] usuário deve receber um e-mail com instruções de recuperação de senha.
- [x] o usuario deve poder resetar sua senha.


<!--Requisitos não funcionanis  -->
**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar Amazon SES, para envios em produção;
- O envio de Emails deve acontecer em segundo plano( Background Job).

<!-- Regras de Negocio -->
**RN**

- o link enviado para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;



# Atualização do Perfil

**RF**

- [x] O usuário deve poder atualizar seu nome, email, senha;

**RNF**

**RN**

- [x] O usuário não pode alterar seu email, para um e-mail já utilizado;
- [x] Para atualizar sua senha, o usuário deve informar a senha antiga;
- [x] Para atualizar sua senha o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos, de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando **Socket.io**;
-

**RN**

- A notificação deve ter um status de lida ou não-lida, para que o prestador possa controlar;
-

# Agendamento de serviços

**RF**

- [x] O usuário deve poder listar todos os prestadores de serviço cadastrados;
- [x] O usuário deve poder listar os dias de um mes com pelo menos um horário disponivel de um prestador;
- [] O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- [] O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve duarar 1h exatamente;
- Os agendamentos devem estar disponiveis entre a8h e 18h (O Primeiro as 8h, ultimo 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;


