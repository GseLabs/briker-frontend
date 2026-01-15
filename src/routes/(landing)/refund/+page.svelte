<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
	<title>{m["legal.refund_policy.title"]()} - Briker</title>
	<meta name="description" content={m["legal.refund_policy.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-16">
	<div class="container mx-auto max-w-4xl px-4">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-6 text-4xl font-bold text-foreground lg:text-5xl">
				{m["legal.refund_policy.title"]()}
			</h1>
			<p class="text-lg text-muted-foreground">{m["legal.refund_policy.last_updated"]()}</p>
		</div>

		<!-- Introduction -->
		<div class="mb-8">
			<p class="text-lg leading-relaxed text-foreground">
				Briker est une plateforme intermédiaire qui encaisse les paiements pour le compte de
				fournisseurs partenaires et les leur reverse après déduction de ses frais de service. Les
				ventes sont conclues directement entre l'acheteur (particulier ou professionnel) et le
				fournisseur.
			</p>
		</div>

		<!-- Content -->
		<div class="space-y-8 leading-relaxed text-foreground">
			<!-- Section 1 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">1. DÉFINITIONS</h2>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Particulier (B2C)</span> : consommateur au sens du Code de
						la consommation.
					</li>
					<li>
						• <span class="font-semibold">Professionnel (B2B)</span> : acheteur agissant dans le cadre
						de son activité commerciale, artisanale, libérale ou agricole.
					</li>
					<li>
						• <span class="font-semibold">Rétractation</span> : droit légal permettant au consommateur
						de renoncer à un achat à distance sans justification.
					</li>
					<li>
						• <span class="font-semibold">CGV</span> : Conditions Générales de Vente du fournisseur.
					</li>
				</ul>
			</div>

			<!-- Section 2 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">2. DROIT DE RÉTRACTATION (B2C)</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">2.1. Durée</h3>
				<p class="mb-4 text-lg">Le consommateur dispose de 14 jours calendaires à compter :</p>
				<ul class="ml-6 space-y-2 text-lg">
					<li>• de la réception du dernier produit (vente de biens),</li>
					<li>
						• de la conclusion du contrat (prestations de services ou biens numériques non fournis
						sur support).
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">2.2. Modalités d'exercice</h3>
				<ol class="ml-6 space-y-2 text-lg">
					<li>
						<span class="font-semibold">Notification</span> : adressez votre décision de rétractation
						au fournisseur par :
					</li>
					<ul class="mt-2 ml-6 space-y-1 text-lg">
						<li>○ Formulaire mis à disposition,</li>
						<li>
							○ E-mail ou courrier recommandé (coordonnées indiquées dans la confirmation de
							commande ou CGV).
						</li>
					</ul>
					<li>
						<span class="font-semibold">Délai</span> : la notification doit être envoyée avant l'expiration
						des 14 jours.
					</li>
					<li>
						<span class="font-semibold">Retour</span> : le consommateur a 14 jours supplémentaires pour
						renvoyer le(s) produit(s), à ses frais sauf accord contraire du fournisseur.
					</li>
					<li>
						<span class="font-semibold">État du produit</span> : emballage d'origine, accessoires, notice…
						pour permettre la remise en vente.
					</li>
				</ol>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">2.3. Remboursement</h3>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Délai</span> : au plus tard 14 jours après réception de la
						notification de rétractation.
					</li>
					<li>• <span class="font-semibold">Montant</span> :</li>
					<ul class="ml-6 space-y-1 text-lg">
						<li>○ Prix du(des) produit(s).</li>
						<li>○ Frais de livraison standard (option la moins chère proposée).</li>
						<li>
							○ Ne sont pas remboursés : surcoûts liés à une livraison express ou option payante
							choisie.
						</li>
					</ul>
					<li>
						• <span class="font-semibold">Moyen</span> : même mode de paiement que l'achat, sauf accord
						expresse.
					</li>
					<li>
						• <span class="font-semibold">Condition</span> : le fournisseur peut différer le remboursement
						jusqu'à récupération du produit ou réception d'une preuve d'expédition.
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">2.4. Dispositions légales</h3>
				<p class="mb-4 text-lg">
					Conformément à l'article L221-18 du Code de la consommation, le Client consommateur
					dispose d'un délai de 14 jours pour exercer son droit de rétractation sans motif.
				</p>
				<p class="mb-4 text-lg">
					Le délai court à compter de la réception du bien ou de la conclusion du contrat de
					service.
				</p>
				<p class="mb-4 text-lg">
					Le Client informe le Fournisseur de sa décision par tout moyen clair et non équivoque
					(formulaire type disponible en annexe).
				</p>
				<p class="mb-4 text-lg">
					Les frais de retour sont à la charge du Client sauf indication contraire du Fournisseur.
					Le remboursement est dû sous 14 jours.
				</p>
				<p class="mb-4 text-lg">
					Le droit de rétractation ne s'applique pas aux ventes conclues entre professionnels ou à
					certains produits/services (cf. art. L221-28 C. conso).
				</p>
				<p class="text-lg">
					Briker peut assister dans la procédure, sans être tenu du remboursement.
				</p>

				<p class="mt-6 mb-4 text-lg">Le droit de rétractation ne s'applique pas aux :</p>
				<ul class="ml-6 space-y-2 text-lg">
					<li>• Produits personnalisés ou sur-mesure,</li>
					<li>• Biens périssables ou à date de péremption courte,</li>
					<li>
						• Produits dont les scellés sanitaires, hygiéniques ou de sécurité ont été descellés,
					</li>
					<li>• Enregistrements audio/vidéo ou logiciels dont l'emballage a été ouvert,</li>
					<li>• Journaux, périodiques, magazines,</li>
					<li>
						• Prestations pleinement exécutées avant la fin du délai de rétractation avec accord
						exprès du consommateur,
					</li>
					<li>
						• Contenu numérique non fourni sur support physique (téléchargement, streaming) si le
						consommateur a renoncé expressément à son droit.
					</li>
				</ul>

				<p class="mt-4 text-lg">
					<span class="italic">Bon à savoir</span> : certains fournisseurs peuvent proposer des conditions
					de retour plus favorables que la loi. Vérifiez leurs politiques spécifiques.
				</p>
			</div>

			<!-- Section 3 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">3. POLITIQUE DE RETOUR (B2B)</h2>

				<h3 class="mb-3 text-xl font-semibold text-foreground">
					3.1. Absence de rétractation légale
				</h3>
				<p class="text-lg">
					Les achats effectués par des professionnels ne bénéficient pas du droit de rétractation de
					14 jours. Toute clause de retour dépend des CGV du fournisseur.
				</p>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">
					3.2. Conditions contractuelles
				</h3>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Vérification</span> : consultez impérativement les CGV avant
						validation de votre commande.
					</li>
					<li>
						• <span class="font-semibold">Modalités</span> : délai de retour, frais de restockage, état
						des produits, frais de transport, etc.
					</li>
					<li>
						• <span class="font-semibold">Accords commerciaux</span> : certains fournisseurs accordent
						un délai de retour ou d'échange à titre commercial.
					</li>
				</ul>

				<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">3.3. Procédure</h3>
				<ol class="ml-6 space-y-2 text-lg">
					<li>
						<span class="font-semibold">Contact</span> : adressez votre demande de retour directement
						au fournisseur (coordonnées en facture ou CGV).
					</li>
					<li>
						<span class="font-semibold">Validation</span> : attendez l'accord écrit du fournisseur et
						les instructions logistiques.
					</li>
					<li>
						<span class="font-semibold">Retour</span> : suivez les modalités convenues (transporteur,
						emballage, étiquettes).
					</li>
					<li>
						<span class="font-semibold">Remboursement / Avoir</span> : selon les termes négociés avec
						le fournisseur.
					</li>
				</ol>

				<p class="mt-4 text-lg">
					<span class="italic">Note startup</span> : Briker peut jouer un rôle de médiateur pour faciliter
					la communication, sans toutefois intervenir dans la décision finale du fournisseur.
				</p>
			</div>

			<!-- Section 4 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">4. RÔLE DE BRIKER</h2>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Encaissement</span> : gestion sécurisée des paiements pour
						le compte des fournisseurs.
					</li>
					<li>
						• <span class="font-semibold">Rétrocession</span> : transmission des fonds au fournisseur
						après vérification.
					</li>
					<li>
						• <span class="font-semibold">Support & Médiation</span> : assistance client pour orienter
						vers le bon interlocuteur, relances fournisseurs en cas de litige.
					</li>
				</ul>
			</div>

			<!-- Section 5 -->
			<div>
				<h2 class="mb-4 text-2xl font-bold text-foreground">5. CONTACTS & RESSOURCES</h2>
				<ul class="space-y-2 text-lg">
					<li>
						• <span class="font-semibold">Service Client Briker</span> :
						<a
							href="mailto:serviceclient@briker.fr"
							class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
							>serviceclient@briker.fr</a
						> · XXXXXXXXXXXX
					</li>
					<li>
						• <span class="font-semibold">Formulaire de rétractation (type)</span> : disponible sur chaque
						fiche produit ou auprès du fournisseur.
					</li>
					<li>
						• <span class="font-semibold">CGV fournisseurs</span> : accessibles sur la page du produit
						ou fournies dans la confirmation de commande.
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
