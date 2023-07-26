const { fork } = require("child_process");

class ProcessFarm {
  child;

  /**
   * Start the process and wait for it to exit gracefully or error out.
   * @returns Whether the process exited gracefully.
   */
  async startProcess() {
    try {
      await this.spawnChildProcess();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Send the 'exit' message to the child process, indicating it should exit.
   * @returns Whether the message was successfully delivered.
   */
  sendExitMessage() {
    return this.child.send("exit");
  }

  /**
   * Spawn a child process and return a promise contingent upon its exit status.
   * @returns A promise that will be resolved when the child process exits.
   */
  spawnChildProcess() {
    return new Promise((resolve, reject) => {
      this.child = fork("test-process.js", [], {
        cwd: __dirname,
      });

      this.child.on("exit", (code, signal) => {
        if (code === 0) {
          // Child process executed successfully
          resolve();
        } else {
          reject(
            new Error(
              `Child process exited with code ${code} and signal ${signal}`
            )
          );
        }
      });
    });
  }
}

module.exports = { ProcessFarm };
