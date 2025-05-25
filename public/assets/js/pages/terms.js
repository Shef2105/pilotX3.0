// Terms and Conditions page

import { renderFooter } from '../components/footer.js';

// Terms and Conditions page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <h1 class="section-title">Termini e Condizioni</h1>
        <p class="section-subtitle">Si prega di leggere attentamente questi termini e condizioni prima di utilizzare il nostro servizio. </p>
        
        <div class="bg-white rounded shadow p-4 mb-4">
          <h2>1. introduzione</h2>
          <p>Benvenuti a PilotX Car Sharing ("Azienda", "noi", "nostro", "noi")! Questi termini di servizio ("Termini", "Termini di servizio") regolano l'uso del nostro sito web e dell'applicazione mobile (insieme o individualmente, il "Servizio") gestito da PilotX Car Sharing.</p>
          <p>Accedendo o utilizzando il Servizio, l'utente accetta di essere vincolato da questi Termini. Se non sei d'accordo con qualsiasi parte dei termini, allora non puoi accedere al servizio.</p>
          
          <h2>2. Account e adesione</h2>
          <p>Quando crei un account con noi, devi fornire informazioni accurate, complete e aggiornate in ogni momento. Il mancato rispetto di tale obbligo costituisce una violazione dei Termini, che può comportare la chiusura immediata del tuo account sul nostro Servizio.</p>
          <p>L'utente è responsabile della protezione della password che utilizza per accedere al Servizio e di qualsiasi attività o azione effettuata con la propria password. Accetti di non divulgare la tua password a terzi. L'utente deve informarci immediatamente dopo essere venuto a conoscenza di qualsiasi violazione della sicurezza o uso non autorizzato del proprio account. </p>
          
         <h2>3. Requisiti di ammissibilità</h2>
          <p>Per poter usufruire del nostro servizio di car sharing, devi:</p>
          <ul>
            <li>Avere almeno 21 anni di età</li>
            <li>Avere una patente di guida valida per almeno 2 anni</li>
            <li>Avere un record di guida pulita senza gravi violazioni negli ultimi 3 anni</li>
            <li>Avere una carta di credito o di debito valida per il pagamento</li>
            <li>Soddisfa i nostri requisiti di idoneità assicurativa</li>
          </ul>
          <p>Ci riserviamo il diritto di rifiutare il servizio a chiunque non soddisfi questi requisiti. </p>
          
          <h2>4. Prenotazione e cancellazione</h2>
          <p>Le prenotazioni possono essere effettuate tramite il nostro sito web o l'applicazione mobile, in base alla disponibilità del veicolo. Le prenotazioni confermate vengono addebitate al momento della prenotazione. </p>
          <p>Politica di cancellazione:</p>
          <ul>
            <li>Cancellazioni effettuate più di 24 ore prima dell'inizio della prenotazione: rimborso completo</li>
            <li>Cancellazioni effettuate meno di 24 ore prima dell'inizio della prenotazione: rimborso del 50%</li>
            <li>No-show o cancellazioni dopo l'orario di inizio della prenotazione: nessun rimborso</li>
          </ul>
          <p>Ci riserviamo il diritto di annullare le prenotazioni a causa di circostanze impreviste come problemi di manutenzione del veicolo o emergenze. In questi casi, verrà fornito un rimborso completo. </p>
          
          h2>5. Uso del veicolo</h2>
          <p>Quando utilizzi i nostri veicoli, accetti di:</p>
          <ul>
            <li>Utilizzare il veicolo solo per scopi legali e in conformità con tutte le leggi sul traffico</li>
            <li>Non fumare, svapare o permettere l'ingresso di animali domestici nel veicolo</li>
            <li>Restituire il veicolo nelle stesse condizioni in cui è stato preso</li>
            <li>Segnala immediatamente eventuali danni o problemi con il veicolo</li>
            <li>Non permettere a nessun altro che il conducente registrato di utilizzare il veicolo</li>
            <li>Non utilizzare il veicolo per scopi commerciali, come la condivisione o le consegne</li>
            <li>Non guidare il veicolo al di fuori dell'area di servizio designata senza previa approvazione</li>
          </ul>
          <p>La violazione di questi termini può comportare costi aggiuntivi e/o la sospensione del tuo account. </p>
          
          <h2>6. Diritti e spese</h2>
          <p>La nostra struttura tariffaria comprende:</p>
          <ul>
            <li>Tariffe di prenotazione basate sulle tariffe orarie, giornaliere o settimanali visualizzate sulla nostra piattaforma</li>
            <li>Supplementi di chilometraggio aggiuntivi per il superamento del limite di chilometraggio incluso (prenotazioni giornaliere e settimanali)</li>
            <li>Spese di ritorno tardivo ($10 all'ora)</li>
            <li>Spese di pulizia per i veicoli restituiti in condizioni inaccettabili (minimo $50)</li>
            <li>Spese per danni non segnalati prima dell'uso</li>
            <li>Spese amministrative per il trattamento di traffico o parcheggio violazioni ($25 più l'ammenda effettiva)</li>
          </ul>
          <p>Tutte le tariffe sono chiaramente comunicate al momento della prenotazione o in questi termini. </p>
          
          <h2>7. Assicurazione e responsabilità civile</h2>
          <p>I nostri veicoli sono dotati di copertura assicurativa standard inclusa nel prezzo della prenotazione. Questa copertura include:</p>
          <ul>
            <li>Indennizzo danni da collisione con una franchigia di $500</li>
            <li>Copertura di responsabilità civile fino a 1.000.000$</li>
            <li>Assicurazione infortuni personali</li>
          </ul>
          <p>L'utente è responsabile dell'importo della franchigia in caso di incidente per il quale è responsabile. Durante il processo di prenotazione potrebbero essere disponibili ulteriori opzioni assicurative per ridurre o eliminare la franchigia. </p>
          <p>L'utente è pienamente responsabile per i danni derivanti dall'uso proibito del veicolo, inclusa la guida sotto l'influenza di droghe, il permesso di guidare il veicolo da parte di conducenti non autorizzati o l'utilizzo del veicolo per attività illegali. </p>
          
          <h2>9. Modifiche al servizio</h2>
          <p>Ci riserviamo il diritto di modificare o interrompere, temporaneamente o permanentemente, il Servizio (o qualsiasi parte di esso) con o senza preavviso. Non saremo responsabili nei confronti dell'utente o di terzi per qualsiasi modifica, sospensione o interruzione del Servizio.</p>
          
          <h2>10. Legge di riferimento</h2>
          <p>I presenti Termini sono disciplinati e interpretati in conformità con le leggi degli Stati Uniti, senza riguardo alle sue disposizioni di conflitto di legge. </p>
          <p>La nostra mancata applicazione di qualsiasi diritto o disposizione dei presenti Termini non sarà considerata una rinuncia a tali diritti. Se una qualsiasi disposizione di questi Termini è ritenuta non valida o inapplicabile da un tribunale, le restanti disposizioni di questi Termini rimarranno in vigore. </p>
          
          <h2>11. Modifiche ai termini</h2>
          <p>Ci riserviamo il diritto, a nostra esclusiva discrezione, di modificare o sostituire i presenti Termini in qualsiasi momento. Se una revisione è rilevante, cercheremo di fornire almeno 30 giorni di preavviso prima di eventuali nuovi termini che entrano in vigore. Ciò che costituisce un cambiamento sostanziale sarà determinato a nostra esclusiva discrezione. </p>
          <p>Continuando ad accedere o utilizzare il nostro Servizio dopo che tali revisioni diventano effettive, l'utente accetta di essere vincolato dai termini rivisti. Se non accetti i nuovi termini, ti preghiamo di interrompere l'utilizzo del Servizio.</p>
          
          <h2>12. Contattaci</h2>
          <p>Se avete domande su questi termini, vi preghiamo di contattarci all'indirizzo:</p>
          <ul>
            <li>Email: legal@pilotx.com</li>
            <li>Phone: +39 111 222 3333</li>
            <li>Indirizzo: 123 Car St, New York, NY 10001</li>
          </ul>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `
};