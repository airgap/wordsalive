const list = await Bun.file("./alphabetical.csv")
  .text()
  .then((t) => t.trim().split("\n"));
const scrambled = [];
while (list.length)
  scrambled.push(...list.splice(Math.floor(Math.random() * list.length), 1));
await Bun.write("./public/words.csv", scrambled.join("\n"));
