# Code Challenge - HOX

## Informações gerais

#### Antes de começar

* Instale as dependências do projeto: `yarn` || `npm i`
* Crie o banco de dados a seguir via docker: `docker run --name code_challenge_hox -e POSTGRES_PASSWORD=hox -p 5432:5432 -d postgres`
* Crie o seguinte banco de dados de testes para conseguir realizar os testes de integração: `postgres_tests`
* Rode as migrations para criação das tabelas no banco: `yarn typeorm migration:run` || `npm run typeorm migration:run`

#### Iniciando a API

* Para iniciar o servidor no modo de desenvolvimento: `yarn dev` || `npm run dev`

## Documentação via Insomnia

Baixe o arquivo `Insomnia_2020-10-25.json` para realizar a importação ou importe diretamente via URL `https://github.com/miguelsoliv/code-challenge-hox-nodejs/blob/master/Insomnia_2020-10-25.json`

## Estrutura do projeto
O projeto foi organizado com base no MVC e com princípios do SOLID adaptados

## Testes

* Unitários (não é preciso ter o banco criado para rodar!): `yarn unit-test` || `npm run unit-test`
  - Para facilitar a execução dos testes unitários foram criadas imitações dos repositórios de acesso ao Postgres (fake repositories). A cada execução dos testes o "banco" é zerado, pois os dados estão sendo salvos somente em memória
* Integração: `yarn integ-test` || `npm run integ-test`
* Todos: `yarn test` || `npm run test`

## Endpoints

<details>
  <summary>[POST] /users</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/users</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code> <br> <code>email=[string]</code><br> <code>password=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 201 CREATED<br> <strong>Content:</strong> <code>{ "user": { "name": "User", "email": "user@example.com", "id": "77300ab1-26d4-4403-8905-c9ff67104bdc" }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "name": "User", "email": "user@example.com", "password": "123456" }</code></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[POST] /session</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/session</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>email=[string]</code><br> <code>password=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 200 OK<br> <strong>Content:</strong> <code>{ "user": { "name": "User", "email": "user@example.com", "id": "77300ab1-26d4-4403-8905-c9ff67104bdc" }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "email": "user@example.com", "password": "123456" }</code></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[POST] /categories</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/categories</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 201 CREATED<br> <strong>Content:</strong> <code>{ "category": { "name": "My Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "name": "My Category" }</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[PUT] /categories/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/categories/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>PUT</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 200 OK<br> <strong>Content:</strong> <code>{ "category": { "name": "My New Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "name": "My New Category" }</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[DELETE] /categories/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/categories/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>DELETE</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 204 NO CONTENT</td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/categories/e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[GET] /categories/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/categories/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>GET</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 200 OK<br> <strong>Content:</strong> <code>{ "category": { "name": "My New Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/categories/e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[GET] /categories</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/categories</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>GET</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 200 OK<br> <strong>Content:</strong> <code>{ "categories": [{ "name": "My New Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" }] }</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/categories</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[POST] /products</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/products</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code><br> <code>category_id=[string]</code><br> <code>expiration_date=[Date]</code><br> <code>manufacturing_date=[Date]</code><br> <code>perishable_product=[boolean]</code><br> <code>price=[number]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 201 CREATED<br> <strong>Content:</strong> <code>{ "product": { "name": "My Product", "id": "f6312dc0-ea4c-42ec-8c54-167dd43376cb", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": true, "expiration_date": "2020-10-24T06:09:36.466Z", "price": 123.59 }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "name": "My Product", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "expiration_date": "2020-10-24T06:09:36.466Z", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": true, "price": 123.59 }</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[PUT] /products/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/products/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>PUT</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code><br> <code>category_id=[string]</code><br> <code>expiration_date=[Date]</code><br> <code>manufacturing_date=[Date]</code><br> <code>perishable_product=[boolean]</code><br> <code>price=[number]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 201 CREATED<br> <strong>Content:</strong> <code>{ "product": { "name": "My New Product", "id": "f6312dc0-ea4c-42ec-8c54-167dd43376cb", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": false, "expiration_date": "2020-10-24T06:09:36.466Z", "price": 125 }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>{ "name": "My New Product", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "expiration_date": "2020-10-24T06:09:36.466Z", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": false, "price": 125 }</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[DELETE] /products/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/products/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>DELETE</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td><strong>Required:</strong> <br> <code>name=[string]</code></td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 204 NO CONTENT</td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/products/f6312dc0-ea4c-42ec-8c54-167dd43376cb</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[GET] /products/:id</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/products/:id</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>GET</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td><strong>Required:</strong> <br> <code>id=[string]</code></td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td>Success Response</td>
        <td><strong>Code:</strong> 201 CREATED<br> <strong>Content:</strong> <code>{ "product": { "name": "My New Product", "id": "f6312dc0-ea4c-42ec-8c54-167dd43376cb", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": false, "expiration_date": "2020-10-24T06:09:36.466Z", "price": 125, "category": { "name": "My Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" } }}</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/products/f6312dc0-ea4c-42ec-8c54-167dd43376cb</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>[GET] /products</summary>
  <table style="margin-left: auto;margin-right: auto;">
    <thead>
      <tr>
        <th>Title</th>
        <th>Get Scenario</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td><code>/products</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>GET</code></td>
      </tr>
      <tr>
        <td>URL Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Data Params</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Success Response</td>
        <td><strong>Code:</strong> 200 OK<br> <strong>Content:</strong> <code>{ "products": [{ "name": "My New Product", "id": "f6312dc0-ea4c-42ec-8c54-167dd43376cb", "category_id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f", "manufacturing_date": "2020-10-24T06:09:36.466Z", "perishable_product": false, "expiration_date": "2020-10-24T06:09:36.466Z", "price": 125, "category": { "name": "My Category", "id": "e5d47ebe-1ad8-48b5-ae4f-7ffbe978fa7f" } }] }</code></td>
      </tr>
      <tr>
        <td>Sample Request</td>
        <td><code>/products</code></td>
      </tr>
      <tr>
        <td>Notes</td>
        <td><strong>Authentication required</strong></td>
      </tr>
    </tbody>
  </table>
</details>
