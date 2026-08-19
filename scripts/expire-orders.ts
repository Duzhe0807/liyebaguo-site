import "dotenv/config";
import { expireOrders } from "../lib/orders/service";

expireOrders(200)
  .then((count) => console.log(`Expired orders processed: ${count}`))
  .catch((error) => { console.error("Order expiry worker failed", error instanceof Error ? error.message : "Unknown error"); process.exitCode = 1; });