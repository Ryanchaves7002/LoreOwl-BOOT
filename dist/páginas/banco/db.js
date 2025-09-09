const DB_KEY = 'appdb_V1';

const defaultDB ={
    users: [],
    session : null,
    carts:{},

};

function loadDB(){
    const raw = localStorage.getItem(DB_KEY);
    if(!raw) return structuredClone(defaultDB);
    try{
        const data = JSON.parse(raw);

        return{ users: Array.isArray(data.users) ? data.users:[],
                session: data.session ?? null,
                carts: typeof data.carts === 'object' && data.carts !== null ? data.carts : {}

        };
    } catch{
        return structuredClone(defaultDB);
    }
}

function saveDB(db){
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}
function uuid(){
    if (crypto?. randomUUID) return crypto.randomUUID();
    return 'id-' + Math.random().toString(36).slice(2) + Date.now();
}
function normalizeEmail(email){
    return String(email || '').trim().toLowerCase();
}

export function initDB(){
    const db = loadDB();
    saveDB(db);
}
export function registerUser({ nome , email, passHash}){
    const db = loadDB();
    const em = normalizeEmail(email);

    if(db.users.some(u => u.email === em)){
        throw new Error('Email já cadastrado')
    }
    const user ={
        id: uuid(),
        nome: String(nome ||'').trim(),
        email: em,
        passHash,
        createdAt: new Date().toISOString()
    };
    db.users.push(user);
    saveDB(db);
    return user;
}
export function findUserByEmail(email){
    const db = loadDB();
    const em = normalizeEmail(email);
    return db.users.find(u => u.email === em) || null;
}
export function verifyUser(email, passHash ){
    const user = findUserByEmail(email);
    if(!user) return null;
    return user.passHash === passHash ? user : null;
}
export function setSession(userId) {
    const db = loadDB();
    db.session = { userId, createdAt: new Date().toISOString() };
    saveDB(db);
}
export function getSession(){
    const db = loadDB();
    return db.session;
}
export function  requireAuthorORedirect( redirectTo = 'login.html '){
    const session = getSession();
    if (!session){
        window.location.href = redirectTo;
        return null;
    }
    return session;
}

export function getCart(userId){
    const db = loadDB();
    if(!db.carts[userId]) db.carts[userId] = [];
    saveDB(db);
    return db.carts[userId];
}

export function addToCart(userId, item){
    const db = loadDB();
    const cart = db.carts[userId] || [];
    const existing = cart.find(i => i.id === item.id);
    if(existing){
        existing.qty += item.qty ?? 1;
    } else{
        cart.push({...item, qty: item.qty ?? 1});
    }
    db.carts[userId] = cart;
    saveDB(db);
    return cart;
}
export function updateQty (userId, itemId, qty){
    const db = loadDB();
    const cart = db.carts[userId] || [];
    const it = cart.find(i => i.id === itemId);
    if(it){
        it.qty = Math.max(1, parseInt(qty , 10)|| 1);
    }
    db.carts[userId] = cart;
    saveDB(db);
    return cart;
}
export function removeFromCart(userId, itemId) {
  const db = loadDB();
  const cart = (db.carts[userId] || []).filter(i => i.id !== itemId);
  db.carts[userId] = cart;
  saveDB(db);
  return cart;
}

export function clearCart(userId) {
  const db = loadDB();
  db.carts[userId] = [];
  saveDB(db);
}