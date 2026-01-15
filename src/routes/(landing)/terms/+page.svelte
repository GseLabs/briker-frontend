<script>
	import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
	<title>{m["legal.terms.title"]()} - Briker</title>
	<meta name="description" content={m["legal.terms.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-16">
	<div class="container mx-auto max-w-4xl px-4">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-6 text-4xl font-bold text-foreground lg:text-5xl">
				{m["legal.terms.title"]()}
			</h1>
			<p class="text-lg text-muted-foreground">{m["legal.terms.last_updated"]()}</p>
		</div>

		<!-- Introduction -->
		<div class="mb-8">
			<p class="text-lg leading-relaxed text-foreground">
				L'accès et l'utilisation de la plateforme Briker (ci-après « <span class="italic"
					>la Plateforme</span
				>
				») proposée par la SAS Briker, (ci-après « <span class="italic">Briker</span> » ou «
				<span class="italic">la Société</span> ») sont soumis aux présentes Conditions Générales d'Utilisation
				(CGU). En se connectant et en utilisant la Plateforme, tout Utilisateur reconnaît avoir pris
				connaissance et accepte sans réserve l'intégralité des présentes dispositions.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-foreground">
				Briker agit exclusivement en tant qu'intermédiaire technique et commercial. À ce titre,
				Briker n'intervient ni en qualité de vendeur, ni en qualité de loueur, ni en tant
				qu'employeur, et n'exerce aucun contrôle direct sur la réalisation des prestations, la
				qualité des produits, ou le comportement des fournisseurs, partenaires ou livreurs. Chaque
				fournisseur ou livreur agit sous sa propre responsabilité commerciale ou professionnelle, en
				toute indépendance.
			</p>
		</div>

		<!-- Content -->
		<div class="space-y-8 leading-relaxed text-foreground">
			<!-- Section 1 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">1. DÉFINITIONS</h2>
				<p class="mb-4 text-lg">
					<span class="font-semibold">Utilisateur</span> : Toute personne physique ou morale accédant
					à la Plateforme, qu'elle agisse en tant que Client, Partenaire, Livreur ou autre.
				</p>
				<p class="mb-4 text-lg">
					<span class="font-semibold">Compte</span> : L'ensemble des identifiants, mots de passe et informations
					permettant à un Utilisateur d'accéder à la Plateforme.
				</p>
				<p class="mb-4 text-lg">
					<span class="font-semibold">Services</span> : L'ensemble des fonctionnalités et services proposés
					via la Plateforme, incluant notamment :
				</p>
				<ul class="ml-6 space-y-2 text-lg">
					<li>
						• <span class="italic">Briker Express</span> : Livraison express de matériel de chantier
						et produits divers.
					</li>
					<li>
						• <span class="italic">Briker Loc</span> : Location de matériel entre professionnels et particuliers.
					</li>
					<li>
						• <span class="italic">Briker Service</span> : Recrutement temporaire d'artisans à la journée.
					</li>
					<li>
						• <span class="italic">Briker Destock</span> : Vente ou dépôt de matériel neuf ou d'occasion.
					</li>
				</ul>
				<p class="mt-4 mb-4 text-lg">
					<span class="font-semibold">Commande</span> : Toute demande de service passée via la Plateforme,
					incluant les modalités de paiement, de livraison et d'exécution.
				</p>
				<p class="mb-4 text-lg">
					<span class="font-semibold">Contenu</span> : Les données, images, textes, vidéos et tout autre
					support mis à disposition sur la Plateforme.
				</p>
				<p class="mb-4 text-lg">
					<span class="font-semibold">Livreur</span> : Le prestataire indépendant chargé d'assurer la
					livraison des produits ou matériels commandés.
				</p>
				<p class="text-lg">
					<span class="font-semibold">Partenaire/Fournisseur</span> : Toute entité proposant des biens
					ou services via la Plateforme.
				</p>
			</div>

			<!-- Section 2 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					2. ACCEPTATION DES CGU ET MODIFICATIONS
				</h2>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Acceptation</h3>
				<p class="mb-4 text-lg">
					L'utilisation de la Plateforme implique l'acceptation intégrale et sans réserve des
					présentes CGU. Aucun service ne peut être utilisé sans avoir préalablement accepté ces
					conditions.
				</p>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Modification</h3>
				<p class="text-lg">
					Briker se réserve le droit de modifier à tout moment les présentes CGU. En cas de
					modification majeure, un préavis de 30 jours sera envoyé par e-mail et affiché sur la
					Plateforme. L'utilisation continue de la Plateforme après notification vaut acceptation
					des nouvelles CGU.
				</p>
			</div>

			<!-- Section 3 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">3. ACCÈS À LA PLATEFORME</h2>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Disponibilité</h3>
				<p class="mb-4 text-lg">
					La Plateforme est accessible en continu (24/7), sauf lors de maintenances programmées ou
					en cas d'événements de force majeure.
				</p>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Restriction d'accès</h3>
				<p class="text-lg">
					Briker se réserve le droit de limiter, suspendre ou interrompre l'accès à la Plateforme à
					tout Utilisateur ne respectant pas les présentes CGU ou adoptant un comportement
					frauduleux ou nuisible.
				</p>
			</div>

			<!-- Section 4 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">4. INSCRIPTION, COMPTE ET SÉCURITÉ</h2>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Création de compte</h3>
				<p class="mb-4 text-lg">
					Pour accéder à certains services, l'Utilisateur doit créer un compte en fournissant des
					informations exactes et à jour. Une vérification (via e-mail ou SMS) peut être requise.
				</p>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Responsabilité du compte</h3>
				<p class="mb-4 text-lg">
					L'Utilisateur est seul responsable de la confidentialité de ses identifiants et de toutes
					les actions réalisées depuis son compte. Il s'engage à notifier immédiatement Briker en
					cas d'utilisation frauduleuse.
				</p>
				<h3 class="mb-3 text-xl font-semibold text-foreground">Mesures de sécurité</h3>
				<p class="text-lg">
					Briker met en place des protocoles de chiffrement et autres mesures techniques
					(certificats SSL, double authentification, etc.) afin de sécuriser les échanges de
					données, tout en rappelant qu'aucune solution n'est infaillible.
				</p>
			</div>

			<!-- Section 5 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					5. OBLIGATIONS ET RESPONSABILITÉS DES UTILISATEURS
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">5.1 Pour les Clients</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Utilisation licite</h4>
				<p class="mb-4 text-lg">
					Le Client s'engage à utiliser la Plateforme conformément à la loi et aux CGU.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Exactitude des informations</h4>
				<p class="mb-4 text-lg">
					Le Client doit vérifier l'exactitude des informations fournies lors de la commande
					(adresse de livraison, spécifications du matériel, etc.) et signaler toute anomalie dès
					réception.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Réception des services</h4>
				<p class="text-lg">
					Il est impératif que le Client vérifie l'état et la conformité du matériel ou service à la
					livraison, sous peine de voir la réclamation rejetée s'il ne respecte pas les délais de
					notification (48 heures maximum).
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					5.2 Pour les Partenaires et Fournisseurs
				</h3>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Qualité et conformité</span> : Les Partenaires s'engagent à
						fournir des produits et services conformes aux descriptions et aux normes en vigueur.
					</li>
					<li>
						• <span class="font-semibold">Documentation et certifications</span> : Ils doivent fournir
						toutes les attestations, certificats et informations nécessaires pour garantir la sécurité
						et la traçabilité des transactions.
					</li>
					<li>
						• <span class="font-semibold">Responsabilité contractuelle</span> : En cas de non-respect
						de leurs obligations, Briker se réserve le droit de suspendre ou résilier leur accès à la
						Plateforme.
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">5.3 Pour les Livreurs</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Vérification des qualifications</h4>
				<p class="mb-4 text-lg">
					Les livreurs doivent fournir la preuve de leur capacité à réaliser les livraisons
					(assurance responsabilité civile, permis de conduire, licence etc.) et accepter de se
					soumettre à des contrôles.
				</p>
				<p class="mb-4 text-lg">
					Les Livreurs sont des prestataires de service indépendants. Briker ne fournit aucun
					véhicule, assurance, ni équipement, et n'est pas responsable des dommages, retards ou
					accidents causés durant la livraison, qui relèvent de la responsabilité du Livreur ou de
					son assurance personnelle.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Sécurité de la livraison</h4>
				<p class="mb-4 text-lg">
					Ils s'engagent à respecter les procédures de livraison (état des lieux à la prise en
					charge et à la livraison) et à signaler immédiatement tout incident.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Indépendance</h4>
				<p class="text-lg">
					Le lien contractuel entre le Livreur et le Client demeure exclusivement privé. Briker ne
					peut être tenu responsable des relations contractuelles directes.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					5.4. Statut juridique des Livreurs
				</h3>
				<p class="text-lg">
					Les Livreurs sont des prestataires indépendants agissant pour leur propre compte. Ils
					utilisent la Plateforme de manière autonome, sans lien de subordination juridique,
					économique ou organisationnel avec Briker. Aucune clause des présentes CGU ne pourra être
					interprétée comme établissant une relation d'employeur à salarié, d'agent, de mandataire
					ou de franchiseur avec les Livreurs.
				</p>
			</div>

			<!-- Section 6 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					6. MODALITÉS DE COMMANDE ET DE TRANSACTION
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">6.1 Processus de commande :</h3>
				<p class="mb-4 text-lg">
					Le Client passe commande via la Plateforme en sélectionnant le service désiré.
				</p>
				<p class="mb-4 text-lg">
					Un récapitulatif détaillé (description du service, coût, délais) est présenté avant
					validation.
				</p>

				<h3 class="mb-3 text-xl font-semibold text-foreground">6.2 Paiement sécurisé :</h3>
				<p class="mb-4 text-lg">
					Les transactions sont réalisées via des systèmes de paiement tiers certifiés.
				</p>
				<p class="mb-4 text-lg">
					Le montant est prélevé dès la confirmation de la commande, avec des justificatifs envoyés
					par e-mail ou via l'application.
				</p>

				<h3 class="mb-3 text-xl font-semibold text-foreground">6.3 Suivi de commande :</h3>
				<p class="mb-4 text-lg">
					Un système de suivi en temps réel est disponible sur le compte utilisateur afin de suivre
					l'état d'avancement de la commande.
				</p>
				<p class="mb-4 text-lg">
					En cas de problème, le service client de Briker est accessible pour intervenir rapidement.
				</p>

				<h3 class="mb-3 text-xl font-semibold text-foreground">6.4 Droit de rétractation</h3>
				<p class="mb-4 text-lg">
					Conformément aux articles L.221-18 et suivants du Code de la consommation, les clients
					consommateurs disposent d'un délai de 14 jours à compter de la commande pour exercer leur
					droit de rétractation, sauf exceptions légales. Pour les services exécutés immédiatement
					ou les produits personnalisés, ce droit ne s'applique pas.
				</p>

				<h3 class="mb-3 text-xl font-semibold text-foreground">
					6.5. Spécificités des Clients professionnels
				</h3>
				<p class="mb-4 text-lg">
					Les Clients professionnels reconnaissent expressément que les droits applicables aux
					consommateurs (tels que le droit de rétractation, le recours à un médiateur ou certaines
					garanties légales) ne leur sont pas applicables, sauf disposition légale impérative
					contraire.
				</p>
				<p class="text-lg">
					Ils reconnaissent également que les relations contractuelles nouées via la Plateforme
					relèvent de leur seule responsabilité professionnelle.
				</p>

				<h3 class="mb-3 text-xl font-semibold text-foreground">6.6. Mandat d'encaissement</h3>
				<p class="text-lg">
					Le Client reconnaît que Briker agit comme simple mandataire d'encaissement pour le compte
					des Fournisseurs, Loueurs ou Artisans utilisant la Plateforme. Les paiements sont
					collectés par un prestataire agréé de services de paiement (PSP), conformément à la
					réglementation applicable.
				</p>
				<p class="mt-4 text-lg">
					Les fonds transitent par des comptes séquestres avant d'être reversés aux Partenaires
					concernés. Briker ne conserve pas ces fonds et ne peut être tenu responsable des délais,
					refus ou incidents imputables au PSP ou à une obligation réglementaire (vérification, gel,
					lutte anti-blanchiment).
				</p>
			</div>

			<!-- Section 7 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">7. SPÉCIFICITÉS DES SERVICES</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">7.1 Briker Express (Livraison)</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Sélection du livreur :</h4>
				<p class="mb-4 text-lg">
					Après validation de la commande, un Livreur qualifié est automatiquement sélectionné.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Délais et risques :</h4>
				<p class="mb-4 text-lg">
					Les délais indiqués sont des estimations ; dès la prise en charge par le Livreur, le
					risque de perte ou d'endommagement est transféré au Client.
				</p>
				<p class="mb-4 text-lg">
					Le Client doit vérifier l'état du produit dès réception et signaler immédiatement toute
					anomalie.
				</p>
				<p class="mb-4 text-lg">
					Les Livreurs sont des prestataires de service indépendants. Briker ne fournit aucun
					véhicule, assurance, ni équipement, et n'est pas responsable des dommages, retards ou
					accidents causés durant la livraison, qui relèvent de la responsabilité du Livreur ou de
					son assurance personnelle.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Assurances :</h4>
				<p class="text-lg">
					Une assurance spécifique couvre certains incidents, dont les modalités seront détaillées
					dans un document annexe remis au Client lors de la commande.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">7.2 Briker Loc (Location)</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Obligations du loueur :</h4>
				<ul class="space-y-2 text-lg">
					<li>
						• Fournir un matériel en parfait état de fonctionnement, accompagné d'un état des lieux
						détaillé.
					</li>
					<li>
						• Mettre à disposition une attestation d'assurance ou souscrire à l'assurance proposée
						par Briker.
					</li>
				</ul>
				<h4 class="mt-4 mb-2 text-lg font-semibold text-foreground">Engagement du locataire :</h4>
				<ul class="space-y-2 text-lg">
					<li>
						• Respecter les conditions d'utilisation, la durée de location et procéder à la
						restitution du matériel dans l'état initial.
					</li>
					<li>• Signaler immédiatement tout dommage ou dysfonctionnement.</li>
				</ul>
				<h4 class="mt-4 mb-2 text-lg font-semibold text-foreground">
					Garanties et indemnisations :
				</h4>
				<p class="text-lg">
					Les modalités de garantie et d'indemnisation en cas de dégradation ou vol sont clairement
					définies dans un contrat annexe.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					7.3 Briker Service (Recrutement d'artisans)
				</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Engagement des artisans :</h4>
				<p class="mb-4 text-lg">
					Les artisans doivent fournir une preuve de qualification et une assurance décennale en
					cours de validité.
				</p>
				<p class="mb-4 text-lg">
					Ils s'engagent à réaliser les prestations conformément aux normes en vigueur.
				</p>
				<p class="mb-4 text-lg">
					En cas de vente ou prestation de service entre un professionnel et un consommateur, le
					vendeur est tenu d'appliquer la garantie légale de conformité (articles L.217-3 et
					suivants du Code de la consommation) et la garantie des vices cachés. Le rôle de Briker
					étant celui d'intermédiaire, il appartient au vendeur d'en assurer l'exécution.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Limitation de responsabilité :</h4>
				<p class="mb-4 text-lg">
					Briker n'agit pas en qualité d'employeur et ne pourra être tenu responsable des litiges
					contractuels entre le Client et l'artisan.
				</p>
				<p class="mb-4 text-lg">
					Les conditions d'exécution et de résolution des litiges sont précisées dans un accord de
					mission propre à ce service.
				</p>
				<p class="text-lg">
					En tout état de cause, Briker n'est pas responsable de la mauvaise exécution, du retard,
					de l'abandon de chantier ou des malfaçons dans la réalisation de la prestation de service
					demandée.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					7.4 Briker Destock (Vente/Dépôt)
				</h3>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Rôle de l'intermédiaire :</h4>
				<p class="mb-4 text-lg">
					Briker met en relation vendeurs et acheteurs. La responsabilité de la conformité des biens
					reste à la charge du vendeur.
				</p>
				<p class="mb-4 text-lg">
					Briker se réserve le droit de retirer toute annonce frauduleuse ou douteuse.
				</p>
				<h4 class="mb-2 text-lg font-semibold text-foreground">Garanties légales :</h4>
				<p class="text-lg">
					Le vendeur doit informer l'acheteur de toutes les garanties légales (vice caché,
					conformité) et fournir les documents nécessaires.
				</p>
				<p class="mt-4 text-lg">
					En cas de vente entre un professionnel et un consommateur, le vendeur est tenu d'appliquer
					la garantie légale de conformité (articles L.217-3 et suivants du Code de la consommation)
					et la garantie des vices cachés. Le rôle de Briker étant celui d'intermédiaire, il
					appartient au vendeur d'en assurer l'exécution.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					7.5. Responsabilité administrative et fiscale des Partenaires
				</h3>
				<p class="text-lg">
					Chaque Partenaire ou Fournisseur utilisant la Plateforme s'engage à se conformer à
					l'ensemble de ses obligations légales, fiscales, sociales et comptables, notamment en
					matière de facturation, de TVA, d'assurance et d'immatriculation.
				</p>
				<p class="mt-4 text-lg">
					Briker n'est en aucun cas responsable des déclarations fiscales ou sociales des
					Partenaires, ni du respect de leurs obligations professionnelles. Il appartient à chaque
					Partenaire de vérifier la conformité de son statut et des services rendus via la
					Plateforme avec la réglementation applicable.
				</p>
			</div>

			<!-- Section 8 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					8. UTILISATION DE LA PLATEFORME ET MESURES DE SÉCURITÉ
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">
					8.1 Encadrement des moyens de preuve / communications
				</h3>
				<p class="text-lg">
					Toute notification ou preuve d'échange effectuée via la Plateforme ou l'e-mail associé au
					compte utilisateur fera foi entre les parties.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">8.2 Comportement prohibé :</h3>
				<p class="text-lg">
					L'Utilisateur interdit toute utilisation frauduleuse ou visant à compromettre la sécurité
					de la Plateforme (tentatives d'intrusion, manipulation de données, etc.).
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					8.3 Intuitu personae du compte
				</h3>
				<p class="text-lg">
					Le compte Briker est personnel et ne peut être utilisé par des individus différents, tant
					pour les prestations de service, les livraisons ou le déstockage, que ce soit pour la
					vente ou l'achat
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">8.4 Audit et contrôle :</h3>
				<p class="text-lg">
					Briker se réserve le droit de réaliser des audits réguliers (techniques et contractuels)
					pour vérifier le respect des présentes CGU.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					8.5 Réaction aux incidents :
				</h3>
				<p class="text-lg">
					En cas d'incident technique ou de faille de sécurité, Briker mettra tout en œuvre pour
					rétablir le service dans les plus brefs délais. La responsabilité de Briker ne pourra être
					engagée qu'en cas de faute lourde avérée.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					8.6. Interdiction de contournement
				</h3>
				<p class="text-lg">
					Il est formellement interdit à tout Utilisateur de conclure en direct, en dehors de la
					Plateforme, une relation commerciale avec un autre Utilisateur (notamment un Partenaire,
					Livreur ou Artisan) rencontré via Briker, sans passer par la Plateforme. Cette
					interdiction s'applique pendant toute la durée d'utilisation et pendant une période de 12
					mois suivant la dernière transaction.
				</p>
				<p class="mt-4 text-lg">
					Toute infraction pourra entraîner une suspension immédiate du Compte, des pénalités
					contractuelles et le cas échéant, des poursuites judiciaires.
				</p>
			</div>

			<!-- Section 9 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">9. PROPRIÉTÉ INTELLECTUELLE</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">9.1 Titularité des droits :</h3>
				<p class="text-lg">
					Briker détient l'intégralité des droits de propriété intellectuelle liés à la Plateforme
					(design, logos, logiciels, contenus…).
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					9.2 Utilisation restreinte :
				</h3>
				<p class="text-lg">
					Toute reproduction ou exploitation totale ou partielle de la Plateforme sans autorisation
					expresse est interdite.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					9.3 Protection des marques :
				</h3>
				<p class="text-lg">
					Les marques et logos affichés sont protégés par la législation en vigueur.
				</p>
			</div>

			<!-- Section 10 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">10. LIMITATION DE RESPONSABILITÉ</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">10.1 Exclusions et limites :</h3>
				<p class="mb-4 text-lg">La responsabilité de Briker ne saurait être engagée :</p>
				<ul class="space-y-2 text-lg">
					<li>
						• en cas de mauvaise exécution ou inexécution du contrat due au fournisseur, artisan ou
						livreur ;
					</li>
					<li>• en cas de perte de profits, préjudice indirect, perte de chance ;</li>
					<li>• en cas de dysfonctionnement temporaire de la Plateforme ;</li>
					<li>• pour les contenus ou offres mis en ligne par les utilisateurs ;</li>
					<li>• en cas de piratage ou force majeure (cf. article 8) ;</li>
				</ul>
				<p class="mt-4 text-lg">
					La responsabilité globale de Briker, en toute hypothèse, est limitée au montant
					effectivement payé par l'utilisateur dans le cadre du service concerné.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">10.2 Cas des tiers :</h3>
				<p class="text-lg">
					La responsabilité de Briker ne saurait être engagée pour les actions ou omissions des
					tiers (Partenaires, Livreurs, Fournisseurs).
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">10.3. Indemnisation</h3>
				<p class="text-lg">
					Chaque Utilisateur s'engage à indemniser, défendre et garantir Briker, ainsi que ses
					dirigeants, employés, partenaires et sous-traitants, contre toute réclamation, perte,
					responsabilité, frais ou dommage (y compris les frais d'avocat raisonnables) résultant :
				</p>
				<ul class="mt-4 space-y-2 text-lg">
					<li>• d'une violation des présentes CGU,</li>
					<li>• de l'utilisation frauduleuse, abusive ou contraire aux lois de la Plateforme,</li>
					<li>• de toute infraction à une réglementation applicable.</li>
				</ul>
				<p class="mt-4 text-lg">
					Cette obligation survivra à la résiliation du Compte Utilisateur, quelle qu'en soit la
					cause.
				</p>
			</div>

			<!-- Section 11 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					11. RÉCLAMATIONS ET RÈGLEMENT DES LITIGES
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">Procédure de réclamation :</h3>
				<p class="mb-4 text-lg">
					Toute réclamation relative à la livraison (produit endommagé, manquant, non conforme ou
					erreur de destinataire) doit être signalée par le Client dans un délai maximum de
					quarante-huit (48) heures suivant la réception du produit ou du matériel, via le
					formulaire de contact de la Plateforme ou par e-mail à l'adresse <a
						href="mailto:serviceclient@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>serviceclient@briker.fr</a
					>, en y joignant tout justificatif pertinent (photos, bon de livraison, facture, etc.).
				</p>
				<p class="mb-4 text-lg">
					En cas d'insatisfaction concernant une prestation réalisée par un Artisan recruté via
					Briker Service, le Client peut adresser sa réclamation directement au prestataire
					concerné. Toutefois, afin d'assurer un suivi centralisé et la traçabilité des échanges,
					toute réclamation doit également être signalée à Briker via le formulaire prévu à cet
					effet sur la Plateforme ou par e-mail à <a
						href="mailto:serviceclient@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>serviceclient@briker.fr</a
					>.
				</p>
				<p class="mb-4 text-lg">
					À défaut de réclamation formulée dans ce délai, la livraison sera réputée conforme et
					acceptée, sauf en cas de vice caché tel que défini aux articles 1641 et suivants du Code
					civil.
				</p>
				<p class="mb-4 text-lg">
					Cette disposition s'applique sans préjudice des garanties légales applicables en cas de
					vente entre un professionnel et un consommateur.
				</p>
				<p class="mb-4 text-lg">
					Briker ne peut être tenu responsable de l'issue d'un litige entre le Client et l'Artisan,
					mais pourra intervenir en qualité de facilitateur, sans garantie de résolution.
				</p>
				<p class="text-lg">
					Les Utilisateurs ayant acquis ou vendu un bien via Briker Destock peuvent contacter
					directement la partie cocontractante (vendeur ou acheteur) pour toute réclamation portant
					sur la conformité ou l'état du bien.
				</p>
				<p class="mt-4 text-lg">
					Toutefois, Briker devra être informé de cette réclamation via la Plateforme ou à l'adresse <a
						href="mailto:serviceclient@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>serviceclient@briker.fr</a
					> afin d'assurer la traçabilité du différend. Briker, en tant qu'intermédiaire, ne saurait
					être tenu responsable du défaut d'exécution ou de l'absence de réponse d'un Utilisateur à une
					réclamation.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">Service client</h3>
				<p class="mb-4 text-lg">
					Le Service Client Briker est à la disposition des Utilisateurs pour toute question,
					demande d'assistance, réclamation ou litige relatif à l'utilisation de la Plateforme ou
					aux Services proposés.
				</p>
				<div class="rounded-lg bg-muted p-4">
					<p class="font-semibold">📍 Contact :</p>
					<p>
						• Par e-mail : <a
							href="mailto:serviceclient@briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>serviceclient@briker.fr</a
						>
					</p>
					<p>
						• Par téléphone XXXXXXXXX (coût d'un appel local – du lundi au vendredi de 9h à 18h)
					</p>
					<p>
						• Via le formulaire de contact disponible dans l'application ou sur le site <a
							href="https://www.briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>www.briker.fr</a
						>
					</p>
				</div>
				<p class="mt-4 text-lg">
					Briker s'engage à répondre à toute demande dans un délai maximum de 5 jours ouvrés. En cas
					de réclamation portant sur une commande, une livraison, un service ou une location,
					l'Utilisateur devra fournir tout justificatif utile (photos, facture, messages échangés)
					afin de permettre une résolution rapide du différend.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					Médiateur de la consommation
				</h3>
				<p class="text-lg">
					En cas de litige non résolu à l'amiable, l'Utilisateur peut contacter le médiateur de la
					consommation dont les coordonnées sont disponibles sur le site de la DDPP.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">Tribunal compétent :</h3>
				<p class="text-lg">
					À défaut d'accord amiable, tout litige sera porté devant les tribunaux compétents du
					ressort du siège social de Briker.
				</p>
			</div>

			<!-- Section 12 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					12. DONNÉES PERSONNELLES ET CONFIDENTIALITÉ
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">12.1. Responsable du traitement</h3>
				<p class="text-lg">
					Briker, SAS BRIKER, immatriculée sous le numéro 989 082 698, dont le siège social est
					situé au 41 rue Jacquemars GIELEE, 59800 LILLE, est responsable du traitement des données
					à caractère personnel collectées via la plateforme Briker, conformément au Règlement (UE)
					2016/679 du 27 avril 2016 (RGPD) et à la loi française n° 78-17 du 6 janvier 1978
					modifiée.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">12.2. Données collectées</h3>
				<p class="text-lg">
					Dans le cadre de l'utilisation de la plateforme, Briker collecte notamment les données
					suivantes :
				</p>
				<ul class="mt-4 space-y-2 text-lg">
					<li>• données d'identification (nom, prénom, email, téléphone) ;</li>
					<li>• données de connexion et de navigation ;</li>
					<li>• informations de commande et de paiement ;</li>
					<li>
						• données nécessaires à la gestion du compte utilisateur (clients et fournisseurs).
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					12.3. Finalités du traitement
				</h3>
				<p class="text-lg">
					Les données personnelles sont collectées pour les finalités suivantes :
				</p>
				<ul class="mt-4 space-y-2 text-lg">
					<li>• la gestion des comptes utilisateurs ;</li>
					<li>• le traitement des commandes et des paiements ;</li>
					<li>• la mise en relation entre utilisateurs ;</li>
					<li>• la prévention de la fraude et la sécurité du service ;</li>
					<li>• le respect des obligations légales et réglementaires ;</li>
					<li>
						• l'envoi d'informations relatives au service ou de prospection commerciale (avec
						consentement le cas échéant).
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					12.4. Destinataires des données
				</h3>
				<p class="text-lg">
					Les données sont accessibles uniquement par les services habilités de Briker, les
					prestataires techniques (hébergement, maintenance, PSP) agissant en tant que
					sous-traitants au sens du RGPD, et les partenaires contractuels dans le cadre de
					l'exécution du service. Les données ne font pas l'objet d'un transfert en dehors de
					l'Union européenne, sauf avec les garanties appropriées prévues par le RGPD.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">12.5. Durée de conservation</h3>
				<p class="text-lg">
					Les données sont conservées pendant la durée strictement nécessaire à la gestion de la
					relation contractuelle, augmentée des délais légaux applicables.
				</p>
				<ul class="mt-4 space-y-2 text-lg">
					<li>• Données de commande : 5 ans à compter de la commande ;</li>
					<li>• Données de facturation : 10 ans au titre des obligations comptables ;</li>
					<li>• Données de prospection : 3 ans à compter du dernier contact actif.</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					12.6. Droits des personnes concernées
				</h3>
				<p class="text-lg">
					Conformément à la réglementation applicable, chaque utilisateur dispose d'un droit
					d'accès, de rectification, d'effacement, de limitation, d'opposition, de portabilité et du
					droit de retirer son consentement à tout moment. Ces droits peuvent être exercés par mail
					à l'adresse suivante : <a
						href="mailto:rgpd@briker.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>rgpd@briker.fr</a
					>, ou par courrier à l'adresse du siège social de Briker.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">12.7. Droit de réclamation</h3>
				<p class="text-lg">
					Les utilisateurs disposent également du droit d'introduire une réclamation auprès de la
					CNIL (<a
						href="https://www.cnil.fr"
						class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
						>www.cnil.fr</a
					>) s'ils estiment que leurs droits ne sont pas respectés.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">12.8. Politique de cookies</h3>
				<p class="text-lg">
					L'utilisation de cookies et traceurs est détaillée dans la politique de confidentialité
					disponible à l'adresse suivante : [URL de la politique de confidentialité ou des cookies].
					L'utilisateur peut modifier ses préférences à tout moment depuis l'interface dédiée
				</p>
			</div>

			<!-- Section 13 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">
					13. MODIFICATION, CESSION ET DIVISIBILITÉ
				</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">Modification des CGU</h3>
				<p class="text-lg">
					Toute modification majeure des présentes CGU fera l'objet d'une notification (préavis de
					30 jours) sur la Plateforme et par e-mail.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">Cession des droits</h3>
				<p class="text-lg">
					Briker se réserve le droit de céder tout ou partie de ses droits et obligations à des
					tiers sans que l'utilisateur puisse s'y opposer. Briker pourra librement céder ou
					transférer les CGU, en tout ou partie, à toute société du groupe Briker ou à un tiers,
					sans l'accord préalable de l'utilisateur.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">Divisibilité</h3>
				<p class="text-lg">
					Si une clause des présentes CGU est jugée invalide ou inapplicable, les autres
					dispositions demeureront pleinement en vigueur.
				</p>
			</div>

			<!-- Section 14 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">14. DROIT APPLICABLE ET JURIDICTION</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">Droit applicable</h3>
				<p class="text-lg">Les présentes CGU sont régies par le droit français.</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">Juridiction compétente</h3>
				<p class="text-lg">
					En cas de litige, les tribunaux du ressort du siège social de Briker seront seuls
					compétents.
				</p>
			</div>

			<!-- Section 15 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">15. CONTACT ET SUPPORT</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">Service client</h3>
				<p class="mb-4 text-lg">
					Le Service Client Briker est à la disposition des Utilisateurs pour toute question,
					demande d'assistance, réclamation ou litige relatif à l'utilisation de la Plateforme ou
					aux Services proposés.
				</p>

				<div class="rounded-lg bg-muted p-4">
					<p class="font-semibold">📍 Contact :</p>
					<p>
						• Par e-mail : <a
							href="mailto:serviceclient@briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>serviceclient@briker.fr</a
						>
					</p>
					<p>
						• Par téléphone XXXXXXXXX (coût d'un appel local – du lundi au vendredi de 9h à 18h)
					</p>
					<p>
						• Via le formulaire de contact disponible dans l'application ou sur le site <a
							href="https://www.briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>www.briker.fr</a
						>
					</p>
				</div>
				<p class="mt-4 text-lg">
					Briker s'engage à répondre à toute demande dans un délai maximum de 5 jours ouvrés. En cas
					de réclamation portant sur une commande, une livraison, un service ou une location,
					l'Utilisateur devra fournir tout justificatif utile (photos, facture, messages échangés)
					afin de permettre une résolution rapide du différend.
				</p>
			</div>
		</div>
	</div>
</div>
