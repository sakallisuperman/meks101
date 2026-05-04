# meks101

Türk 101 okey oyununun 3 kişilik 3D varyantı.

## Oyun Kuralları
- 3 oyuncu
- Her oyuncuya 21 taş, başlayana 22 taş
- Yere açılış eşiği: 121 puan
- Tüm taşları perli/serili bitiren kazanır

## Teknik Stack
- Next.js 14 + TypeScript + Tailwind
- React Three Fiber (3D sahne)
- Supabase (auth, DB, realtime - planlanan)
- Vercel (deploy - planlanan)

## Geliştirme

```bash
npm install
npm run dev      # localhost:3000
npm run game     # CLI'da oyun motoru testleri
npm run build    # Production build
```

## Durum
🚧 Geliştirme aşamasında. MVP yol haritası:
- [x] Oyun motoru (deck, dağıtım, per/seri, kurallar)
- [x] 3D sahne kurulumu (masa, taşlar, ışık)
- [ ] Oyuncunun eli (21 taş yelpaze)
- [ ] Sürükle-bırak ile taş sıralama
- [ ] Supabase auth + lobi
- [ ] Realtime multiplayer (3 kişi)
- [ ] Polish ve deploy
