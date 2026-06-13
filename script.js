// Beispiel-Daten für Spieler
let players = [
    { id: 1, name: "Willi", rank: "Admin" },
    { id: 2, name: "Dennis", rank: "MVP" },
    { id: 3, name: "Marie", rank: "VIP" }
];

let isAdmin = false;

// Prüft, ob im Suchfeld "login" eingegeben wurde
function checkSearchTrigger() {
    const searchVal = document.getElementById('search-input').value.trim();
    if (searchVal.toLowerCase() === 'login') {
        document.getElementById('search-input').value = ''; // Feld leeren
        openLoginModal();
    } else {
        renderPlayers(searchVal);
    }
}

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('username').focus();
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Login Überprüfung
function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Deine gewünschten Daten
    if (user === 'L4lyx' && pass === 'Tini2013!') {
        isAdmin = true;
        closeLoginModal();
        updateUI();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function logout() {
    isAdmin = false;
    updateUI();
}

// Schaltet Admin-Funktionen frei oder sperrt sie
function updateUI() {
    const statusText = document.getElementById('auth-status');
    const adminControls = document.getElementById('admin-controls');
    const logoutBtn = document.getElementById('logout-btn');

    if (isAdmin) {
        statusText.innerText = "L4lyx (Admin)";
        statusText.className = "status-admin";
        adminControls.style.display = "block";
        logoutBtn.style.display = "inline-block";
    } else {
        statusText.innerText = "Guest";
        statusText.className = "status-guest";
        adminControls.style.display = "none";
        logoutBtn.style.display = "none";
    }
    renderPlayers(); // Liste neu laden, um Edit-Knöpfe zu zeigen/verstecken
}

// Spieler anzeigen (und filtern per Suche)
function renderPlayers(filter = "") {
    const list = document.getElementById('player-list');
    list.innerHTML = "";

    const filtered = players.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

    filtered.forEach(player => {
        const li = document.createElement('li');
        li.className = "player-item";
        
        let actionsHtml = "";
        // Edit und Delete Knöpfe nur zeigen, wenn man eingeloggt ist
        if (isAdmin) {
            actionsHtml = `
                <div>
                    <button onclick="editPlayer(${player.id})" class="btn btn-primary" style="padding: 5px 10px; margin-right: 5px;">Edit</button>
                    <button onclick="deletePlayer(${player.id})" class="btn btn-danger" style="padding: 5px 10px;">X</button>
                </div>
            `;
        }

        li.innerHTML = `
            <div>
                <strong>${player.name}</strong> - <span style="color: #45f3ff;">${player.rank}</span>
            </div>
            ${actionsHtml}
        `;
        list.appendChild(li);
    });
}

// Spieler hinzufügen (Nur Admin)
function addPlayer() {
    const nameInput = document.getElementById('player-name');
    const rankInput = document.getElementById('player-rank');

    if (nameInput.value.trim() === "") return;

    const newPlayer = {
        id: Date.now(), // Einfache ID generieren
        name: nameInput.value,
        rank: rankInput.value || "Player"
    };

    players.push(newPlayer);
    nameInput.value = "";
    rankInput.value = "";
    renderPlayers();
}

// Spieler löschen (Nur Admin)
function deletePlayer(id) {
    players = players.filter(p => p.id !== id);
    renderPlayers();
}

// Spieler editieren (Nur Admin)
function editPlayer(id) {
    const player = players.find(p => p.id === id);
    if (!player) return;

    const newName = prompt("Neuer Name für " + player.name + ":", player.name);
    const newRank = prompt("Neuer Rang für " + player.name + ":", player.rank);

    if (newName !== null && newName.trim() !== "") {
        player.name = newName;
    }
    if (newRank !== null && newRank.trim() !== "") {
        player.rank = newRank;
    }
    
    renderPlayers();
}

// Start-Aufruf beim Laden der Seite
renderPlayers();
