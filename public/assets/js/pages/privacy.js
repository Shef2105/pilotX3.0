// Privacy Policy page

import { renderFooter } from '../components/footer.js';

// Privacy Policy page component
export default {
  template: `
    <section class="section bg-light">
      <div class="container">
        <h1 class="section-title">Privacy Policy</h1>
        <p class="section-subtitle">Questa Informativa sulla privacy descrive come PilotX raccoglie, utilizza, mantiene e divulga le informazioni raccolte dagli utenti.</p>
        
        <div class="bg-white rounded shadow p-4 mb-4">
          <h2>1. Informazioni che raccogliamo</h2>
          <p>Possiamo raccogliere informazioni di identificazione personale dagli utenti in una varietà di modi, tra cui, ma non limitato a, quando gli utenti visitano il nostro sito, registrarsi sul sito, effettuare un ordine, iscriversi alla newsletter, rispondere a un sondaggio, compilare un modulo, e in relazione ad altre attività, servizi, funzionalità o risorse che mettiamo a disposizione sul nostro Sito. Agli utenti potrebbe essere richiesto, a seconda dei casi, nome, indirizzo e-mail, indirizzo postale, numero di telefono, informazioni sulla carta di credito, dettagli della patente e altri documenti di verifica. </p>
          <p>Raccogliamo queste informazioni per i seguenti scopi:</p>
          <ul>
            <li>Per verificare la tua identità e idoneità a utilizzare i nostri servizi</li>
            <li>Per elaborare le prenotazioni e i pagamenti dei veicoli</li>
            <li>Per migliorare il servizio clienti e personalizzare l'esperienza utente</li>
            <li>To send periodic emails regarding your account or other products and services</li>
            <li>To administer promotions, surveys or other site features</li>
            <li>To track vehicle usage and ensure proper operation of our fleet</li>
          </ul>
          
          <h2>2. Condivisione e divulgazione delle informazioni</h2>
          <p>Non vendiamo, scambiamo o affittiamo a terzi le informazioni di identificazione personale degli utenti. Potremmo condividere informazioni demografiche aggregate generiche non collegate a qualsiasi informazione di identificazione personale relativa ai visitatori e agli utenti con i nostri partner commerciali, affiliati di fiducia e inserzionisti per gli scopi sopra indicati. </p>
          <p>Possiamo divulgare informazioni personali nelle seguenti circostanze:</p>
          <ul>
            <li>Rispettare gli obblighi legali</li>
            <li>Per applicare i nostri termini di servizio</li>
            <li>Proteggere e difendere i diritti o la proprietà di PilotX</li>
            <li>Per prevenire o indagare su possibili illeciti in relazione al Servizio</li>
            <li>Proteggere la sicurezza personale degli utenti del Servizio o del pubblico</li>
          </ul>
          
          <h2>3. Data Security</h2>
          <p>Adottiamo adeguate pratiche di raccolta, archiviazione ed elaborazione dei dati e misure di sicurezza per proteggere contro l'accesso non autorizzato, alterazione, divulgazione o distruzione delle informazioni personali dell'utente, nome utente, password, informazioni sulle transazioni e dati memorizzati sul nostro sito.</p>
          <p>Lo scambio di dati sensibili e privati tra il Sito e i suoi Utenti avviene attraverso un canale di comunicazione protetto da SSL ed è crittografato e protetto con firme digitali. Il nostro sito è anche in conformità con gli standard di vulnerabilità PCI al fine di creare un ambiente più sicuro possibile per gli utenti.</p>
          
          h2>4. Dati di localizzazione e tracciamento del veicolo</h2>
          <p>Il nostro servizio comprende veicoli dotati di GPS e sistemi telematici che raccolgono dati sulla posizione, sul comportamento di guida e sullo stato del veicolo. Queste informazioni sono utilizzate per:</p>
          <ul>
            <li>Gestire la nostra flotta e garantire il corretto funzionamento dei veicoli</li>
            <li>Fornire assistenza clienti e assistenza stradale quando necessario</li>
            <li>Verifica della conformità ai nostri termini di servizio</li>
            <li>Investigazione di incidenti o reclami per danni</li>
            <li>Migliorare il nostro servizio attraverso l'analisi aggregata dell'utilizzo</li>
          </ul>
          <p>Sarete informati di questo tracciamento quando prenotate un veicolo, e utilizzando il nostro servizio, acconsentite a questa raccolta di dati.</p>
          
          <h2>5. Conservazione dei dati</h2>
          <p>Conserveremo le tue informazioni personali solo per il tempo necessario ai fini indicati nella presente Informativa sulla privacy. Conserveremo e utilizzeremo le informazioni dell'utente nella misura necessaria per adempiere ai nostri obblighi legali, risolvere controversie e applicare le nostre politiche. </p>
          
          h2>6. Cookie e tecnologie di tracciamento</h2>
          <p>Il nostro sito può utilizzare "cookie" per migliorare l'esperienza dell'utente. Il browser web dell'utente installa i cookie sul suo disco rigido per scopi di registrazione e talvolta per tenere traccia delle informazioni su di essi. L'utente può scegliere di impostare il proprio browser web per rifiutare i cookie, o per avvisare quando i cookie vengono inviati. Se lo fanno, notare che alcune parti del sito potrebbero non funzionare correttamente. </p>
          
          <h2>7. Siti web di terze parti</h2>
          <p>Gli utenti possono trovare pubblicità o altri contenuti sul nostro sito che collegano ai siti e servizi dei nostri partner, fornitori, inserzionisti, sponsor, licenziatari e altre terze parti. Non controlliamo il contenuto o i link che appaiono su questi siti e non siamo responsabili per le pratiche impiegate dai siti web collegati a o dal nostro sito. Inoltre, questi siti o servizi, compresi i loro contenuti e link, possono essere in continua evoluzione. Questi siti e servizi possono avere le proprie politiche sulla privacy e sul servizio clienti. La navigazione e l'interazione su qualsiasi altro sito web, inclusi i siti web che hanno un link al nostro sito, sono soggetti ai termini e alle politiche di quel sito web. </p>
          
          <h2>8. I tuoi diritti</h2>
          <p>Avete i seguenti diritti in relazione ai vostri dati personali:</p>
          <ul>
            <li>Diritto di accesso - Hai il diritto di richiedere copie dei tuoi dati personali. </li>
            <li>Diritto di rettifica - L'utente ha il diritto di richiedere la correzione da parte nostra di qualsiasi informazione ritenuta inesatta o completa. </li>
            <li>Diritto alla cancellazione - Hai il diritto di richiedere la cancellazione dei tuoi dati personali, a determinate condizioni. </li>
            <li>Diritto di limitare il trattamento - L'utente ha il diritto di richiedere la limitazione del trattamento dei propri dati personali, a determinate condizioni. </li>
            <li>Diritto di opporsi al trattamento - Hai il diritto di opporti al nostro trattamento dei tuoi dati personali, a determinate condizioni. </li>
            <li>Diritto alla portabilità dei dati - L'utente ha il diritto di richiedere che trasferiamo i dati da noi raccolti a un'altra organizzazione, o direttamente all'utente, a determinate condizioni. </li>
          </ul>
          <p>Per esercitare uno di questi diritti, contattaci utilizzando le informazioni fornite di seguito.</p>
          
         <h2>9. Tutela della vita privata dei bambini</h2>
          <p>Il nostro Servizio non è rivolto a minori di 21 anni. Non raccogliamo consapevolmente informazioni personali identificabili da chiunque sotto l'età di 21. Se sei un genitore o un tutore e sai che il tuo bambino ci ha fornito dati personali, ti preghiamo di contattarci. Se veniamo a conoscenza che abbiamo raccolto dati personali da chiunque di età inferiore ai 21 anni senza la verifica del consenso dei genitori, prendiamo provvedimenti per rimuovere tali informazioni dai nostri server. </p>
          
          <h2>10. Modifiche alla presente informativa sulla privacy</h2>
          <p>PilotX ha la facoltà di aggiornare questa informativa sulla privacy in qualsiasi momento. Quando lo faremo, rivedremo la data aggiornata in fondo a questa pagina. Invitiamo gli utenti a controllare spesso questa pagina per eventuali modifiche per rimanere informati su come stiamo aiutando a proteggere le informazioni personali che raccogliamo. L'utente riconosce e accetta che è sua responsabilità rivedere periodicamente la presente informativa sulla privacy e prendere conoscenza di eventuali modifiche. </p>
          
          <h2>11. Contattaci</h2>
          <p>In caso di domande sulla presente Informativa sulla privacy, sulle pratiche di questo sito o sui vostri rapporti con questo sito, vi preghiamo di contattarci all'indirizzo:</p>
          <ul>
            <li>Email: privacy@pilotx.com</li>
            <li>Phone: +39 111 222 333</li>
            <li>Indirizzo: Via verdi 349, Roma</li>
          </ul>
          
          <p class="mt-4">Ultimo aggiornamento: gennaio 1, 2025</p>
        </div>
      </div>
    </section>
    
    ${renderFooter()}
  `
};