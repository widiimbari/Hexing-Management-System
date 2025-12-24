
import crypto from "crypto";

const pass = "admin";
const hash1 = crypto.createHash("md5").update(pass).digest("hex");
console.log(`Hash1 (client): ${hash1}`);

const hash2 = crypto.createHash("md5").update(hash1).digest("hex");
console.log(`Hash2 (double): ${hash2}`);
