# User Service

Serviço responsável pelo gerenciamento do usuário.

**Funcionalidades:**

- Criar usuário

```
curl --location 'http://127.0.0.1:5001/challenge-open-circle/us-central1/api/users' \
--header 'Content-Type: application/json' \
--data '{
    "name": "User Test"
}'
```
