### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Async/await and promises

- What is a Promise?

a one time guarantee for a future value. It can either be resolved or rejected. 

- What are the differences between an async function and a regular function?

Asynchronous functions allow you to perform time consuming operations without pausing execution.

- What is the difference between Node.js and Express.js?

Node is for writing server-side js. Express is a framework for writing web applications and is built on node

- What is the error-first callback pattern?

Error-first callback pattern takes in an error object as first argument. If no error, the value is null.

- What is middleware?

Middleware acts as a bridge between requests and responses. They are functions that take in the request object, the response object, and what to do "next"

- What does the `next` function do?

next tells the function to continue on to the next middleware function or next matching handler. if it is passed an argument, it will be sent to the error handling operation.

- What does `RETURNING` do in SQL? When would you use it?

RETURNING allows you to return data that was changed without using additional SELECTS.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
This program will execute each request one at a time, and will only move on to send the next request after the previous one has returned a response. this program does not offer any error handling.