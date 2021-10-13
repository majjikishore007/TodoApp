# Todo app

### This is a simple Todo app with the following features
- User authentication using JWT and cookies
- A todo endpoint which can add, delete, update and list all todos for a spfc. user
- Todo endpoint will be only for signed in users

## Endpoints

<table>
  <tr>
    <th>Endpoints</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/api/signup</td>
    <td>To signup new user</td>
  </tr>
   <tr>
    <td>/api/signin</td>
    <td>To signin an existing user</td>
  </tr>
   <tr>
    <td>/api/signout</td>
    <td>To sigout a user</td>
  </tr>
   <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>/todo/create/:userId-(post)</td>
    <td>for createing a new Todo item</td>
  </tr>
  <tr>
    <td>/todo/:todoId/:userId-(get)</td>
    <td>To get a specific Todo item</td>
  </tr>
  <tr>
    <td>/todo/:todoId/:userId-(put)</td>
    <td>for updating an existing Todo item</td>
  </tr>
  <tr>
    <td>/todo/:todoId/:userId-(delete)</td>
    <td>for deleting an existing Todo item</td>
  </tr>
  <tr>
    <td>/tods/:userId-(get)</td>
    <td>for getting a list of Todos of a specific user</td>
  </tr>
</table>


## Tech-stack
- Nodejs
- Expressjs
- MongoDB

