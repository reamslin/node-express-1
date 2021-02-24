# Broken App Issues

Issue number 1: The developer didn't tell express to parse the body as json.

Issue number 2: The developer did not include the error as an argument to catch.

Issue number 3: The developer used an async function inside map, which results in an array of promises. The array of promises need to be resolved before accessing the data. This required making the overall function asynchronous inorder to await all of the promises.


Refactored code:
I have changed the code to not use an async function inside map. The reason being that we want all of the request to github to be made instantaneously rather than to wait for each response before sending the next response. In addition, I have added a then and catch to the axios promise indicating what to do when the promise is resolved and what to do if an error occured. This prevents the program from traversing the results array multiple times in order to first gather the promises, and then translate them to response objects. It also allows for error handling on individual developers.
I have added custom Express Errors to provide more information and proper status codes to the user.
I have added a 404 page not found handler.
I have changed the var and let to be const in order to be consistent.