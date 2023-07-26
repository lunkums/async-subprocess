const { ProcessFarm } = require("./process-farm");

async function run() {
  // Start the process
  const instance = new ProcessFarm();
  const result = instance.startProcess().then((status) => {
    // Report the results of the process
    if (status) {
      console.log("Successfully exited the child process.");
    } else {
      console.log("Unsuccessfully exited the child process.");
    }
  });

  // Wait 2 seconds until stopping the process
  setTimeout(() => {
    if (!instance.sendExitMessage()) {
      throw new Error(
        "Failed to send the 'exit' message to the child process."
      );
    }
  }, 2000);

  // Wait for the results
  await result;
}

run();
