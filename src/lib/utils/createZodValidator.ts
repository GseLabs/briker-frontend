import { type ZodSchema } from "zod";

export function createZodValidator<T extends ZodSchema<any>>(
	schema: T
): (values: unknown) => Promise<Record<string, string[]>> {
	return async (values: unknown): Promise<Record<string, string[]>> => {
		const result = await schema.safeParseAsync(values);

		if (!result.success) {
			const fieldErrors: Record<string, string[]> = {};

			result.error.issues.forEach((issue) => {
				const path = issue.path.join(".");
				if (!fieldErrors[path]) {
					fieldErrors[path] = [];
				}
				fieldErrors[path].push(issue.message);
			});

			return fieldErrors;
		}

		return {};
	};
}
