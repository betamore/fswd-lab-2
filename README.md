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

### How does the web work?

When you enter a url into your browser (or click on a link somewhere), a whole series of things happen behind the scenes.

1. The browser breaks up the url to be visited into different parts. For example,
   for the url: `http://github.com/betamore/fswd-lab-2`

   * Protocol: `http://`
   * Host: `github.com`
   * Path: `/betamore/fswd-lab-2`

2. The browser then uses the domain name system of the internet (DNS for short)
   to find the actual location to which to send the request. You can do that step
   yourself by running `host -t A github.com`. The result of that request is the
   internet protocol address (IP address) of the host.

3. The browser determines *where* on the remote server to make the request based
   on the protocol. The default location for the `http` protocol is port 80 (for
   `https` it is 443). If the host part of the url is followed by `:<some number>`,
   the browser will use that as the port to which it connects.

4. Using the IP and port information, the browser makes the connection to the web
   server (this is the TCP part of TCP/IP).

5. Once the connection is established, the browser sends the actual web request
   to the server.

   ```http
   GET /betamore/fswd-lab-2 HTTP/1.1
   Accept: */*
   Host: github.com


   ```

   `GET` is part of the HTTP protocol. It indicates to the web server what type
   of request is being made, specifically in this case that it is a simple
   page/information retrieval request. Other types of requests are `POST`, `PUT`,
   `DELETE`, `PATCH`, `HEAD`, and more.

6. After it receives the request, the web server does what it needs to do, and
   generates a response to send back to the browser.

   ```http
   HTTP/1.1 200 OK
   Content-Type: text/html; charset=utf-8
   Date: Wed, 13 Sep 2017 17:58:41 GMT

   <html>Some page stuff</html>
   ```

   The numeric value after the `HTTP/1.1` is the response status code. It lets
   the browser know if the request succeeded, or if not, it will give the browser
   a clue as to what was wrong. There are three primary ranges of status code
   values.

   * 200-299: The request was successful (for various kinds of successful)
   * 300-399: The request was successful, but the browser will need to make an additional request. Usually reflected in a `Location: <new-url-to-request>` header in the response.
   * 400-499: There was a problem with the request itself. Ever heard of a 404?
   * 500-599: There was a problem handling the request on the server side.

   Or, as I like to summarize it:

   * 200s: Everything is fine
   * 300s: Go look over there
   * 400s: You (the browser) screwed up
   * 500s: I (the web server) screwed up

7. Now that the browser has the response to its request, it renders the HTML
   into the browser window (or whatever happens to be the appropriate way to handle the response).

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
* Try making your requests in another terminal using the `http` or `curl`
  commands (`http --verbose localhost:8000` or `curl -v http://localhost:8000`)

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
