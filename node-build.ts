import { spawn } from "child_process";

const child = spawn(
	process.execPath,
	[
		"--loader",
		"ts-node/esm",
		"--experimental-specifier-resolution=node",
		"server/node-build.ts",
	],
	{
		stdio: "inherit",
		env: process.env,
	},
);

child.on("exit", (code) => {
	process.exit(code ?? 1);
});
