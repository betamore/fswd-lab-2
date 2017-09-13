# Full Stack Web Development - Lab 2 #
## Hello World Web Server in Node ##

### Lab Setup

1. Clone the repository to your own machine. Be sure to run the `git clone
   <repository url>` command in the same directory as you ran the `git clone`
   command for [Lab 1](http://betamore.github.io/fswd-lab-1), or at least
   _outside_ the directory that contains your laptop's copy of the first lab.
2. `cd` to the project directory and run `npm install`.
3. Run `npm test` to make sure everything is working; you could also run `npm t`
   if the extra `est` is too much typing for you.

### Making Inquiries

We're going to use a tool to make web requests from the terminal:
[`httpie`](https://httpie.org). You can install it with Homebrew by running the
command `brew install httpie`. `httpie` uses another tool called `curl`
internally to make the requests; `httpie` simply makes using `curl` simplier and
easier. For all the `httpie` commands in this lab, I will also provide the roughly
equivalent `curl` commands.

* To perform a `GET` request for `http://google.com`:

  ```sh
  http --print=Hh google.com
  curl -vs -D - http://google.com -o /dev/null 2>&1 | grep -v '^\w'
  ```

* To perform a `GET` request for `http://www.google.com`:

  ```sh
  http --print=Hh www.google.com
  curl -vs -D - http://www.google.com -o /dev/null 2>&1 | grep -v '^\w'
  ```

* To perform a `GET` request for `https://www.google.com`:

  ```sh
  http --print=Hh https://www.google.com
  curl -vs -D - https://www.google.com -o /dev/null 2>&1 | grep -v '^\w'
  ```

### Running the application

From the command line, run `npm run dev`. That will start a very
simple node HTTP server on your machine. Note that the program has to
remain running to respond to any web requests; to stop the server,
type `Control-C` (hold down the `Control` key and then press `C`).

Your terminal will stop responding to commands while the application is running.
If you need to run any other commands, you will need to open a new terminal
window.

### Making requests to your server

Open Chrome (or your preferred browser) and open the url:
[http://localhost:8000](http://localhost:8000)

* What do you see in the browser? Dig deeper and open the web page
  source in your browser (in Chrome, it's in View -> Developer -> View
  Source).
* What do you see in your terminal where the server is running?
* What happens when you request a different path on the server (e.g.,
  [http://localhost:8000/another-page](http://localhost:8000/another-page))
* Try making your requests in another terminal using the `curl`
  command (`curl -v http://localhost:8000`)

### Adding new "pages"

We have received a change request from Product Management. Now, in
addition to responding with `Hello world!` at the base url
([http://localhost:8000](http://localhost:8000)), our application needs to respond to other urls in the pattern:

* [http://localhost:8000/David](http://localhost:8000/David) &rarr; "Hello, David!"
* [http://localhost:8000/John](http://localhost:8000/John) &rarr; "Hello, John!"
* [http://localhost:8000/Lee](http://localhost:8000/Lee) &rarr; "Hello, Lee!"

To make this change, update the function inside the
`http.createServer` call in `lib/server.js`. There are already tests
written for this new case in `test/server.test.js`.

Some useful Javascript to keep in mind:

* `request` in the function has all the information about the web
  request that you will need, and `request.url` specifically will
  contain the path being requested (`/`, `/David`, `/John`, etc.).
* Strings can be indexed just like arrays:

    ```javascript
    var str = "ABCs and 123s";
    str[0] === "A";
    str[1] === "B";
    str[2] === "C";
    str[3] === "s";
    ```

* Strings have a function (like arrays have `.push` and the others)
  named `replace`. For its basic usage, It takes two arguments: the
  string to replace, and the string with which to replace it.

    ```javascript
    var str = "ABCs and 123s";
    str.replace("ABC", "XYZ") === "XYZs and 123s";
    ```

  More information is available on the
  [`replace` documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).
