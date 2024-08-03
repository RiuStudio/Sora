import { Manager } from "../manager.js";
import { ConfigDataService } from "../services/ConfigDataService.js";
const configData = new ConfigDataService().data;
const sora = new Manager(configData, configData.utilities.MESSAGE_CONTENT.enable);

// Anti crash handling
process
  .on("unhandledRejection", (error) => sora.logger.unhandled("AntiCrash", error))
  .on("uncaughtException", (error) => sora.logger.unhandled("AntiCrash", error))
  .on("uncaughtExceptionMonitor", (error) => sora.logger.unhandled("AntiCrash", error))
  .on("exit", () =>
    sora.logger.info("ClientManager", `Successfully Powered Off Sora, Good Bye!`)
  )
  .on("SIGINT", () => {
    sora.logger.info("ClientManager", `Powering Down Sora...`);
    process.exit(0);
  });

sora.start();
