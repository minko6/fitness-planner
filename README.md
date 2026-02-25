## FitnessPlanner                                                                                                                                                                                                
Mobilna aplikacija za planiranje i praćenje treninga razvijena kao projekat iz predmeta Mobilno računarstvo.

## Opis

Fitness Planner omogućava korisnicima da kreiraju planove treninga, dodaju vežbe, loguju odrađene sesije i prate istoriju treninga.

## Slučajevi korišćenja

1. Registracija i prijava korisnika
2. Pregled dashboard-a - prikaz poslednjih treninga i statistika
3. Kreiranje plana treninga - naziv, opis, tip (snaga/kardio/fleksibilnost)
4. Dodavanje vežbi u plan - naziv vežbe, broj setova, ponavljanja, težina
5. Izmena i brisanje plana treninga
6. Pokretanje sesije treninga - logovanje odrađenog treninga sa datumom i trajanjem
7. Pregled istorije treninga - lista svih odrađenih sesija
8. Brisanje zapisa iz istorije

## Tehnologije

1. Frontend - Ionic + Angular 
2. Baza podataka - Firebase Realtime Database 
3. Komunikacija - Angular `HttpClient` (REST API) 
4. Autentifikacija - Firebase Authentication 
5. Navigacija - Tabs + Sidemenu 
6. Guards - AuthGuard za zaštićene rute