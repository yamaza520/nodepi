"use strict"

function exit() {
  console.log("do exit");
  process.exit();
}

var cnt = 0;
function loop() {
  cnt++;
  console.log("loop " + cnt);
  setTimeout(loop, 500);
}

console.log("start");
process.on("SIGINT", exit);
loop();

