npm i -D prisma <br>
npm i @prisma/client<br>
npx prisma init<br>

Setup Database .env

package json scripts

```json
    "prisma:init": "prisma init",
    "prisma:sync": "prisma db pull",
    "prisma:generate": "prisma generate"
```

query running pada terminal `npm run prisma:`<br>

**Step clone db ke vscode**

step 1. npm run prisma:generate

step 2. npm run prisma:sync<br>

Template model dan relasi<br>

```sql
model User {
  id      Int     @id
  name    String? @db.VarChar(250)
  age     String? @db.VarChar(250)
  alamat  String? @db.VarChar(250)
  profile Profile[] / definisi dari relasi table
}

model Profile {
  id       Int    @id
  biograpy String
  userId   Int    @unique
  user     User   @relation(fields: [userId], references: [id], onUpdate:Cascade, onDelete:Cascade )
}
```

tanda ? = Opsional pengisian data<br>
tanda [] = Bidang daftar data table<br>
onUpdate and onDelete = perubahan di data utama dan data pada relasi<br>

**step membuat migrasi dan push model ke database**

step 1. npx prisma migrate dev => name_migrasi = migrasi table<br>
step 2. npx prisma db push = upload table
