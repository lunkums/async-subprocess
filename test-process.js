console.log("Started the process.");

// Stop working when this process receives the 'exit' message
let working = true;
process.on("message", (message) => {
  if (message === "exit") {
    working = false;
  }
});

// https://stackoverflow.com/a/47480429
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function doWork() {
  while (working) {
    // Simulate some work being done
    await delay(500);
    console.log("Completed some work.");
  }

  console.log("Exiting the process.");
  process.exit(0);
}

doWork();
