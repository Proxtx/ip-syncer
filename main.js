import http from "http";
import fs from "fs/promises";
const file = await fs.readFile("loc.txt", "utf8");
const update = await fs.readFile("update.txt", "utf8");

while (true) {
  try {
    let txt = await (await fetch(file)).text();
    if (txt != "online") throw new Error("Repeat");
  } catch {
    http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
      resp.on("data", function (ip) {
        console.log("update", update.replace("<ipaddr>", ip));
        fetch(update.replace("<ipaddr>", ip));
      });
    });
  }

  await new Promise((r) => setTimeout(r, 1000));
}
