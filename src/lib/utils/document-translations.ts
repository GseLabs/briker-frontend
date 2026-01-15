import * as m from "$lib/paraglide/messages";

const documentTypeTranslations: Record<string, string> = {
	identity_card: m["vendors.document_types.id_card"](),
	kbis: m["vendors.document_types.kbis"](),
	insurance: m["vendors.document_types.insurance"](),
	transport_license: m["vendors.document_types.transport_license"](),
	professional_liability: m["vendors.document_types.professional_liability"](),
	technical_inspection: m["vendors.document_types.technical_inspection"](),
	driver_license: m["vendors.document_types.driver_license"](),
	vehicle_registration: m["vendors.document_types.vehicle_registration"](),
	vehicle_insurance: m["vendors.document_types.vehicle_insurance"](),
	vehicle_inspection: m["vendors.document_types.vehicle_inspection"]()
};

export function getDocumentTypeLabel(type: string): string {
	return documentTypeTranslations[type] || type;
}
