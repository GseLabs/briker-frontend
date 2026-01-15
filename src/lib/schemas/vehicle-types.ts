import * as v from "valibot";
import * as m from "$lib/paraglide/messages";

export const vehicleTypeSchema = v.object({
	label: v.pipe(v.string(), v.minLength(1, m["admin_vehicle_types.label_required"]())),
	maxWeightKg: v.pipe(
		v.string(),
		v.transform(Number),
		v.number(),
		v.minValue(0, m["admin_vehicle_types.weight_positive"]())
	),
	maxDistanceKm: v.pipe(
		v.string(),
		v.transform(Number),
		v.number(),
		v.minValue(0, m["admin_vehicle_types.distance_positive"]())
	),
	maxLengthCm: v.pipe(
		v.string(),
		v.transform(Number),
		v.number(),
		v.minValue(0, m["admin_vehicle_types.length_positive"]())
	),
	maxWidthCm: v.pipe(
		v.string(),
		v.transform(Number),
		v.number(),
		v.minValue(0, m["admin_vehicle_types.width_positive"]())
	),
	maxHeightCm: v.pipe(
		v.string(),
		v.transform(Number),
		v.number(),
		v.minValue(0, m["admin_vehicle_types.height_positive"]())
	),
	needsDocuments: v.optional(v.boolean(), false)
});
