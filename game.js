// game.js

// ---------- DỮ LIỆU THẺ BÀI (Món ăn chính) ----------
// Đây là danh sách các nhân vật. Bạn có thể thêm nhiều hơn!
const CARD_DATA = [
    { id: 1, name: "Naruto", anime: "Naruto", hp: 120, attack: 20 },
    { id: 2, name: "Sasuke", anime: "Naruto", hp: 100, attack: 25 },
    { id: 3, name: "Luffy", anime: "One Piece", hp: 150, attack: 18 },
    { id: 4, name: "Zoro", anime: "One Piece", hp: 130, attack: 22 },
    { id: 5, name: "Gojo", anime: "Jujutsu Kaisen", hp: 110, attack: 30 },
    { id: 6, name: "Tanjiro", anime: "Demon Slayer", hp: 105, attack: 24 },
];

// ---------- LỚP THẺ BÀI ----------
class Card {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.anime = data.anime;
        this.hp = data.hp;
        this.maxHp = data.hp;
        this.attack = data.attack;
        this.isAlive = true;
    }
}

// ---------- LỚP NGƯỜI CHƠI ----------
class Player {
    constructor(name) {
        this.name = name;
        this.health = 500;
        this.maxHealth = 500;
        this.board = []; // Các thẻ đã ra sân (tối đa 3)
        this.hand = []; // Các thẻ trên tay
    }
}

// ---------- ENGINE GAME (Bộ não) ----------
class GameEngine {
    constructor() {
        this.player = new Player("Bạn");
        this.enemies = [];
        this.wave = 1;
        this.turn = 0;
        this.gameOver = false;
        this.isPlayerTurn = true;
        
        // Bắt đầu game
        this.startGame();
    }

    // Khởi tạo game
    startGame() {
        // Chia cho người chơi 3 thẻ ngẫu nhiên
        this.player.hand = this.getRandomCards(3);
        // Đưa 1 thẻ ra sân
        this.playCard(0);
        
        // Tạo quái vật cho sóng đầu tiên
        this.generateEnemies(1);
        
        this.render();
    }

    // Lấy ngẫu nhiên N thẻ
    getRandomCards(n) {
        const shuffled = [...CARD_DATA].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n).map(data => new Card(data));
    }

    // Đưa thẻ từ tay ra sân
    playCard(index) {
        if (index < 0 || index >= this.player.hand.length) return;
        if (this.player.board.length >= 3) {
            alert("Sân đã có 3 thẻ rồi!");
            return;
        }
        
        const card = this.player.hand.splice(index, 1)[0];
        this.player.board.push(card);
        this.render();
    }

    // Tạo quái vật cho sóng
    generateEnemies(wave) {
        const count = Math.min(2 + Math.floor(wave / 2), 5);
        this.enemies = [];
        for (let i = 0; i < count; i++) {
            const enemyData = {
                id: 1000 + i,
                name: `Quái vật W${wave}`,
                anime: "Hệ thống",
                hp: 30 + wave * 10,
                attack: 5 + wave * 2
            };
            this.enemies.push(new Card(enemyData));
        }
        this.render();
    }

    // Người chơi tấn công
    playerAttack(cardIndex) {
        if (this.gameOver || !this.isPlayerTurn) return;
        if (this.enemies.length === 0) {
            this.nextWave();
            return;
        }

        const attacker = this.player.board[cardIndex];
        if (!attacker || !attacker.isAlive) return;

        // Tấn công kẻ địch đầu tiên
        const target = this.enemies[0];
        const damage = attacker.attack;
        target.hp -= damage;
        
        // Kiểm tra kẻ địch chết
        if (target.hp <= 0) {
            target.isAlive = false;
            this.enemies = this.enemies.filter(e => e.isAlive);
        }

        this.turn++;
        this.isPlayerTurn = false;
        this.render();

        // Lượt của kẻ địch (sau 0.5 giây)
        setTimeout(() => {
            this.enemyTurn();
        }, 500);
    }

    // Lượt của kẻ địch
    enemyTurn() {
        if (this.gameOver) return;

        // Mỗi kẻ địch tấn công ngẫu nhiên một thẻ của người chơi
        for (let enemy of this.enemies) {
            if (!enemy.isAlive) continue;
            
            const targets = this.player.board.filter(c => c.isAlive);
            if (targets.length === 0) {
                // Không còn thẻ, tấn công thẳng người chơi
                this.player.health -= enemy.attack;
            } else {
                const target = targets[Math.floor(Math.random() * targets.length)];
                target.hp -= enemy.attack;
                if (target.hp <= 0) {
                    target.isAlive = false;
                    this.player.board = this.player.board.filter(c => c.isAlive);
                }
            }
        }

        // Kiểm tra game over
        if (this.player.health <= 0 || this.player.board.length === 0) {
            this.gameOver = true;
            alert("Game Over! Bạn đã thua ở sóng " + this.wave);
        }

        this.isPlayerTurn = true;
        this.render();
    }

    // Chuyển sang sóng mới
    nextWave() {
        this.wave++;
        this.generateEnemies(this.wave);
        // Hồi phục 100 máu
        this.player.health = Math.min(this.player.maxHealth, this.player.health + 100);
        alert(`🎉 Chúc mừng! Bạn đã qua sóng ${this.wave - 1}!`);
        this.render();
    }

    // ---------- HIỂN THỊ RA MÀN HÌNH ----------
    render() {
        const area = document.getElementById('game-area');
        if (!area) return;

        let html = '';

        // Thông tin người chơi
        html += `
            <div style="margin-bottom: 20px;">
                <h3>👤 ${this.player.name}</h3>
                <div class="health-bar" style="width: 200px; margin: 0 auto;">
                    <div class="health-fill" style="width: ${(this.player.health / this.player.maxHealth) * 100}%; background-color: #ff6b6b;"></div>
                </div>
                <span>Máu: ${this.player.health} / ${this.player.maxHealth}</span>
                <span style="margin-left: 20px;">⭐ Sóng: ${this.wave}</span>
                <span style="margin-left: 20px;">🔄 Lượt: ${this.turn}</span>
            </div>
        `;

        // Khu vực sân - Thẻ của người chơi
        html += `<div style="margin-bottom: 15px;"><strong>Đội của bạn:</strong></div>`;
        html += `<div id="player-board" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 20px;">`;
        if (this.player.board.length === 0) {
            html += `<p style="color: #ff6b6b;">⚠️ Không còn thẻ nào!</p>`;
        } else {
            this.player.board.forEach((card, index) => {
                if (!card.isAlive) return;
                html += `
                    <div class="card" onclick="window.game.playerAttack(${index})">
                        <div class="card-name">${card.name}</div>
                        <div style="font-size: 0.8em; color: #aaa;">${card.anime}</div>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${(card.hp / card.maxHp) * 100}%;"></div>
                        </div>
                        <div class="card-hp">❤️ ${card.hp} / ${card.maxHp}</div>
                        <div class="card-atk">⚔️ ATK: ${card.attack}</div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // Tay bài
        html += `<div style="margin-bottom: 15px;"><strong>🃏 Tay bài của bạn:</strong></div>`;
        html += `<div id="player-hand" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 20px;">`;
        if (this.player.hand.length === 0) {
            html += `<p style="color: #aaa;">Hết bài! Bấm nút "Rút bài" bên dưới.</p>`;
        } else {
            this.player.hand.forEach((card, index) => {
                html += `
                    <div class="card" onclick="window.game.playCard(${index})">
                        <div class="card-name">${card.name}</div>
                        <div style="font-size: 0.8em; color: #aaa;">${card.anime}</div>
                        <div class="card-hp">❤️ ${card.hp}</div>
                        <div class="card-atk">⚔️ ATK: ${card.attack}</div>
                        <div style="font-size: 0.7em; color: #4ecdc4;">👆 Nhấn để ra sân</div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // Kẻ địch
        html += `<div style="margin-bottom: 10px;"><strong>👾 Quái vật (${this.enemies.length}):</strong></div>`;
        html += `<div id="enemy-area" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 20px;">`;
        if (this.enemies.length === 0) {
            html += `<p style="color: #4ecdc4;">✨ Sạch sẽ! Chờ chuyển sóng...</p>`;
        } else {
            this.enemies.forEach((enemy) => {
                if (!enemy.isAlive) return;
                html += `
                    <div class="card" style="border-color: #ff6b6b;">
                        <div class="card-name">${enemy.name}</div>
                        <div style="font-size: 0.8em; color: #ff6b6b;">${enemy.anime}</div>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${(enemy.hp / enemy.maxHp) * 100}%; background-color: #ff6b6b;"></div>
                        </div>
                        <div class="card-hp">❤️ ${enemy.hp} / ${enemy.maxHp}</div>
                        <div class="card-atk">⚔️ ATK: ${enemy.attack}</div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // Các nút chức năng
        html += `
            <div style="margin-top: 20px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
                <button onclick="window.game.drawCard()">🃏 Rút bài</button>
                <button onclick="window.game.nextWave()">🚀 Bỏ qua sóng (test)</button>
                <button onclick="window.game.startGame()">🔄 Chơi lại</button>
            </div>
        `;

        // Hiển thị thông báo nếu game over
        if (this.gameOver) {
            html += `<p style="color: #ff6b6b; font-size: 1.5em;">💀 GAME OVER</p>`;
        }

        area.innerHTML = html;
    }

    // Rút thêm bài (mỗi lượt rút 1)
    drawCard() {
        if (this.player.hand.length >= 6) {
            alert("Tay bài đã đầy (tối đa 6)!");
            return;
        }
        const newCard = new Card(CARD_DATA[Math.floor(Math.random() * CARD_DATA.length)]);
        this.player.hand.push(newCard);
        this.render();
    }
}

// ---------- KHỞI TẠO GAME ----------
window.game = new GameEngine();
