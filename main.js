import http from "http";
import fs from "fs/promises";
const file = await fs.readFile("loc.txt", "utf8");
const update = await fs.readFile("update.txt", "utf8");

while (true) {
  try {
    let txt = await (await fetch(file)).text();
    if (txt != "online") throw new Error("Repeat");
  } catch {
    try {
      fetch(
        update.replace(
          "<ipaddr>",
          await (await fetch("https://api.ipify.org/")).text()
        )
      );
    } catch (e) {
      console.log("IP sync fail");
    }
  }

  await new Promise((r) => setTimeout(r, 1000));
}
