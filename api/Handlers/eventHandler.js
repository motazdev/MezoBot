import ascii from "ascii-table";
import fs from "fs";
import path from "path";

export async function loadEvents(client) {
  const table = new ascii().setHeading("Events", "Status");
  const folders = fs.readdirSync(
    path.resolve(
      `${
        process.env.NODE_ENV == "DEV" ? process.cwd() : `${process.cwd()}/api`
      }`,
      "./Events"
    )
  );
  // const folders = fs.readdirSync("./Events");
  for (const folder of folders) {
    const files = fs
      .readdirSync(
        path.resolve(
          `${
            process.env.NODE_ENV == "DEV"
              ? process.cwd()
              : `${process.cwd()}/api`
          }`,
          "./Events",
          folder
        )
      )
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const event = await import(`../Events/${folder}/${file}`);
      if (event.default?.rest) {
        if (event.default.on) {
          client.rest.on(event.default.name, (...args) => {
            return event.default.execute(...args, client);
          });
        } else {
          client.rest.once(event.default?.name, (...args) => {
            return event.default.execute(...args, client);
          });
        }
      } else {
        if (event.default?.on) {
          client.on(event.default?.name, (...args) => {
            return event.default.execute(...args, client);
          });
        } else {
          client.once(event.default?.name, (...args) => {
            return event.default.execute(...args, client);
          });
        }
      }
      table.addRow(file, "loaded");
      continue;
    }
  }

  return console.log(table.toString(), "\nLoaded events");
}
