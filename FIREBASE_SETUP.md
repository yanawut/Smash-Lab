# ตั้งค่า Firebase สำหรับเข้าสู่ระบบด้วย Google และบันทึกประวัติผลวิเคราะห์

ทำครั้งเดียว ใช้เวลาประมาณ 10 นาที ระหว่างที่ยังไม่ได้ใส่ค่า `js/firebase-config.js` เว็บจะทำงานเหมือนเดิมและซ่อนปุ่มเข้าสู่ระบบไว้

## 1. สร้างโปรเจกต์
1. เปิด https://console.firebase.google.com แล้วกด **Create a project** (ตั้งชื่อเช่น `smash-lab`) ปิด Google Analytics ได้

## 2. เพิ่มเว็บแอปและคัดลอกค่า config
1. ในหน้าโปรเจกต์ กดไอคอน **</>** (Web) ตั้งชื่อแอป ไม่ต้องเลือก Hosting
2. คัดลอกค่าใน `firebaseConfig` ไปใส่แทน `null` ใน `js/firebase-config.js`
   ค่าเหล่านี้เป็นตัวระบุสาธารณะ ไม่ใช่รหัสลับ การป้องกันข้อมูลทำโดย `firestore.rules`

## 3. เปิดการเข้าสู่ระบบด้วย Google
1. **Build → Authentication → Get started → Sign-in method → Google → Enable** ใส่อีเมลติดต่อ แล้วบันทึก
2. **Authentication → Settings → Authorized domains** เพิ่ม `smash-lab.yanawutchaiyo.workers.dev` (`localhost` มีอยู่แล้ว)

## 4. สร้างฐานข้อมูล Firestore และตั้งกฎ
1. **Build → Firestore Database → Create database** เลือกตำแหน่ง `asia-southeast1` (สิงคโปร์) และ **production mode**
2. แท็บ **Rules** วางเนื้อหาจากไฟล์ `firestore.rules` ในโปรเจกต์นี้ แล้วกด **Publish**
3. ครั้งแรกที่เปิดประวัติ ถ้า console แจ้งให้สร้าง index ไม่ต้องทำ เพราะเรียงตาม `createdAt` อย่างเดียว

## เก็บอะไรบ้าง
- `users/{uid}/results/{id}`: วันเวลา, มุมกล้อง, ชนิดไฟล์ (คลิป/ภาพ), มือที่ตี, เวลาจุดกระทบ, ชื่อหัวข้อ + ค่า + ผล (ดี/พอใช้/ควรแก้) และคะแนนที่ใช้ปรับแบบประเมิน
- ไม่เก็บวิดีโอหรือภาพ ผู้ใช้ลบรายการของตัวเองได้จากหน้าประวัติ
- ระดับฟรี (Spark) ของ Firebase เพียงพอสำหรับการใช้งานทั่วไป
