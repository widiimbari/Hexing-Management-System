
import crypto from "crypto";

const target = "c3284d0f94606de1fd2af172aba15bf3";
const candidates = [
    "admin", "123456", "12345", "password", "hexing", "root", "admin123", "user", 
    "adminadmin", "ADMIN", "Admin", "123", "1234", "test"
];

candidates.forEach(c => {
    const h = crypto.createHash("md5").update(c).digest("hex");
    if (h === target) {
        console.log(`FOUND! Password is: ${c}`);
        process.exit(0);
    }
});

console.log("Not found in candidates.");
