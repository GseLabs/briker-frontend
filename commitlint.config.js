import { execSync } from "child_process";

const getCurrentBranch = () => {
	try {
		return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
	} catch (error) {
		return "unknown";
	}
};

const isMainBranch = getCurrentBranch() === "main" || getCurrentBranch() === "master";

export default {
	extends: ["@commitlint/config-conventional"],
	plugins: ["commitlint-plugin-function-rules"],
	rules: {
		"type-enum": [
			2,
			"always",
			["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]
		],
		"subject-case": [2, "never", ["pascal-case", "upper-case"]],
		"subject-empty": [2, "never"],
		"subject-full-stop": [2, "never", "."],
		"header-max-length": [2, "always", 100],
		"function-rules/type-empty": [
			2,
			"always",
			(parsed) => {
				if (!parsed.type) {
					return [false, "Type should not be empty"];
				}
				return [true];
			}
		],
		"function-rules/scope-empty": [
			2,
			"always",
			(parsed) => {
				if (isMainBranch && !parsed.scope) {
					return [false, "Scope is required on main branch"];
				}
				return [true];
			}
		]
	}
};
