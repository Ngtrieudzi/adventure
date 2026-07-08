// game.js - Phiên bản ĐẦY ĐỦ TÍNH NĂNG với ẢNH

// ---------- DỮ LIỆU THẺ BÀI (Có ẢNH) ----------
const CARD_DATA = [
    // Naruto
    { 
        id: 1, name: "Naruto Uzumaki", anime: "Naruto", hp: 140, attack: 22, rarity: "rare", 
        emoji: "🍥", image: "https://i.pinimg.com/736x/6e/8e/8b/6e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Nhân Bản", "Rasengan"], 
        passive: { name: "Ý Chí Lửa", trigger: "onLowHealth", effect: "buff_attack_30" }
    },
    { 
        id: 2, name: "Sasuke Uchiha", anime: "Naruto", hp: 120, attack: 28, rarity: "rare",
        emoji: "⚡", image: "https://i.pinimg.com/736x/7e/8e/8b/7e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Chidori", "Sharingan"], 
        passive: { name: "Sự Hận Thù", trigger: "onAllyDeath", effect: "buff_attack_50" }
    },
    { 
        id: 3, name: "Sakura Haruno", anime: "Naruto", hp: 100, attack: 18, rarity: "common",
        emoji: "🌸", image: "https://i.pinimg.com/736x/8e/8e/8b/8e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Chakra Tập Trung", "Hồi Phục"], 
        passive: { name: "Nữ Chiến Binh", trigger: "onTurnStart", effect: "heal_10" }
    },
    
    // One Piece
    { 
        id: 5, name: "Monkey D. Luffy", anime: "One Piece", hp: 160, attack: 20, rarity: "legendary",
        emoji: "🏴‍☠️", image: "https://i.pinimg.com/736x/9e/8e/8b/9e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Gomu Gomu", "Gear Second"], 
        passive: { name: "Vua Hải Tặc", trigger: "onLowHealth", effect: "buff_attack_50" }
    },
    { 
        id: 6, name: "Roronoa Zoro", anime: "One Piece", hp: 140, attack: 24, rarity: "epic",
        emoji: "⚔️", image: "https://i.pinimg.com/736x/ae/8e/8b/ae8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Tam Kiếm", "Santoryu"], 
        passive: { name: "Lòng Trung Thành", trigger: "onAllyDeath", effect: "buff_attack_40" }
    },
    
    // Jujutsu Kaisen
    { 
        id: 9, name: "Satoru Gojo", anime: "Jujutsu Kaisen", hp: 150, attack: 32, rarity: "legendary",
        emoji: "👁️", image: "https://i.pinimg.com/736x/be/8e/8b/be8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Vô Hạn", "Hollow Purple"], 
        passive: { name: "Người Mạnh Nhất", trigger: "onTurnStart", effect: "buff_attack_20" }
    },
    { 
        id: 11, name: "Megumi Fushiguro", anime: "Jujutsu Kaisen", hp: 120, attack: 23, rarity: "rare",
        emoji: "🐕", image: "https://i.pinimg.com/736x/ce/8e/8b/ce8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Triệu Hồi", "Bóng Tối"], 
        passive: { name: "Người Thừa Kế", trigger: "onSummon", effect: "buff_attack_25" }
    },
    
    // Demon Slayer
    { 
        id: 12, name: "Tanjiro Kamado", anime: "Demon Slayer", hp: 130, attack: 24, rarity: "rare",
        emoji: "🌊", image: "https://i.pinimg.com/736x/de/8e/8b/de8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Hơi Thở Nước", "Mặt Trời"], 
        passive: { name: "Tình Thân", trigger: "onAllyDeath", effect: "buff_attack_30" }
    },
    { 
        id: 13, name: "Nezuko Kamado", anime: "Demon Slayer", hp: 115, attack: 20, rarity: "uncommon",
        emoji: "🔥", image: "https://i.pinimg.com/736x/ee/8e/8b/ee8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Huyết Quỷ", "Băng Giá"], 
        passive: { name: "Sức Mạnh Quỷ", trigger: "onLowHealth", effect: "buff_attack_35" }
    },
    { 
        id: 15, name: "Kyojuro Rengoku", anime: "Demon Slayer", hp: 145, attack: 29, rarity: "epic",
        emoji: "🔥", image: "https://i.pinimg.com/736x/fe/8e/8b/fe8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Hơi Thở Lửa", "Phượng Hoàng"], 
        passive: { name: "Ngọn Lửa Bất Diệt", trigger: "onDeath", effect: "deal_damage_50_to_all" }
    },
    
    // Bleach
    { 
        id: 16, name: "Ichigo Kurosaki", anime: "Bleach", hp: 150, attack: 28, rarity: "epic",
        emoji: "⚔️", image: "https://i.pinimg.com/736x/0e/8e/8b/0e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Getsuga Tenshou", "Bankai"], 
        passive: { name: "Sức Mạnh Hỗn Hợp", trigger: "onTurnStart", effect: "buff_attack_15" }
    },
    
    // My Hero Academia
    { 
        id: 18, name: "Izuku Midoriya", anime: "My Hero Academia", hp: 125, attack: 26, rarity: "rare",
        emoji: "💪", image: "https://i.pinimg.com/736x/1e/8e/8b/1e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["One For All", "Full Cowling"], 
        passive: { name: "Anh Hùng", trigger: "onAllyDeath", effect: "buff_attack_45" }
    },
    { 
        id: 19, name: "Katsuki Bakugo", anime: "My Hero Academia", hp: 130, attack: 30, rarity: "epic",
        emoji: "💥", image: "https://i.pinimg.com/736x/2e/8e/8b/2e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Nổ", "Howitzer"], 
        passive: { name: "Kiêu Hãnh", trigger: "onKill", effect: "buff_attack_20" }
    },
    
    // Seven Deadly Sins
    { 
        id: 20, name: "Escanor", anime: "Seven Deadly Sins", hp: 170, attack: 35, rarity: "ex",
        emoji: "☀️", image: "https://i.pinimg.com/736x/3e/8e/8b/3e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Mặt Trời", "Cruel Sun"], 
        passive: { name: "Lòng Kiêu Hãnh", trigger: "onTurnStart", effect: "buff_attack_50_if_high_health" }
    },
    { 
        id: 21, name: "Meliodas", anime: "Seven Deadly Sins", hp: 155, attack: 30, rarity: "legendary",
        emoji: "⚡", image: "https://i.pinimg.com/736x/4e/8e/8b/4e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Full Counter", "Revenge Counter"], 
        passive: { name: "Tội Đồ", trigger: "onDamageTaken", effect: "counter_attack" }
    },
    
    // Solo Leveling
    { 
        id: 22, name: "Sung Jin-Woo", anime: "Solo Leveling", hp: 160, attack: 33, rarity: "ex",
        emoji: "👑", image: "https://i.pinimg.com/736x/5e/8e/8b/5e8e8b6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Triệu Hồi Bóng Tối", "Arise"], 
        passive: { name: "Shadow Monarch", trigger: "onKill", effect: "summon_shadow" }
    },
    
    // Thêm nhân vật mới
    { 
        id: 23, name: "Yuji Itadori", anime: "Jujutsu Kaisen", hp: 135, attack: 26, rarity: "epic",
        emoji: "👊", image: "https://i.pinimg.com/736x/6e/8e/8c/6e8e8c6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Đấm", "Vũ Khí Nguyền Rủa"], 
        passive: { name: "Vật Chứa", trigger: "onLowHealth", effect: "transform_to_sukuna" }
    },
    { 
        id: 24, name: "Sukuna", anime: "Jujutsu Kaisen", hp: 180, attack: 40, rarity: "ex",
        emoji: "👹", image: "https://i.pinimg.com/736x/7e/8e/8c/7e8e8c6a8b6a8b6a8b6a8b6a8b6a8b6a.jpg",
        skills: ["Cắt", "Khai Phong"], 
        passive: { name: "Vua Nguyền Rủa", trigger: "onTurnStart", effect: "buff_attack_25" }
    },
];

// ---------- ĐỊNH NGHĨA CÁC HIỆU ỨNG ----------
const EFFECT_TYPES = {
    BURN: 'burn',
    BLEED: 'bleed',
    STUN: 'stun',
    HEAL: 'heal',
    BUFF_ATTACK: 'buff_attack',
    BUFF_DEFENSE: 'buff_defense',
    DEBUFF_ATTACK: 'debuff_attack',
    POISON: 'poison',
    COUNTER: 'counter',
    SUMMON: 'summon',
    TRANSFORM: 'transform',
};

// ---------- LỚP THẺ BÀI ----------
class Card {
    constructor(data) {
        this.id = data.id + Date.now() + Math.random() * 1000;
        this.name = data.name;
        this.anime = data.anime;
        this.hp = data.hp;
        this.maxHp = data.hp;
        this.attack = data.attack;
        this.rarity = data.rarity || 'common';
        this.emoji = data.emoji || '🃏';
        this.image = data.image || '';
        this.skills = data.skills || [];
        this.passive = data.passive || null;
        this.isAlive = true;
        this.originalAttack = data.attack;
        this.originalHp = data.hp;
        this.effects = []; // Hiệu ứng đang có
        this.isStunned = false;
        this.transformTo = data.transformTo || null;
    }
}

// ---------- LỚP NGƯỜI CHƠI ----------
class Player {
    constructor(name) {
        this.name = name;
        this.health = 1000;
        this.maxHealth = 1000;
        this.board = [];
        this.hand = [];
        this.gold = 0;
        this.wins = 0;
        this.totalWaves = 0;
        this.summons = [];
        this.transformations = [];
        this.bossDefeated = 0;
        this.challenges = {
            jujutsu: false,
            naruto: false,
            onepiece: false,
            demonslayer: false,
        };
        this.profile = {
            avatar: 'default',
            title: 'Người Mới',
            favoriteCard: null,
            totalCards: 0,
        };
    }
}

// ---------- ENGINE GAME ----------
class GameEngine {
    constructor() {
        this.player = new Player("Người chơi");
        this.enemies = [];
        this.boss = null;
        this.wave = 0;
        this.turn = 0;
        this.gameOver = false;
        this.isPlayerTurn = true;
        this.message = "Chào mừng! Hãy bắt đầu hành trình của bạn!";
        this.bossDefeated = false;
        this.isBossWave = false;
        this.challengeMode = null; // 'jujutsu', 'naruto', 'onepiece', 'demonslayer'
        this.challengeEnemies = [];
        this.comboCount = 0;
        this.lastAction = '';
        
        this.startGame();
    }

    startGame() {
        this.player = new Player("Người chơi");
        this.enemies = [];
        this.boss = null;
        this.wave = 0;
        this.turn = 0;
        this.gameOver = false;
        this.isPlayerTurn = true;
        this.bossDefeated = false;
        this.isBossWave = false;
        this.challengeMode = null;
        this.challengeEnemies = [];
        this.comboCount = 0;
        
        this.player.hand = this.getRandomCards(5);
        for (let i = 0; i < Math.min(2, this.player.hand.length); i++) {
            this.playCard(0);
        }
        
        this.setMessage("🎴 Chào mừng! Hãy chọn thẻ và chiến đấu!");
        this.render();
    }

    // ---------- LẤY THẺ NGẪU NHIÊN ----------
    getRandomCards(n) {
        const shuffled = [...CARD_DATA].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n).map(data => new Card(data));
    }

    // ---------- ĐƯA THẺ RA SÂN ----------
    playCard(index) {
        if (index < 0 || index >= this.player.hand.length) return;
        if (this.player.board.length >= 5) {
            this.setMessage("⚠️ Sân đã đầy (tối đa 5 thẻ)!");
            this.render();
            return;
        }
        
        const card = this.player.hand.splice(index, 1)[0];
        this.player.board.push(card);
        this.setMessage(`✅ Đã đưa ${card.emoji} ${card.name} ra sân!`);
        this.render();
    }

    // ---------- CHUYỂN SÓNG ----------
    nextWave() {
        if (this.gameOver) return;
        
        this.wave++;
        this.player.totalWaves++;
        
        // Kiểm tra boss (sóng 10, 20, 30, 50)
        if (this.wave % 10 === 0 || this.wave === 50) {
            this.isBossWave = true;
            this.boss = this.generateBoss();
            this.setMessage(`👑 BOSS XUẤT HIỆN! Sóng ${this.wave} - ${this.boss.name}!`);
            this.enemies = [];
        } else {
            this.isBossWave = false;
            this.boss = null;
            this.generateEnemies();
            this.setMessage(`🌊 Sóng ${this.wave} bắt đầu! (${this.enemies.length} quái vật)`);
        }
        
        // Hồi phục cho người chơi
        const healAmount = 50 + this.wave * 5;
        this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
        this.player.gold += 10 + this.wave;
        
        this.render();
    }

    // ---------- TẠO QUÁI VẬT ----------
    generateEnemies() {
        const count = Math.min(3 + Math.floor(this.wave / 3), 6);
        this.enemies = [];
        const enemyNames = ['Goblin', 'Orc', 'Slime', 'Skeleton', 'Demon', 'Shadow', 'Frost', 'Flame', 'Thunder', 'Dark'];
        
        for (let i = 0; i < count; i++) {
            const baseHp = 40 + this.wave * 12 + Math.floor(Math.random() * 20);
            const baseAtk = 8 + this.wave * 3 + Math.floor(Math.random() * 5);
            const nameIndex = (i + this.wave) % enemyNames.length;
            const enemy = new Card({
                id: 1000 + i,
                name: `${enemyNames[nameIndex]} Lv.${this.wave}`,
                anime: `Sóng ${this.wave}`,
                hp: baseHp,
                attack: baseAtk,
                rarity: 'common',
                emoji: ['👾', '👻', '🧛', '🧟', '👹', '😈', '👺'][i % 7],
                image: ''
            });
            this.enemies.push(enemy);
        }
    }

    // ---------- TẠO BOSS ----------
    generateBoss() {
        const bossData = [
            { name: 'Vua Quỷ', emoji: '👿', hp: 300, atk: 30, desc: 'Bóng Tối Nguyên Thủy' },
            { name: 'Rồng Bóng Tối', emoji: '🐉', hp: 400, atk: 35, desc: 'Kẻ Thống Trị Bóng Đêm' },
            { name: 'Thần Hủy Diệt', emoji: '💀', hp: 500, atk: 40, desc: 'Tận Thế Đang Đến' },
            { name: 'Kẻ Thống Trị', emoji: '👑', hp: 600, atk: 45, desc: 'Chúa Tể Vũ Trụ' },
        ];
        
        const bossIndex = Math.min(Math.floor(this.wave / 10) - 1, bossData.length - 1);
        const data = bossData[bossIndex] || bossData[0];
        
        const waveBonus = this.wave * 5;
        const boss = new Card({
            id: 9999,
            name: data.name,
            anime: `BOSS Sóng ${this.wave}`,
            hp: data.hp + waveBonus,
            attack: data.atk + Math.floor(waveBonus / 3),
            rarity: 'ex',
            emoji: data.emoji,
            image: ''
        });
        boss.desc = data.desc;
        
        if (this.wave === 50) {
            boss.name = 'Chaos - Kẻ Hủy Diệt Vũ Trụ';
            boss.hp = 2000;
            boss.attack = 60;
            boss.emoji = '👾';
            boss.desc = 'Sự Hủy Diệt Tối Thượng';
        }
        
        return boss;
    }

    // ---------- THỬ THÁCH ĐẶC BIỆT ----------
    startChallenge(type) {
        if (this.gameOver) return;
        if (this.challengeMode) {
            this.setMessage("⚠️ Đang trong thử thách khác!");
            return;
        }
        
        this.challengeMode = type;
        this.isBossWave = true;
        
        const challenges = {
            jujutsu: {
                name: 'Inventário Oculto',
                enemies: ['Gojo', 'Geto', 'Toji'],
                boss: 'Sukuna',
                reward: 100
            },
            naruto: {
                name: 'Floresta da Morte',
                enemies: ['Orochimaru', 'Kabuto', 'Sound Ninja'],
                boss: 'Orochimaru Snake',
                reward: 100
            },
            onepiece: {
                name: 'Enies Lobby',
                enemies: ['CP9', 'Rob Lucci', 'Kaku'],
                boss: 'Enel',
                reward: 100
            },
            demonslayer: {
                name: 'Trem Infinito',
                enemies: ['Akaza', 'Rui', 'Daki'],
                boss: 'Muzan',
                reward: 100
            }
        };
        
        const challenge = challenges[type];
        if (!challenge) {
            this.setMessage("⚠️ Thử thách không tồn tại!");
            return;
        }
        
        this.setMessage(`⚔️ Thử thách ${challenge.name} bắt đầu!`);
        
        // Tạo quái vật thử thách
        this.challengeEnemies = [];
        for (let i = 0; i < challenge.enemies.length; i++) {
            const enemy = new Card({
                id: 2000 + i,
                name: challenge.enemies[i],
                anime: `Thử thách ${challenge.name}`,
                hp: 200 + this.wave * 20,
                attack: 20 + this.wave * 5,
                rarity: 'epic',
                emoji: ['⚔️', '🗡️', '🔪', '💀', '👹'][i % 5],
                image: ''
            });
            this.challengeEnemies.push(enemy);
        }
        
        // Boss thử thách
        const boss = new Card({
            id: 2999,
            name: challenge.boss,
            anime: `Thử thách ${challenge.name}`,
            hp: 500 + this.wave * 30,
            attack: 35 + this.wave * 5,
            rarity: 'ex',
            emoji: '👑',
            image: ''
        });
        this.boss = boss;
        this.enemies = this.challengeEnemies;
        this.player.gold += 50;
        
        this.render();
    }

    // ---------- TẤN CÔNG (Có hệ thống combo) ----------
    playerAttack(cardIndex) {
        if (this.gameOver || !this.isPlayerTurn) return;
        
        const attacker = this.player.board[cardIndex];
        if (!attacker || !attacker.isAlive) {
            this.setMessage("⚠️ Thẻ này đã bị đánh bại!");
            this.render();
            return;
        }

        // Kiểm tra stun
        if (attacker.isStunned) {
            this.setMessage(`⛔ ${attacker.name} đang bị choáng!`);
            this.render();
            return;
        }

        // Xác định mục tiêu
        let target = null;
        if (this.boss && this.boss.isAlive) {
            target = this.boss;
        } else if (this.enemies.length > 0) {
            target = this.enemies[0];
        } else {
            this.setMessage("🎉 Không còn kẻ địch! Chuyển sang sóng mới...");
            this.nextWave();
            return;
        }

        // Xử lý kỹ năng và hiệu ứng
        const skillResult = this.processSkills(attacker, target);
        
        // Tính sát thương
        let damage = attacker.attack;
        const isCrit = Math.random() < 0.15;
        if (isCrit) damage = Math.floor(damage * 1.8);
        
        // Combo system
        this.comboCount = this.lastAction === 'attack' ? this.comboCount + 1 : 1;
        if (this.comboCount >= 3) {
            damage = Math.floor(damage * 1.3);
            this.setMessage(`🔥 COMBO x${this.comboCount}! Sát thương +30%!`);
        }
        this.lastAction = 'attack';
        
        // Áp dụng buff/debuff
        damage = this.applyBuffs(attacker, damage);
        
        // Gây sát thương
        target.hp -= damage;
        this.turn++;
        
        // Xử lý hiệu ứng đặc biệt
        const effects = this.processEffects(attacker, target, damage);
        
        // Log
        const critText = isCrit ? '💥 CHÍ MẠNG! ' : '';
        this.setMessage(`${attacker.emoji} ${attacker.name} tấn công ${target.emoji} ${target.name}: ${critText}-${damage} máu!`);
        
        // Kiểm tra target chết
        if (target.hp <= 0) {
            target.isAlive = false;
            this.onEnemyDefeated(target, attacker);
        }

        this.isPlayerTurn = false;
        this.render();

        // Xử lý passive của kẻ địch
        this.processPassiveTriggers('onAttack', attacker);

        setTimeout(() => {
            this.enemyTurn();
        }, 500);
    }

    // ---------- XỬ LÝ KỸ NĂNG ----------
    processSkills(attacker, target) {
        if (!attacker.skills || attacker.skills.length === 0) return null;
        
        // Chọn kỹ năng ngẫu nhiên
        const skillName = attacker.skills[Math.floor(Math.random() * attacker.skills.length)];
        const skillEffects = {
            'Nhân Bản': { type: 'summon', value: 1, desc: 'Triệu hồi bản sao!' },
            'Rasengan': { type: 'damage', value: 1.5, desc: 'Sát thương x1.5!' },
            'Chidori': { type: 'damage', value: 1.6, desc: 'Sát thương x1.6!' },
            'Sharingan': { type: 'buff_attack', value: 20, desc: 'Tăng 20% sát thương!' },
            'Gomu Gomu': { type: 'damage', value: 1.3, desc: 'Sát thương x1.3!' },
            'Gear Second': { type: 'buff_attack', value: 30, desc: 'Tăng 30% sát thương!' },
            'Tam Kiếm': { type: 'damage', value: 1.7, desc: 'Sát thương x1.7!' },
            'Vô Hạn': { type: 'debuff_defense', value: 30, desc: 'Giảm 30% phòng thủ!' },
            'Hollow Purple': { type: 'damage', value: 2.0, desc: 'Sát thương x2.0!' },
            'Hơi Thở Nước': { type: 'damage', value: 1.4, desc: 'Sát thương x1.4!' },
            'Mặt Trời': { type: 'damage', value: 1.8, desc: 'Sát thương x1.8!' },
            'Bankai': { type: 'buff_attack', value: 50, desc: 'Tăng 50% sát thương!' },
            'One For All': { type: 'buff_attack', value: 25, desc: 'Tăng 25% sát thương!' },
            'Full Counter': { type: 'counter', value: 1.5, desc: 'Phản đòn x1.5!' },
            'Arise': { type: 'summon', value: 2, desc: 'Triệu hồi 2 bóng đen!' },
        };
        
        const effect = skillEffects[skillName];
        if (!effect) return null;
        
        this.setMessage(`✨ ${attacker.name} dùng ${skillName}: ${effect.desc}`);
        
        switch(effect.type) {
            case 'damage':
                attacker.attack = Math.floor(attacker.attack * effect.value);
                setTimeout(() => {
                    attacker.attack = attacker.originalAttack;
                }, 1000);
                break;
            case 'buff_attack':
                attacker.attack = Math.floor(attacker.attack * (1 + effect.value / 100));
                setTimeout(() => {
                    attacker.attack = attacker.originalAttack;
                }, 2000);
                break;
            case 'summon':
                // Triệu hồi thêm quái vật hỗ trợ
                for (let i = 0; i < effect.value; i++) {
                    const summon = new Card({
                        id: 3000 + i,
                        name: `Bóng đen ${i+1}`,
                        anime: 'Triệu hồi',
                        hp: 80 + this.wave * 10,
                        attack: 10 + this.wave * 2,
                        rarity: 'uncommon',
                        emoji: '🌑',
                        image: ''
                    });
                    this.enemies.push(summon);
                }
                break;
            case 'counter':
                // Phản đòn
                setTimeout(() => {
                    if (target && target.isAlive) {
                        const counterDamage = Math.floor(attacker.attack * effect.value);
                        target.hp -= counterDamage;
                        this.setMessage(`🔄 Phản đòn! ${target.name} nhận ${counterDamage} sát thương!`);
                        if (target.hp <= 0) {
                            target.isAlive = false;
                            this.onEnemyDefeated(target, attacker);
                        }
                        this.render();
                    }
                }, 300);
                break;
        }
        
        return effect;
    }

    // ---------- XỬ LÝ HIỆU ỨNG ĐẶC BIỆT ----------
    processEffects(attacker, target, damage) {
        const effects = [];
        
        // Hiệu ứng Burn
        if (Math.random() < 0.1) {
            const burnDamage = Math.floor(damage * 0.3);
            target.hp -= burnDamage;
            effects.push('🔥 Thiêu đốt!');
            this.setMessage(`🔥 ${target.name} bị thiêu đốt! -${burnDamage} máu!`);
        }
        
        // Hiệu ứng Bleed
        if (Math.random() < 0.1) {
            const bleedDamage = Math.floor(damage * 0.2);
            target.hp -= bleedDamage;
            effects.push('🩸 Chảy máu!');
            this.setMessage(`🩸 ${target.name} bị chảy máu! -${bleedDamage} máu!`);
        }
        
        // Hiệu ứng Stun
        if (Math.random() < 0.05) {
            target.isStunned = true;
            effects.push('⛔ Choáng!');
            this.setMessage(`⛔ ${target.name} bị choáng!`);
            setTimeout(() => {
                target.isStunned = false;
                this.setMessage(`✅ ${target.name} đã tỉnh lại!`);
                this.render();
            }, 2000);
        }
        
        // Hiệu ứng Heal (hồi phục cho người chơi)
        if (Math.random() < 0.05 && attacker === this.player.board[0]) {
            const healAmount = Math.floor(this.player.health * 0.1);
            this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
            effects.push('💚 Hồi phục!');
            this.setMessage(`💚 Hồi phục ${healAmount} máu!`);
        }
        
        return effects;
    }

    // ---------- ÁP DỤNG BUFF/DEBUFF ----------
    applyBuffs(card, damage) {
        let finalDamage = damage;
        
        // Buff tấn công
        if (card.effects && card.effects.includes('buff_attack')) {
            finalDamage = Math.floor(finalDamage * 1.3);
        }
        
        // Debuff phòng thủ (tăng sát thương)
        if (card.effects && card.effects.includes('debuff_defense')) {
            finalDamage = Math.floor(finalDamage * 1.2);
        }
        
        return finalDamage;
    }

    // ---------- XỬ LÝ KHI KẺ ĐỊCH CHẾT ----------
    onEnemyDefeated(enemy, attacker) {
        // Kiểm tra xem có phải boss không
        if (this.boss && enemy.id === this.boss.id) {
            this.boss = null;
            this.bossDefeated = true;
            this.player.bossDefeated++;
            this.player.gold += 100 + this.wave * 10;
            this.setMessage(`🎉 ${enemy.emoji} ${enemy.name} đã bị đánh bại! +${100 + this.wave * 10} vàng!`);
            
            // Kiểm tra thử thách
            if (this.challengeMode) {
                const challengeNames = {
                    jujutsu: 'Inventário Oculto',
                    naruto: 'Floresta da Morte',
                    onepiece: 'Enies Lobby',
                    demonslayer: 'Trem Infinito'
                };
                this.setMessage(`🎉 Hoàn thành thử thách ${challengeNames[this.challengeMode]}!`);
                this.player.gold += 200;
                this.challengeMode = null;
                this.challengeEnemies = [];
            }
            
            // Kiểm tra chiến thắng (sóng 50)
            if (this.wave === 50) {
                this.gameOver = true;
                this.setMessage("🎉 CHIẾN THẮNG! Bạn đã vượt qua sóng 50!");
                this.render();
                return;
            }
        } else {
            // Quái vật thường
            const goldReward = 5 + this.wave;
            this.player.gold += goldReward;
            this.setMessage(`💀 ${enemy.emoji} ${enemy.name} bị tiêu diệt! +${goldReward} vàng!`);
            
            // Xử lý passive
            if (attacker && attacker.passive && attacker.passive.trigger === 'onKill') {
                const effect = attacker.passive.effect;
                if (effect === 'buff_attack_20') {
                    attacker.attack = Math.floor(attacker.attack * 1.2);
                    this.setMessage(`⚡ ${attacker.name} nhận buff +20% sát thương!`);
                }
            }
        }

        // Kiểm tra hết quái
        const enemiesAlive = this.enemies.filter(e => e.isAlive);
        const bossAlive = this.boss && this.boss.isAlive;
        
        if (enemiesAlive.length === 0 && !bossAlive) {
            this.setMessage(`🎉 Sóng ${this.wave} đã được dọn sạch!`);
            setTimeout(() => {
                if (!this.gameOver) this.nextWave();
            }, 1000);
        }
    }

    // ---------- XỬ LÝ PASSIVE ----------
    processPassiveTriggers(trigger, card) {
        // Passive của thẻ
        if (card && card.passive && card.passive.trigger === trigger) {
            const effect = card.passive.effect;
            this.applyPassiveEffect(card, effect);
        }
        
        // Passive của tất cả thẻ trên sân
        for (let c of this.player.board) {
            if (c && c.isAlive && c.passive && c.passive.trigger === trigger) {
                if (c.id !== card.id) {
                    this.applyPassiveEffect(c, c.passive.effect);
                }
            }
        }
    }

    applyPassiveEffect(card, effect) {
        switch(effect) {
            case 'buff_attack_30':
                card.attack = Math.floor(card.attack * 1.3);
                this.setMessage(`⚡ ${card.name} nhận buff +30% sát thương!`);
                break;
            case 'buff_attack_50':
                card.attack = Math.floor(card.attack * 1.5);
                this.setMessage(`⚡ ${card.name} nhận buff +50% sát thương!`);
                break;
            case 'buff_attack_25':
                card.attack = Math.floor(card.attack * 1.25);
                this.setMessage(`⚡ ${card.name} nhận buff +25% sát thương!`);
                break;
            case 'heal_10':
                const heal = Math.floor(card.maxHp * 0.1);
                card.hp = Math.min(card.maxHp, card.hp + heal);
                this.setMessage(`💚 ${card.name} hồi phục ${heal} máu!`);
                break;
            case 'transform_to_sukuna':
                if (card.name !== 'Sukuna') {
                    const sukunaData = CARD_DATA.find(c => c.name === 'Sukuna');
                    if (sukunaData) {
                        card.name = 'Sukuna';
                        card.attack = sukunaData.attack;
                        card.hp = sukunaData.hp;
                        card.maxHp = sukunaData.hp;
                        card.emoji = sukunaData.emoji;
                        card.image = sukunaData.image;
                        card.skills = sukunaData.skills;
                        this.setMessage(`🔥 ${card.name} biến hình thành Sukuna!`);
                    }
                }
                break;
            case 'summon_shadow':
                const shadow = new Card({
                    id: 4000 + Date.now(),
                    name: 'Bóng Đen',
                    anime: 'Solo Leveling',
                    hp: 100 + this.wave * 10,
                    attack: 15 + this.wave * 2,
                    rarity: 'uncommon',
                    emoji: '🌑',
                    image: ''
                });
                // Thêm vào đội người chơi
                if (this.player.board.length < 5) {
                    this.player.board.push(shadow);
                    this.setMessage(`🌑 ${shadow.name} xuất hiện!`);
                }
                break;
            case 'counter_attack':
                // Phản đòn đã được xử lý ở processSkills
                break;
        }
    }

    // ---------- LƯỢT CỦA KẺ ĐỊCH ----------
    enemyTurn() {
        if (this.gameOver) return;

        // Tất cả kẻ địch tấn công
        const enemies = [...this.enemies];
        if (this.boss && this.boss.isAlive) enemies.push(this.boss);
        
        // Kiểm tra stun cho kẻ địch
        for (let enemy of enemies) {
            if (!enemy.isAlive) continue;
            
            if (enemy.isStunned) {
                this.setMessage(`⛔ ${enemy.name} đang bị choáng, bỏ qua lượt!`);
                continue;
            }
            
            // Chọn mục tiêu
            const aliveCards = this.player.board.filter(c => c.isAlive);
            let target = null;
            
            if (aliveCards.length > 0) {
                target = aliveCards[Math.floor(Math.random() * aliveCards.length)];
                const damage = Math.floor(enemy.attack * (0.6 + Math.random() * 0.4));
                target.hp -= damage;
                
                if (target.hp <= 0) {
                    target.isAlive = false;
                    this.player.board = this.player.board.filter(c => c.isAlive);
                    this.setMessage(`💀 ${target.emoji} ${target.name} đã bị ${enemy.emoji} ${enemy.name} đánh bại!`);
                } else {
                    this.setMessage(`⚔️ ${enemy.emoji} ${enemy.name} tấn công ${target.emoji} ${target.name}: -${damage} máu!`);
                }
            } else {
                // Tấn công trực tiếp
                const damage = Math.floor(enemy.attack * 0.7);
                this.player.health -= damage;
                this.setMessage(`💢 ${enemy.emoji} ${enemy.name} tấn công trực tiếp: -${damage} máu!`);
            }
        }

        // Kiểm tra game over
        if (this.player.health <= 0 || this.player.board.length === 0) {
            this.gameOver = true;
            this.setMessage("💀 GAME OVER! Bạn đã thua ở sóng " + this.wave);
            this.render();
            return;
        }

        // Kiểm tra hết quái
        const enemiesAlive = this.enemies.filter(e => e.isAlive);
        const bossAlive = this.boss && this.boss.isAlive;
        
        if (enemiesAlive.length === 0 && !bossAlive) {
            this.setMessage(`🎉 Sóng ${this.wave} đã được dọn sạch!`);
            setTimeout(() => {
                if (!this.gameOver) this.nextWave();
            }, 1000);
        }

        this.isPlayerTurn = true;
        this.render();
    }

    // ---------- RÚT BÀI ----------
    drawCard() {
        if (this.player.hand.length >= 8) {
            this.setMessage("⚠️ Tay bài đã đầy (tối đa 8)!");
            this.render();
            return;
        }
        
        const newCard = new Card(CARD_DATA[Math.floor(Math.random() * CARD_DATA.length)]);
        this.player.hand.push(newCard);
        this.setMessage(`🃏 Đã rút được ${newCard.emoji} ${newCard.name}!`);
        this.render();
    }

    // ---------- CẬP NHẬT THÔNG BÁO ----------
    setMessage(msg) {
        this.message = msg;
    }

    // ---------- HIỂN THỊ UI ----------
    render() {
        const area = document.getElementById('game-area');
        if (!area) return;

        let html = '';

        // ---- Thông tin người chơi ----
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        html += `
            <div id="player-info">
                <div class="player-name">⚔️ ${this.player.name}</div>
                <div class="health-bar-container">
                    <div class="health-bar">
                        <div class="health-fill" style="width: ${healthPercent}%;"></div>
                        <span class="health-text">❤️ ${Math.max(0, this.player.health)} / ${this.player.maxHealth}</span>
                    </div>
                </div>
                <div class="player-stats">
                    <span>⭐ Sóng: <span class="value">${this.wave}</span></span>
                    <span>💰 Vàng: <span class="value">${this.player.gold}</span></span>
                    <span>🔄 Lượt: <span class="value">${this.turn}</span></span>
                    <span>🔥 Combo: <span class="value">${this.comboCount}</span></span>
                </div>
            </div>
        `;

        // ---- Thông báo ----
        html += `
            <div id="message-log">
                ${this.message}
            </div>
        `;

        // ---- Boss announcement ----
        if (this.isBossWave && this.boss && this.boss.isAlive) {
            html += `
                <div class="boss-announce">
                    <h2>👑 ${this.boss.emoji} ${this.boss.name} 👑</h2>
                    <p style="color: #ff6b6b;">${this.boss.desc || 'Boss cực mạnh!'}</p>
                    <p>❤️ ${this.boss.hp} / ${this.boss.maxHp} | ⚔️ ATK: ${this.boss.attack}</p>
                </div>
            `;
        }

        // ---- Sân của người chơi ----
        html += `
            <div class="section-title">⚔️ Đội của bạn <span class="badge">${this.player.board.filter(c => c.isAlive).length} thẻ</span></div>
            <div class="card-area" id="player-board">
        `;
        
        if (this.player.board.filter(c => c.isAlive).length === 0) {
            html += `<p style="color: #ff6b6b; width: 100%; text-align: center;">⚠️ Không còn thẻ nào!</p>`;
        } else {
            this.player.board.forEach((card, index) => {
                if (!card.isAlive) return;
                const hpPercent = (card.hp / card.maxHp) * 100;
                const rarityClass = `rarity-${card.rarity}`;
                const isStunned = card.isStunned ? '⛔ ' : '';
                html += `
                    <div class="card ${rarityClass}" onclick="window.game.playerAttack(${index})" title="Nhấn để tấn công">
                        ${card.image ? `<img src="${card.image}" alt="${card.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 50%; margin: 0 auto 8px; display: block; border: 2px solid #f5c842;">` : ''}
                        <div class="card-name">${isStunned}${card.emoji} ${card.name}</div>
                        <div class="card-anime">${card.anime}</div>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${hpPercent}%;"></div>
                        </div>
                        <div class="card-stats">
                            <span>❤️ ${Math.max(0, card.hp)}</span>
                            <span>⚔️ ${card.attack}</span>
                            ${card.isStunned ? '<span>⛔ Choáng</span>' : ''}
                        </div>
                        ${card.skills && card.skills.length > 0 ? `<div style="font-size: 0.6rem; color: #4ecdc4;">⚡ ${card.skills.join(', ')}</div>` : ''}
                        <div class="action-hint">👆 Tấn công</div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // ---- Tay bài ----
        html += `
            <div class="section-title">🃏 Tay bài <span class="badge">${this.player.hand.length} thẻ</span></div>
            <div class="card-area" id="player-hand">
        `;
        
        if (this.player.hand.length === 0) {
            html += `<p style="color: #aaa; width: 100%; text-align: center;">Hết bài! Hãy rút thêm.</p>`;
        } else {
            this.player.hand.forEach((card, index) => {
                const rarityClass = `rarity-${card.rarity}`;
                html += `
                    <div class="card ${rarityClass}" onclick="window.game.playCard(${index})" title="Nhấn để ra sân">
                        ${card.image ? `<img src="${card.image}" alt="${card.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin: 0 auto 8px; display: block; border: 2px solid #f5c842;">` : ''}
                        <div class="card-name">${card.emoji} ${card.name}</div>
                        <div class="card-anime">${card.anime}</div>
                        <div class="card-stats">
                            <span>❤️ ${card.hp}</span>
                            <span>⚔️ ${card.attack}</span>
                        </div>
                        <div style="font-size: 0.6rem; color: #4ecdc4; margin-top: 5px;">👆 Ra sân</div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // ---- Kẻ địch ----
        const enemyCount = this.enemies.filter(e => e.isAlive).length;
        const bossAlive = this.boss && this.boss.isAlive;
        const totalEnemies = enemyCount + (bossAlive ? 1 : 0);
        
        html += `
            <div class="section-title">👾 Kẻ địch <span class="badge">${totalEnemies} con</span></div>
            <div class="card-area" id="enemy-area">
        `;
        
        if (totalEnemies === 0 && !this.gameOver) {
            html += `<p style="color: #4ecdc4; width: 100%; text-align: center;">✨ Sạch sẽ! Đợi chuyển sóng...</p>`;
        } else {
            // Hiển thị boss trước
            if (bossAlive && this.boss) {
                const hpPercent = (this.boss.hp / this.boss.maxHp) * 100;
                html += `
                    <div class="card enemy rarity-ex" style="border-color: #ff6b6b; box-shadow: 0 0 30px rgba(255,107,107,0.3);">
                        ${this.boss.image ? `<img src="${this.boss.image}" alt="${this.boss.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin: 0 auto 8px; display: block; border: 2px solid #ff6b6b;">` : ''}
                        <div class="card-name">👑 ${this.boss.emoji} ${this.boss.name}</div>
                        <div class="card-anime" style="color: #ff6b6b;">BOSS Sóng ${this.wave}</div>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${hpPercent}%; background: linear-gradient(90deg, #ff0000, #ff6b6b);"></div>
                        </div>
                        <div class="card-stats">
                            <span>❤️ ${Math.max(0, this.boss.hp)}</span>
                            <span>⚔️ ${this.boss.attack}</span>
                        </div>
                    </div>
                `;
            }
            
            // Hiển thị quái vật
            this.enemies.forEach((enemy) => {
                if (!enemy.isAlive) return;
                const hpPercent = (enemy.hp / enemy.maxHp) * 100;
                const isStunned = enemy.isStunned ? '⛔ ' : '';
                html += `
                    <div class="card enemy">
                        <div class="card-name">${isStunned}${enemy.emoji} ${enemy.name}</div>
                        <div class="card-anime">${enemy.anime}</div>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${hpPercent}%; background: linear-gradient(90deg, #ff0000, #ff6b6b);"></div>
                        </div>
                        <div class="card-stats">
                            <span>❤️ ${Math.max(0, enemy.hp)}</span>
                            <span>⚔️ ${enemy.attack}</span>
                            ${enemy.isStunned ? '<span>⛔ Choáng</span>' : ''}
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;

        // ---- Nút bấm ----
        html += `
            <div class="button-group">
                <button onclick="window.game.drawCard()">🃏 Rút bài</button>
                <button onclick="window.game.nextWave()" class="secondary">⏭️ Sóng tiếp</button>
                <button onclick="window.game.startChallenge('jujutsu')" class="secondary" style="background: #6b21a5; color: white;">👁️ Thử thách JJK</button>
                <button onclick="window.game.startChallenge('naruto')" class="secondary" style="background: #e67e22; color: white;">🍥 Thử thách Naruto</button>
                <button onclick="window.game.startChallenge('onepiece')" class="secondary" style="background: #e74c3c; color: white;">🏴‍☠️ Thử thách OP</button>
                <button onclick="window.game.startChallenge('demonslayer')" class="secondary" style="background: #2ecc71; color: white;">🌊 Thử thách DS</button>
                <button onclick="window.game.startGame()" class="danger">🔄 Chơi lại</button>
            </div>
        `;

        // ---- Thống kê ----
        html += `
            <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; font-size: 0.8rem; color: #8899bb; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
                <span>🎴 Tổng thẻ: ${this.player.board.filter(c => c.isAlive).length + this.player.hand.length}</span>
                <span>👑 Boss đã đánh bại: ${this.player.bossDefeated}</span>
                <span>🏆 Thử thách: ${this.challengeMode ? 'Đang diễn ra' : 'Chưa bắt đầu'}</span>
                <span>🔥 Combo: ${this.comboCount}</span>
            </div>
        `;

        // ---- Game Over ----
        if (this.gameOver) {
            html += `
                <div style="margin-top: 20px; padding: 20px; background: rgba(255,0,0,0.1); border-radius: 20px; border: 2px solid #ff6b6b;">
                    <h2 style="color: #ff6b6b; text-align: center;">💀 GAME OVER</h2>
                    <p style="text-align: center; color: #aaa;">Bạn đã sống sót đến sóng <span style="color: #f5c842; font-weight: bold;">${this.wave}</span></p>
                    <p style="text-align: center; color: #aaa;">💰 Vàng kiếm được: <span style="color: #f5c842; font-weight: bold;">${this.player.gold}</span></p>
                    <p style="text-align: center; color: #aaa;">👑 Boss đã đánh bại: <span style="color: #f5c842; font-weight: bold;">${this.player.bossDefeated}</span></p>
                </div>
            `;
        }

        area.innerHTML = html;
    }
}

// ---------- KHỞI TẠO GAME ----------
window.game = new GameEngine();

console.log("🎮 Anime Card Brawler đã sẵn sàng!");
console.log("📖 Hướng dẫn: Chọn thẻ trên tay để ra sân, nhấn thẻ trên sân để tấn công!");
console.log("⚔️ Các thử thách đặc biệt: JJK, Naruto, One Piece, Demon Slayer!");
