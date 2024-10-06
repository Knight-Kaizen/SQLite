import { open } from "fs/promises";

const databaseFilePath = process.argv[2];
const command = process.argv[3];

if (command === ".dbinfo") {
  const databaseFileHandler = await open(databaseFilePath, "r");

  const { buffer } = await databaseFileHandler.read({
    length: 106,
    position: 0,
    buffer: Buffer.alloc(106),
  });

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.log("Logs from your program will appear here!");
  console.log('Read Buffer:', buffer);
  console.log('Header:', buffer.toString('utf-8', 0, 16)); // Displaying first 16 bytes as string
  // Uncomment this to pass the first stage
  const pageSize = buffer.readUInt16BE(16); // page size is 2 bytes starting at offset 16
  const cellCount = buffer.readUInt16BE(103);
  console.log(`database page size: ${pageSize}`);
  console.log(`number of tables: ${cellCount}`);
} else {
  throw `Unknown command ${command}`;
}
