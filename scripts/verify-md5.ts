
import crypto from "crypto";

const pass = "admin";
const hash = crypto.createHash("md5").update(pass).digest("hex");
console.log(`Pass: "${pass}"`);
console.log(`Hash: "${hash}"`);

const pass2 = "123456";
const hash2 = crypto.createHash("md5").update(pass2).digest("hex");
console.log(`Pass: "${pass2}"`);
console.log(`Hash: "${hash2}"`);
