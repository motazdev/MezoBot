import * as fs from "fs";
import ascii from "ascii-table";
import path from "path";
export async function loadCommands(client) {
  const table = new ascii().setHeading("Commands", "Status");

  let commandsArray = [];
  const commandsFolder = fs.readdirSync(
    path.resolve(
      `${
        process.env.NODE_ENV == "DEV" ? process.cwd() : `${process.cwd()}/api`
      }`,
      "./Commands"
    )
  );
  for (const folder of commandsFolder) {
    const Commandfiles = fs
      .readdirSync(
        path.resolve(
          `${
            process.env.NODE_ENV == "DEV"
              ? process.cwd()
              : `${process.cwd()}/api`
          }`,
          "./Commands",
          folder
        )
      )
      .filter((file) => file.endsWith(".js"));

    for (const file of Commandfiles) {
      const command = await import(`../Commands/${folder}/${file}`);

      client.commands.set(command.default.data.name, command.default);

      commandsArray.push(command.default.data.toJSON());

      table.addRow(file, "loaded");
      continue;
    }
  }
  client.application.commands.set(commandsArray);
  return console.log(table.toString(), "\nLoaded commands");
}
