# Guida alla Configurazione dell'Applicazione Web AuctionsRocket

## Introduzione 📑

![banner](https://github.com/user-attachments/assets/262ac341-7fc1-4b38-8278-dc2de61506b7)

AuctionsRocket è un sito web che permette di inserire oggetti da mettere all'asta. Tutti gli utenti registrati potranno partecipare alle aste ed inserirne di nuove. Il sito offre la possiblità di unirsi ad una chat live per ogni asta per partecipare alla discussione di tutti gli interessati ad essa e seguirne ogni aggiornamento.

Ogni utente può segnalare altri utenti e ricevere/inviare recensioni.

I moderatori gestiranno e applicheranno le regole del sito, essi possono bandire, riammettere utenti e vedere le segnalazioni inviate.

## Sezioni 🔗

Il sito web è composto dalle seguenti sezioni principali:

### Vetrina
La pagina iniziale che accoglie gli utenti non autenticati. Da qui è possibile registrarsi o eseguire il login.

### Add Auction
Pagina per l'inserimento di una nuova asta. Dopo aver completato il form, l'asta verrà inserita in una lista di attesa per la revisione da parte di un moderatore. Il moderatore potrà:
- Approvare l'asta, rendendola pubblica e attiva.
- Cancellarla.

### Your Auctions
Sezione che mostra tutte le aste inserite dall'utente autenticato. Solo le aste non approvate o non scadute possono essere:
- Modificate (nome, categoria, descrizione, immagini).
- Cancellate.

Le aste possono avere i seguenti stati:
- **Active**: L'asta è attiva e può ricevere offerte.
- **Closed by a moderator**: L'asta è stata rifiutata da un moderatore.
- **Cancelled**: L'asta è stata cancellata dall'autore.
- **Sold**: L'asta è scaduta ed è stata vinta.
- **Expired**: L'asta è scaduta senza ricevere offerte.
- **Under Review**: L'asta è in attesa di approvazione da parte di un moderatore.

### Global Auctions
Pagina che elenca tutte le aste pubblicate dagli utenti. È possibile filtrare le aste per categoria o tramite una stringa di ricerca. Le aste con stato:
- **Active** sono visibili a tutti.
- **Sold** e **Expired** rimangono visibili per 24 ore dopo la scadenza.

Cliccando su un'asta, si possono visualizzare ulteriori dettagli (descrizione, autore, ultimo offerente) e compiere azioni come:
- Aggiungere l'asta ai preferiti.
- Fare un'offerta (maggiore di quella attuale).
- Partecipare alla chat pubblica dell'asta.

Le offerte valide vengono notificate agli utenti che hanno aggiunto l'asta ai preferiti. Se l'offerente non l'aveva ancora fatto, l'asta verrà automaticamente aggiunta ai suoi preferiti.

### Favorite Auctions
Sezione che raccoglie tutte le aste impostate come preferite dall'utente. A differenza di "Global Auctions", le aste con stato **Sold** ed **Expired** sono sempre visibili.

### Users
Pagina che mostra la lista di tutti gli utenti registrati. Cliccando su un utente, si aprirà una scheda con:
- **A sinistra**: Informazioni personali (Nome, Cognome, Paese, Data di registrazione, Biografia) e la possibilità di:
  - Recensire o aggiornare una recensione.
  - Segnalare o bandire un utente (solo per moderatori).
- **A destra**: Le aste inserite, attive e vinte dall'utente, oltre alle maggiori offerte fatte e le recensioni ricevute.

### Account
Pagina dedicata alla gestione dell'account dell'utente autenticato, dove è possibile:
- Modificare le informazioni personali, email e password.
- Eseguire il logout.

### Notifications
Sezione che elenca tutte le notifiche ricevute. Gli eventi notificati includono:
- Asta vinta, persa, cancellata, o terminata.
- Nuova offerta su un'asta.
- Asta convalidata o rifiutata da un moderatore.
- Nuovo feedback ricevuto o aggiornato.
- Email o password aggiornate.

### Moderation
Visibile solo agli amministratori, è suddivisa in due sottosezioni:
- **Review Auctions**: Gestione delle nuove aste in lista d'attesa (approvazione o cancellazione).
- **Reports Center**: Gestione delle segnalazioni ricevute. Da qui è possibile cancellare le segnalazioni e, tramite il pannello utente, bandire o riammettere un utente.

## Requisiti 💼

1. **Node.js**: E' necessario avere Node.js installato. Puoi scaricarlo da [nodejs.org](https://nodejs.org/).

2. **Database Management System**: Per questo progetto è necessario utilizzare un DBMS con MySQL e creare un database utilizzando lo stesso nome impostato nel file `database_config.txt` (più info sono date successivamente).

## Installazione ⚙️

1. **Dipendenze**: Installa i pacchetti Node.js necessari utilizzando npm. Esegui il comando seguente nella directory principale del progetto:

    ```bash
    npm install <module>
    ```

## Dipendenze 💼

I seguenti moduli Node.js sono necessari per questo progetto:

- `express`
- `http`
- `socket.io`
- `body-parser`
- `express-session`
- `multer`
- `mime-types`
- `fs`
- `path`
- `node-cron`
- `bcryptjs`
- `fs`
- `mysql`

## Configurazione 🔧

1. **Configurazione del Database**: Modifica il file `database_config.txt` per impostare la connessione al tuo database.

    - Apri il file `database_config.txt` situato nella directory principale.
    - Imposta i valori appropriati per la connessione al database. La configurazione è definita dall'host del database, l'utente, la password e il nome del database.

    **Esempio di configurazione:**

    ```
    DB_HOST=localhost
    DB_USER=nomeutente
    DB_PASSWORD=tuapassword
    DB_NAME=nomedatabase
    ```

2. **Configurazione della porta (opzionale)**: Modifica il file `server_config.txt` per cambiare il parametro relativo al numero di porta usato dall'applicazione web.

    - Apri il file `server_config.txt` situato nella directory principale.
    - Cambia, se necessario, il numero di porta. Se questo file non sarà valido, verrà usata la porta default 49599.

    **Esempio di configurazione:**

    ```
    PORT=49599
    ```

## Avvio dell'Applicazione 🔌

1. **Avvia il Server**: Usa il seguente comando per avviare il server:

    ```bash
    node .\server_main.js
    ```

2. **Accedi all'Applicazione**: Apri il tuo browser web e naviga su `http://localhost:PORT` per accedere all'applicazione. Se la porta non viene cambiata, è possibile accedere tramite `http://localhost:49599`.


