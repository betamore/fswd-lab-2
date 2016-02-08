# Full Stack Web Development - Lab 2: Hello World Web Server in Node

1. Fork the repository to your own Github account.
2. Clone the repository to your own machine.
3. `cd` to the project directory and run `npm install`.
4. Run `npm test` to make sure everything is working.

## Running the application

From the command line, run `node lib/index.js`. That will start a very
simple node HTTP server on your machine. Note that the program has to
remain running to respond to any web requests; to stop the server,
type `Control-C` (hold down the `Control` key and then press `C`).

## Making requests to your server

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
