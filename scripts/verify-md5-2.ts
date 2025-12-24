
import crypto from "crypto";
const h = crypto.createHash("md5").update("12345").digest("hex");
console.log(h);
