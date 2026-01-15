interface Config {
	email: {
		dpo: string;
		rgpd: string;
		contact: string;
	};
	phone: string;
	address: string;
	website: string;
	apps: {
		googlePlay: string;
		appStore: string;
	};
}

export const config: Config = {
	email: {
		dpo: "dpo@briker.fr",
		rgpd: "rgpd@briker.fr",
		contact: "contact@briker.fr"
	},
	phone: "XXXXXXXXX",
	address: "41 rue Jacquemars GIELEE, 59800 LILLE",
	website: "https://www.briker.fr",
	apps: {
		googlePlay: "https://play.google.com/store/apps/details?id=fr.briker.app",
		appStore: "https://apps.apple.com/app/briker/id1234567890"
	}
};
