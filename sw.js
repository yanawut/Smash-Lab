/* Smash Lab service worker: caches the app shell and pose model for offline use.
   Bump VERSION whenever you change any cached file so users get the update. */
const VERSION = "smashlab-v18";
const CORE = [
  "./",
  "index.html",
  "css/style.css",
  "js/app.js",
  "vendor/tf.min.js",
  "models/movenet-lightning.json",
  "models/movenet-lightning.bin",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "audio/ch-0.mp3",
  "audio/ch-1.mp3",
  "audio/ch-2.mp3",
  "audio/ch-3.mp3",
  "audio/ch-4.mp3",
  "audio/ch-5.mp3",
  "audio/ch-6.mp3",
  "audio/ch-7.mp3",
  "audio/n-intro.mp3",
  "audio/n-m_setp.mp3",
  "audio/n-m_throw.mp3",
  "audio/n-m_seq.mp3",
  "audio/n-m_torso.mp3",
  "audio/n-m_gaze.mp3",
  "audio/n-m_elbow.mp3",
  "audio/n-v_g.mp3",
  "audio/n-v_m.mp3",
  "audio/n-v_b.mp3",
  "audio/n-v_n.mp3",
  "audio/n-t_setp_early.mp3",
  "audio/n-t_setp_late.mp3",
  "audio/n-t_throw.mp3",
  "audio/n-t_seq.mp3",
  "audio/n-t_torso_open.mp3",
  "audio/n-t_torso_rot.mp3",
  "audio/n-t_gaze.mp3",
  "audio/n-t_elbow.mp3",
  "audio/n-first.mp3",
  "audio/n-allgood.mp3",
  "audio/n-end.mp3"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.protocol === "blob:" || url.protocol === "data:") return;

  // Pages: network first so updates show up, cache as fallback when offline
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { caches.open(VERSION).then((c) => c.put("index.html", res.clone())); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // Google Fonts: serve cached copy, refresh in background
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(VERSION).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  // Same-origin files (code, model, icons): cache first
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) caches.open(VERSION).then((c) => c.put(req, res.clone()));
        return res;
      }))
    );
  }
});
