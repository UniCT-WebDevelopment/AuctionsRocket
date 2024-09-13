# Guida alla Configurazione dell'Applicazione Web AuctionsRocket

## Introduzione

![logo](https://github.com/user-attachments/assets/36e3bfe0-dfb8-4a08-8095-497fe1a8c462)

AuctionsRocket è un sito web che permette di inserire oggetti da mettere all'asta. Tutti gli utenti registrati potranno partecipare alle aste ed inserirne di nuove. Il sito offre la possiblità di unirsi ad una chat live per ogni asta per partecipare alla discussione di tutti gli interessati ad essa e seguirne ogni aggiornamento.

Ogni utente può segnalare altri utenti e ricevere/inviare recensioni.

I moderatori gestiranno e applicheranno le regole del sito, essi possono bandire, riammettere utenti e vedere le segnalazioni inviate.

## Sezioni

Il sito web è composto da diverse sezioni:

**Vetrina**: E' la pagina iniziale che mostra il benvenuto agli utenti non autenticati. Da qui è possibile registrarsi ed eseguire successivamente il login.

**Add Auction**: Pagina che permette l'inserimento di una nuova asta. Una volta compilato il form per l'asta ed invato, essa sarà messa in una lista di attesa (non sarà visibile a tutti) per poter essere esaminata da un moderatore. Il moderatore potrà infine decidere di approvarla (rendendola pubblica e attiva), oppure cancellarla.

**Your Auctions**: Pagina che mostra tutte le aste che ha inserito l'utente autenticato.
Solo le aste non ancora appovate da un moderatore o non scadute possono essere modificate e cancellate. La modifica di un'asta permette l'aggiornamento del nome, della categoria, della descrizione e delle immagini associate.

Un'asta può avere diversi stati: "Active" (l'asta è attiva e può ricevere nuove offerte), "Closed by a moderator" (l'asta è stata rifiutata da un moderatore durante la fase di review), "Cancelled" (l'asta è stata cancellata dal suo autore), "Sold" (l'asta è scaduta ed è stata vinta da un utente), "Expired" (l'asta è scaduta senza nessuna offerta), "Under Review" (l'asta è un attesa di un riscontro da parte di un moderatore e non è ancora pubblica).

**Global Auctions**: E' la pagina in cui è possibile vedere tutte le aste pubblicate dagli altri utenti. Da qui è possibile filtrare i risultati inserendo una stringa specifica e cambiando la categoria della ricerca.
I risultati visibili saranno le aste con lo stato "Active", mentre quelle "Sold" ed "Expired" saranno visibili solo fino alle 24 ore successive alla loro scadenza.

E' possibile cliccare le aste per poter vedere più informazioni come la descrizione, l'autore e l'ultimo offerente. Sarà possibile anche mettere tra i preferiti l'asta, offrire del denaro ed unirsi alla chat pubblica dell'asta.

Una volta fatta un'offerta valida (ovvero aver inserito un valore strettamente maggiore di quello attuale), essa verrà notificata a tutti gli utenti che avanno inserito l'asta nei preferiti. Il sistema imposterà l'asta come preferita in caso l'offerente non lo avesse già fatto.

**Favorite Auctions**: Da qui sarà possibile trovare velocemente le aste impostate prcedentemente come preferite. Al contrario della sezione "Global Auctions", le aste con lo stato "Sold" ed "Expired" saranno sempre visibili.

**Users**: Mostra la lista di tutti gli utenti registrati al sito AuctionsRocket. Cliccando un utente verrà mostrata un'ulteriore finestra in cui sarà possbile leggere (a sinistra) informazioni su Nome, Cognome, Paese, Data di registrazione, e biografia. Sempre in questa colonna sarà possibile recensire l'utente (o aggiornare la propria recensione), segnalarlo e bandirlo (solo per moderatori). A destra invece sarà possibile consultare le aste inserite, quelle attive e quelle vinte. Inoltre sono riportate anche le maggiori offerte piazzate e le recensioni ricevute dagli altri utenti.

**Account**: E' la pagina dedicata all'account dell'utente autenticato. Da qui sarà possibile modificare tutte le informazioni relative all'utente, comprese email e password.
Inoltre poichè il sito utilizza le sessioni, è possibile da questa pagina anche eseguire il logout.

**Notifications**: Sezione che elenca tutte le notifiche ricevute. Verranno notificati i seguenti eventi: asta vinta, asta persa, asta cancellata, asta terminata, nuova offerta, asta convalidata da un moderatore, asta rifiutata da un moderatore, nuovo feedback ricevuto, feedback esistente aggiornato, email aggiornata, password aggiornata.

**Moderation**: Sezione visibile solamente ad utenti con permessi di amministratore. Essa è composta da altre due sottosezioni: 
**Review auctions**: Sezione per la gestione delle nuove aste in lista di attesa (è possibile accettarle o cancellarle).
**Reports center**: Sezione per la gestione delle segnalazioni ricevute. Da qui è possibile solo cancellare le segnalazioni, è possibile bandire e riammettere un utente interagendo con il pannello utente.

## Requisiti

1. **Node.js**: E' necessario avere Node.js installato. Puoi scaricarlo da [nodejs.org](https://nodejs.org/).

2. **Database Management System**: Per questo progetto è necessario utilizzare un DBMS con MySQL e creare un database utilizzando lo stesso nome impostato nel file `database_config.txt` (più info sono date successivamente).

## Installazione

1. **Dipendenze**: Installa i pacchetti Node.js necessari utilizzando npm. Esegui il comando seguente nella directory principale del progetto:

    ```bash
    npm install <module>
    ```

## Dipendenze

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

## Configurazione

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

## Avvio dell'Applicazione

1. **Avvia il Server**: Usa il seguente comando per avviare il server:

    ```bash
    node .\server_main.js
    ```

2. **Accedi all'Applicazione**: Apri il tuo browser web e naviga su `http://localhost:PORT` per accedere all'applicazione. Se la porta non viene cambiata, è possibile accedere tramite `http://localhost:49599`.


