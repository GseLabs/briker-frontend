<script>
	import { config } from "$lib/config/config";
	import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
	<title>{m["legal.privacy_policy.title"]()} - Briker</title>
	<meta name="description" content={m["legal.privacy_policy.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-16">
	<div class="container mx-auto max-w-4xl px-4">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-6 text-4xl font-bold text-foreground lg:text-5xl">
				{m["legal.privacy_policy.title"]()}
			</h1>
			<p class="text-lg text-muted-foreground">{m["legal.privacy_policy.last_updated"]()}</p>
		</div>

		<!-- Content -->
		<div class="space-y-8 leading-relaxed text-foreground">
			<!-- Section 1 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">1. Objet</h2>
				<p class="mb-4 text-lg">
					La présente Politique de Confidentialité a pour objet d'informer les personnes physiques
					(ci-après « <span class="italic">vous</span> » ou «
					<span class="italic">Utilisateur</span>
					») des traitements de données à caractère personnel mis en œuvre par la société Briker (ci-après
					« <span class="italic">Briker</span> »), responsable du traitement, en application du Règlement
					(UE) 2016/679 (Règlement général sur la protection des données – « RGPD ») et de la loi Informatique
					et Libertés.
				</p>
			</div>

			<!-- Section 2 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">2. Champ d'application</h2>
				<p class="mb-4 text-lg">
					Cette Politique s'applique à l'ensemble des traitements effectués par Briker dans le cadre
					de l'exploitation du site internet www.briker.fr, des applications mobiles, des services
					de livraison, des points de vente physiques (magasins partenaires) et des opérations
					commerciales afférentes. Elle s'adresse à toute personne physique âgée d'au moins quinze
					(15) ans.
				</p>
				<p class="text-lg">
					Les traitements relatifs au recrutement sont couverts par une politique spécifique « <span
						class="italic">Candidat</span
					> » disponible sur la page Carrières.
				</p>
			</div>

			<!-- Section 3 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">3. Données collectées et finalités</h2>
				<p class="mb-4 text-lg">
					Briker collecte et traite différentes catégories de données en fonction des finalités
					suivantes :
				</p>
				<ul class="space-y-3 text-lg">
					<li>
						<span class="font-semibold">Connexion et navigation</span> : données techniques (logs,
						adresse IP, cookies, identifiants de session) nécessaires à l'exploitation, à la
						sécurité et à l'amélioration de la plateforme.
						<span class="italic">Base légale : exécution du contrat et intérêt légitime.</span>
					</li>
					<li>
						<span class="font-semibold">Support et réclamations</span> : nom, prénom, adresse
						e-mail, numéro de téléphone, contenu des échanges afin de répondre aux demandes
						d'assistance et de traiter les réclamations.
						<span class="italic">Base légale : exécution du contrat et intérêt légitime.</span>
					</li>
					<li>
						<span class="font-semibold">Commandes et retraits en magasin</span> : nom, coordonnées,
						adresse de livraison, historique de commandes et éventuelles préférences afin de
						préparer les commandes et gérer les retraits en magasin.
						<span class="italic">Base légale : exécution du contrat.</span>
					</li>
					<li>
						<span class="font-semibold">Livraisons</span> : informations nécessaires à
						l'acheminement des produits (nom, adresse de livraison, numéro de téléphone) transmises
						aux livreurs partenaires.
						<span class="italic">Base légale : exécution du contrat.</span>
					</li>
					<li>
						<span class="font-semibold">Facturation et paiements</span> : coordonnées de
						facturation, informations nécessaires à la gestion des transactions et à la lutte contre
						la fraude, conservation des justificatifs comptables.
						<span class="italic">Base légale : exécution du contrat et obligations légales.</span>
					</li>
					<li>
						<span class="font-semibold">Marketing et fidélisation</span> : adresse e-mail, numéro de
						téléphone (SMS), préférences marketing pour l'envoi de newsletters, offres commerciales
						et notifications.
						<span class="italic"
							>Base légale : consentement pour les prospects, intérêt légitime pour les clients.</span
						>
					</li>
					<li>
						<span class="font-semibold">Jeux-concours et opérations promotionnelles</span> :
						coordonnées de participation, données nécessaires à l'application du règlement et à la
						remise des lots.
						<span class="italic">Base légale : exécution du règlement du jeu.</span>
					</li>
					<li>
						<span class="font-semibold">Statistiques et amélioration du service</span> : données
						anonymisées d'usage, indicateurs de performance et résultats de tests A/B.
						<span class="italic">Base légale : intérêt légitime.</span>
					</li>
					<li>
						<span class="font-semibold">Sécurité et prévention des fraudes</span> : logs, adresses
						IP, alertes de sécurité et éléments techniques permettant de détecter et prévenir les
						comportements frauduleux.
						<span class="italic">Base légale : obligation légale et intérêt légitime.</span>
					</li>
					<li>
						<span class="font-semibold">Contenus multimédias</span> : statistiques de lecture et
						d'interaction avec les contenus vidéo et autres médias intégrés, traitées de manière
						anonymisée lorsque cela est possible.
						<span class="italic">Base légale : intérêt légitime.</span>
					</li>
					<li>
						<span class="font-semibold">Rendez-vous et événements</span> : coordonnées et
						disponibilités nécessaires à la prise de rendez-vous et à l'organisation d'événements.
						<span class="italic">Base légale : exécution du contrat.</span>
					</li>
					<li>
						<span class="font-semibold">Enquêtes de satisfaction</span> : réponses aux
						questionnaires et retours d'expérience afin d'améliorer la qualité du service.
						<span class="italic">Base légale : intérêt légitime.</span>
					</li>
				</ul>
			</div>

			<!-- Section 4 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">4. Origine des données</h2>
				<p class="text-lg">
					Les données sont majoritairement collectées directement auprès de vous via les
					formulaires, le compte utilisateur, les échanges par e-mail, téléphone ou chat, ainsi que
					via les transactions en magasin. Certaines données peuvent être obtenues via des
					prestataires ou partenaires (plateformes de paiement, opérateurs d'envoi d'e-mail, réseaux
					sociaux) lorsque vous avez préalablement consenti à leur communication.
				</p>
			</div>

			<!-- Section 5 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">5. Destinataires des données</h2>
				<p class="mb-4 text-lg">
					L'accès et le traitement de vos données sont strictement encadrés. Sont destinataires :
				</p>
				<ul class="space-y-2 text-lg">
					<li>
						• Les services internes habilités de Briker (service client, exploitation, marketing,
						comptabilité, sécurité).
					</li>
					<li>
						• Les magasins partenaires et leurs équipes, lorsque cela est nécessaire à la gestion
						des commandes et des retraits.
					</li>
					<li>
						• Les sous-traitants techniques et prestataires de services (hébergement, solutions de
						paiement, plateformes d'e-mailing, CRM, outils d'analyse), contractuellement soumis à
						des obligations de confidentialité et de sécurité conformes au RGPD.
					</li>
					<li>
						• Les livreurs partenaires, qui reçoivent uniquement les données indispensables à la
						livraison (nom, adresse, tél.).
					</li>
					<li>• Les autorités compétentes en cas d'obligation légale.</li>
				</ul>
				<p class="mt-4 text-lg">
					Briker ne vend ni ne loue vos données personnelles à des tiers à des fins commerciales.
				</p>
			</div>

			<!-- Section 6 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">6. Transferts hors Union européenne</h2>
				<p class="text-lg">
					Les données sont, en principe, hébergées et traitées au sein de l'Union européenne.
					Lorsque des prestataires situés hors UE sont nécessaires, Briker met en place les
					garanties appropriées (clauses contractuelles types, décisions d'adéquation le cas
					échéant) afin d'assurer un niveau de protection conforme.
				</p>
			</div>

			<!-- Section 7 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">7. Durées de conservation</h2>
				<p class="mb-4 text-lg">
					Les données sont conservées pour des durées proportionnées aux finalités poursuivies et
					aux obligations légales applicables. À titre indicatif :
				</p>
				<ul class="space-y-2 text-lg">
					<li>
						• Données relatives au contrat et au service client : conservation pendant la durée de
						la relation contractuelle puis archivage pour une durée de cinq (5) ans, conformément
						aux délais de prescription.
					</li>
					<li>
						• Données de facturation et pièces comptables : conservation pendant cinq (5) ans
						conformément aux obligations légales.
					</li>
					<li>
						• Données à des fins marketing (e-mails, SMS, courriers) : conservation pendant trois
						(3) ans à compter du dernier contact ; la durée peut être prolongée en cas d'abonnement
						actif (ex. newsletter).
					</li>
					<li>
						• Logs et données techniques : conservation pendant un (1) an pour répondre aux
						exigences de sécurité et d'analyse technique.
					</li>
					<li>
						• Cookies : durée maximale de treize (13) mois, sous réserve des règles spécifiques
						présentées dans la Politique Cookies.
					</li>
					<li>
						• Données liées aux jeux-concours : conservation pendant trois (3) ans après la clôture
						de l'opération.
					</li>
					<li>• Statistiques anonymisées : conservation indéfinie sous forme anonymisée.</li>
				</ul>
				<p class="mt-4 text-lg">
					À l'expiration des durées applicables, les données sont supprimées ou rendues anonymes.
					Toutefois, en cas de contentieux ou obligation légale, Briker conservera les données
					nécessaires pendant la durée de la procédure.
				</p>
			</div>

			<!-- Section 8 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">8. Sécurité et confidentialité</h2>
				<p class="text-lg">
					Briker met en œuvre des mesures techniques et organisationnelles appropriées pour protéger
					vos données contre la destruction, la perte, l'altération ou l'accès non autorisé,
					notamment : chiffrement des échanges (TLS), chiffrement au repos lorsque cela est
					pertinent, contrôles d'accès fondés sur les rôles, sauvegardes régulières, journalisation
					des accès, audits et tests de vulnérabilité périodiques.
				</p>
				<p class="mt-4 text-lg">
					Les prestataires tiers sont sélectionnés et audités, et des clauses contractuelles
					encadrent leur responsabilité en matière de protection des données.
				</p>
			</div>

			<!-- Section 9 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">9. Cookies et traceurs</h2>
				<p class="text-lg">
					La politique relative aux cookies et autres traceurs détaille les finalités, la durée de
					conservation et les moyens de paramétrage. Vous pouvez à tout moment gérer vos préférences
					via le bandeau cookies présent sur le site ou via les paramètres de votre navigateur. La
					Politique Cookies est accessible depuis le site.
				</p>
			</div>

			<!-- Section 10 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">10. Droits des personnes</h2>
				<p class="mb-4 text-lg">
					Conformément à la réglementation, vous disposez des droits suivants :
				</p>
				<ul class="space-y-2 text-lg">
					<li>
						• Droit d'accès : obtenir confirmation que des données vous concernant sont traitées et
						en obtenir une copie.
					</li>
					<li>
						• Droit de rectification : obtenir la rectification des données inexactes ou
						complémentaires des données incomplètes.
					</li>
					<li>
						• Droit à l'effacement (« droit à l'oubli ») : demander la suppression de vos données
						lorsque les conditions légales sont remplies.
					</li>
					<li>
						• Droit à la limitation : demander la limitation du traitement dans les conditions
						prévues par le RGPD.
					</li>
					<li>
						• Droit d'opposition : vous opposer, pour des motifs légitimes, au traitement de vos
						données, notamment aux opérations de prospection commerciale.
					</li>
					<li>
						• Droit à la portabilité : récupérer les données que vous avez fournies dans un format
						structuré et couramment utilisé.
					</li>
					<li>
						• Droit d'établir des directives relatives au sort de vos données après votre décès.
					</li>
				</ul>
				<p class="mt-4 text-lg">
					Les demandes sont recevables à l'adresse suivante : <a
						href="mailto:dpo@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>dpo@briker.fr</a
					>, ou par voie postale au 41 rue Jacquemars GIELEE, 59800 LILLE. Briker peut demander une
					preuve d'identité afin de vérifier l'identité du demandeur. Briker s'efforce de répondre
					dans un délai d'un (1) mois à compter de la réception de la demande, délai pouvant être
					prolongé à trois (3) mois en cas de demande complexe ou de volume important de demandes.
				</p>
				<p class="mt-4 text-lg">
					Pour les consommateurs résidant en France, il est rappelé que le droit d'inscription sur
					la liste d'opposition au démarchage téléphonique BLOCTEL est possible via
					<a
						href="https://www.bloctel.gouv.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>www.bloctel.gouv.fr</a
					>.
				</p>
				<p class="mt-4 text-lg">
					En cas d'exercice abusif ou manifestement infondé d'un droit (notamment caractère
					répétitif), Briker se réserve la possibilité de refuser ou de facturer des demandes
					supplémentaires conformément à la loi.
				</p>
			</div>

			<!-- Section 11 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					11. Exercice des droits et réclamations
				</h2>
				<p class="text-lg">
					Pour exercer vos droits ou poser une question relative au traitement de vos données, vous
					pouvez contacter le Délégué à la Protection des Données (DPO) à l'adresse : <a
						href="mailto:dpo@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>dpo@briker.fr</a
					>.
				</p>
				<p class="mt-4 text-lg">
					Pour exercer vos droits ou pour toute question relative à la protection des données, vous
					pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse suivante :
					<a
						href="mailto:dpo@briker.com"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>dpo@briker.com</a
					>. Les demandes peuvent également être adressées par courrier à [adresse postale du
					siège]. Nous accusons réception et répondons dans un délai d'un (1) mois, sauf complexité
					nécessitant une prolongation (trois (3) mois au maximum)
				</p>
				<p class="mt-4 text-lg">
					Vous pouvez également adresser une réclamation à l'autorité de contrôle compétente (CNIL
					en France) :
				</p>
				<div class="mt-4 rounded-lg bg-muted p-4">
					<p class="font-semibold">Service des plaintes de la CNIL</p>
					<p>3 place de Fontenoy – TSA 80751</p>
					<p>75334 Paris Cedex 07</p>
					<p>Tél. : 01 53 73 22 22</p>
				</div>
			</div>

			<!-- Section 12 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					12. Sous-traitance, magasins et livreurs partenaires
				</h2>
				<p class="text-lg">
					Briker recourt à des sous-traitants pour l'hébergement, le traitement des paiements,
					l'envoi d'e-mails, l'analyse de données et d'autres prestations techniques. Ces
					sous-traitants interviennent sur instruction de Briker et sont soumis à des obligations
					contractuelles strictes (clause de confidentialité, obligation de sécurité, notification
					des violations de données). Les magasins partenaires reçoivent uniquement les informations
					nécessaires à la gestion des commandes et retraits. Les livreurs partenaires reçoivent
					uniquement les informations indispensables à la livraison (nom, adresse, numéro de
					téléphone). Toute divulgation en dehors des destinataires prévus n'est pas pratiquée.
				</p>
			</div>

			<!-- Section 13 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					13. Transferts et garanties contractuelles
				</h2>
				<p class="text-lg">
					Lorsque des transferts de données vers des pays tiers sont nécessaires, Briker met en
					place des garanties contractuelles appropriées (clauses contractuelles types de la
					Commission européenne, mécanismes reconnus par la CNIL) afin d'assurer un niveau de
					protection équivalent.
				</p>
			</div>

			<!-- Section 14 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					14. Conservation en cas de contentieux
				</h2>
				<p class="text-lg">
					En cas de litige, Briker se réserve le droit de conserver les données nécessaires à la
					défense de ses intérêts pendant toute la durée de la procédure, et pendant la période de
					prescription applicable.
				</p>
			</div>

			<!-- Section 15 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">15. Modification de la Politique</h2>
				<p class="text-lg">
					La présente Politique peut être modifiée pour tenir compte des évolutions réglementaires,
					jurisprudentielles ou des évolutions de nos services. La version mise en ligne sur le site
					www.briker.fr est la version de référence. La date de la dernière mise à jour figure en
					tête ou en pied de la politique.
				</p>
			</div>

			<!-- Section 16 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">16. Contact</h2>
				<div class="space-y-2">
					<p class="text-lg">
						Délégué à la Protection des Données (DPO) : <a
							href="mailto:dpo@briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>dpo@briker.fr</a
						>
					</p>
					<p class="text-lg">Adresse postale : Briker – 41 rue Jacquemars GIELEE, 59800 LILLE</p>
				</div>
			</div>
		</div>
	</div>
</div>
