/* Google sign-in + saved analysis history (Firebase Auth + Firestore).
   Stores only the numbers and verdicts of an analysis the user chooses to save, never the video.
   Data lives at users/{uid}/results/{id}; firestore.rules lets each user reach only their own. */
import { FIREBASE_CONFIG } from "./firebase-config.js";

const V = "10.12.2", CDN = `https://www.gstatic.com/firebasejs/${V}`;
const $ = (id) => document.getElementById(id);
const VIEW = { side: "มุมด้านข้าง", rear: "มุมด้านหลัง" };
const SRC = { scan: "คลิป", frame: "เฟรมจากคลิป", image: "ภาพนิ่ง" };
const VERDICT = { g: "ดี", m: "พอใช้", b: "ควรแก้", n: "ข้อมูลไม่พอ" };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

if (FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey && !/^PASTE_/.test(FIREBASE_CONFIG.apiKey)) start().catch((e) => console.warn("cloud disabled", e));

async function start() {
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`${CDN}/firebase-app.js`), import(`${CDN}/firebase-auth.js`), import(`${CDN}/firebase-firestore.js`)
  ]);
  const app = initializeApp(FIREBASE_CONFIG), auth = A.getAuth(app), db = F.getFirestore(app);
  auth.languageCode = "th";
  let user = null, hasResult = false, savedFor = null, seq = 0;

  const acc = $("account"), saveBtn = $("btn-cloud-save"), histTab = $("tab-btn-history"), list = $("hist-list"), msg = $("hist-msg");
  acc.hidden = false;
  const col = () => F.collection(db, "users", user.uid, "results");
  const say = (t) => { msg.textContent = t || ""; msg.hidden = !t; };

  function paintAccount() {
    $("acc-in").hidden = !!user; $("acc-out").hidden = !user;
    if (!user && !histTab.hidden) { histTab.hidden = true; if (histTab.getAttribute("aria-selected") === "true") window.SmashLab.showTab("video"); }
    if (user) {
      $("acc-name").textContent = user.displayName || user.email || "";
      const img = $("acc-photo"); img.hidden = !user.photoURL; if (user.photoURL) img.src = user.photoURL;
    }
    paintSave();
  }
  function paintSave() {
    saveBtn.hidden = !(user && hasResult);
    const done = savedFor === seq;
    saveBtn.disabled = done; saveBtn.lastChild.textContent = done ? " บันทึกแล้ว" : " บันทึกผล";
  }

  $("btn-signin").addEventListener("click", async () => {
    const p = new A.GoogleAuthProvider();
    try { await A.signInWithPopup(auth, p); }
    catch (e) {
      if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) await A.signInWithRedirect(auth, p);
      else if (!(e && e.code === "auth/popup-closed-by-user")) $("acc-err").textContent = "เข้าสู่ระบบไม่สำเร็จ ลองใหม่อีกครั้ง";
    }
  });
  $("btn-signout").addEventListener("click", () => A.signOut(auth));
  A.getRedirectResult(auth).catch(() => {});

  A.onAuthStateChanged(auth, (u) => { user = u; $("acc-err").textContent = ""; paintAccount(); if (!u) list.innerHTML = ""; });

  // the header button reveals the history tab (first in the tab bar) and opens it; cards reload on each open
  $("btn-history").addEventListener("click", () => {
    if (!user) return;
    histTab.hidden = false; window.SmashLab.showTab("history");
    histTab.scrollIntoView({ block: "nearest", inline: "nearest" });
    load();
  });
  histTab.addEventListener("click", () => { if (user) load(); });

  document.addEventListener("smashlab:result", (e) => { hasResult = !!(e.detail && e.detail.has); seq++; paintSave(); });

  saveBtn.addEventListener("click", async () => {
    const r = window.SmashLab && window.SmashLab.result();
    if (!user || !r) return;
    saveBtn.disabled = true;
    try {
      await F.addDoc(col(), { createdAt: F.serverTimestamp(), view: r.view, src: r.src, hand: r.hand, contactT: r.contactT, rows: r.rows, scores: r.scores });
      savedFor = seq; paintSave(); say("");
    } catch (e) { saveBtn.disabled = false; say("บันทึกไม่สำเร็จ ตรวจการเชื่อมต่อแล้วลองใหม่"); }
  });

  async function load() {
    say("กำลังโหลดประวัติ…");
    try {
      const snap = await F.getDocs(F.query(col(), F.orderBy("createdAt", "desc"), F.limit(30)));
      list.innerHTML = snap.docs.map(item).join("");
      say(snap.empty ? "ยังไม่มีผลที่บันทึกไว้ วิเคราะห์คลิปหรือภาพ แล้วกด “บันทึกผล”" : "");
    } catch (e) { say("โหลดประวัติไม่สำเร็จ"); }
  }
  function item(d) {
    const r = d.data(), when = r.createdAt ? r.createdAt.toDate() : new Date();
    const n = { g: 0, m: 0, b: 0 }; (r.rows || []).forEach((x) => { if (n[x.s] != null) n[x.s]++; });
    const date = when.toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
    return `<li class="hist-item"><article class="hist-card"><header><span class="hist-when">${esc(date)}</span><span class="hist-meta">${esc(VIEW[r.view] || "")} · ${esc(SRC[r.src] || "")}${r.contactT != null ? ` · กระทบ ${r.contactT} วิ` : ""}</span></header>`
      + `<span class="hist-count"><span class="pill g">ดี ${n.g}</span><span class="pill m">พอใช้ ${n.m}</span><span class="pill b">ควรแก้ ${n.b}</span></span>`
      + `<ul class="hist-rows">${(r.rows || []).map((x) => `<li><span>${esc(x.n)}</span><span class="mono">${esc(x.v)}</span><span class="pill ${esc(x.s)}">${VERDICT[x.s] || ""}</span></li>`).join("")}</ul>`
      + `<button type="button" class="ghost hist-del" data-id="${esc(d.id)}">ลบรายการนี้</button></article></li>`;
  }
  list.addEventListener("click", async (e) => {
    const b = e.target.closest(".hist-del"); if (!b || !user) return;
    if (!b.dataset.armed) { b.dataset.armed = "1"; b.textContent = "กดอีกครั้งเพื่อยืนยันลบ"; return; }
    b.disabled = true;
    try { await F.deleteDoc(F.doc(db, "users", user.uid, "results", b.dataset.id)); b.closest(".hist-item").remove(); if (!list.children.length) say("ยังไม่มีผลที่บันทึกไว้"); }
    catch (err) { b.disabled = false; say("ลบไม่สำเร็จ ลองใหม่อีกครั้ง"); }
  });
}
