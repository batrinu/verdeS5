-- Demo data for the pitch (spec §8). Fictional sponsors, labeled in UI.
--
-- FK ids verified against migrations/0002_seed.sql (2026-08-06):
--   * Real citizen: usr_citizen_1 (citizen@example.com, "Elena Radu") — used
--     for the "elena" backfill persona instead of the brief's placeholder
--     `user-citizen-elena`. 0002 seeds only one citizen, so `usr_citizen_2`
--     ("Mihai") is inserted below as a minimal fallback for the second,
--     higher-score demo persona, reusing usr_citizen_1's passwordHash so the
--     known demo password keeps working for both.
--   * Real trees: gs_seb (Parcul Sebastian) has tr_1..tr_3; gs_izv (Parcul
--     Izvor) has tr_4..tr_5. The brief's placeholder ids (`tree-izv-1..5`,
--     `tree-seb-1..5`) assumed 5 trees per park; only what actually exists
--     is attached below — no fabricated tree rows needed.
--   * Real campaign: resolved via subquery (unchanged from brief), no id
--     correction needed.

INSERT INTO sponsors (id, name, slug, tier, description, website) VALUES
  ('sponsor-solaris', 'Solaris Energia', 'solaris-energia', 'GOLD',
   'Sponsor demonstrativ — companie fictivă de energie regenerabilă. Susține campania „Augustul Udărilor" și crângul Solaris.', 'https://example.com/solaris'),
  ('sponsor-panifica', 'Panifica București', 'panifica-bucuresti', 'SILVER',
   'Sponsor demonstrativ — brutărie fictivă de cartier. Sponsorizează Crângul Sebastian.', 'https://example.com/panifica'),
  ('sponsor-bicicleta', 'Bicicleta Albastră', 'bicicleta-albastra', 'BRONZE',
   'Sponsor demonstrativ — magazin fictiv de biciclete. Contribuie la fondul de recompense.', 'https://example.com/bicicleta');

INSERT INTO groves (id, name, description, sponsorId) VALUES
  ('grove-solaris', 'Crângul Solaris — Parcul Izvor', 'Aliniament susținut de Solaris Energia (demo).', 'sponsor-solaris'),
  ('grove-sebastian', 'Crângul Sebastian', 'Zona de nord a Parcului Sebastian, susținută de Panifica București (demo).', 'sponsor-panifica');

-- Attach existing seeded trees to groves (real ids from 0002_seed.sql:
-- gs_izv only has tr_4/tr_5, gs_seb only has tr_1/tr_2/tr_3).
UPDATE trees SET groveId = 'grove-solaris'  WHERE id IN ('tr_4','tr_5');
UPDATE trees SET groveId = 'grove-sebastian' WHERE id IN ('tr_1','tr_2','tr_3');

INSERT INTO rewards (id, title, description, merchantName, sponsorId, costPoints, stock) VALUES
  ('reward-sac-udare', 'Sac de udare lentă (Tree Gator)', 'Kit care udă copacul 6–8 ore. Ridicare de la sediul Primăriei.', 'Primăria Sectorului 5', NULL, 400, 20),
  ('reward-voucher-paine', 'Voucher 20 lei — Panifica', 'Reducere la orice produs de panificație.', 'Panifica București', 'sponsor-panifica', 300, 30),
  ('reward-service-bicicleta', 'Revizie gratuită bicicletă', 'Verificare completă la Bicicleta Albastră.', 'Bicicleta Albastră', 'sponsor-bicicleta', 500, 10),
  ('reward-bilet-gradina', 'Bilet Grădina Botanică', 'Intrare gratuită pentru doi.', 'Grădina Botanică', NULL, 250, 40),
  ('reward-manusi', 'Set mănuși + unelte de grădinărit', 'Pentru gardienii care plantează.', 'Primăria Sectorului 5', NULL, 350, 15),
  ('reward-workshop', 'Atelier de îngrijire a copacilor', 'Instruire cu peisagiștii primăriei — pas spre Super-Gardian.', 'Primăria Sectorului 5', 'sponsor-solaris', 600, 12);

INSERT INTO challenges (id, name, description, metric, goal, startsAt, endsAt, sponsorId) VALUES
  ('challenge-august-2026', 'Augustul Udărilor',
   '500 de udări în tot Sectorul 5 în luna august. Cartierul câștigător primește un micro-grant pentru un proiect verde.',
   'WATERINGS', 500, '2026-08-01T00:00:00Z', '2026-08-31T23:59:59Z', 'sponsor-solaris');

-- Minimal fallback citizen: 0002_seed.sql only seeds one citizen
-- (usr_citizen_1 / Elena). Reuse her passwordHash so the demo login
-- password keeps working for this second persona too.
INSERT OR REPLACE INTO users (id, email, passwordHash, name, role, phone, neighborhood, createdAt, updatedAt) VALUES
  ('usr_citizen_2', 'mihai@example.com',
   'fab4dc31f323e3465dfbf1f2cdab0a2e:9a0b2c02a90faf7fc39fc172c79ef24191921ab8747d452c52b26e08b5bea38a',
   'Mihai Vasilescu', 'CITIZEN', '+40722999888', 'GIULESTI', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');

-- Care history so leaderboards/levels look alive (spec §8).
-- usr_citizen_1 = Elena Radu (real, from 0002_seed.sql); usr_citizen_2 = Mihai (inserted above).
INSERT INTO points_events (id, userId, action, points, refType, createdAt) VALUES
  ('pe-elena-1', 'usr_citizen_1', 'WATERING', 550, 'BACKFILL', datetime('now', '-20 days')),
  ('pe-elena-2', 'usr_citizen_1', 'CAMPAIGN_JOIN', 100, 'BACKFILL', datetime('now', '-12 days')),
  ('pe-elena-3', 'usr_citizen_1', 'WATERING', 150, 'BACKFILL', datetime('now', '-2 days')),
  ('pe-mihai-1', 'usr_citizen_2', 'WATERING', 2100, 'BACKFILL', datetime('now', '-40 days')),
  ('pe-mihai-2', 'usr_citizen_2', 'WATERING', 250, 'BACKFILL', datetime('now', '-5 days'));
UPDATE users SET pointsBalance = 800,  careScore = 800  WHERE id = 'usr_citizen_1';
UPDATE users SET pointsBalance = 2350, careScore = 2350 WHERE id = 'usr_citizen_2';

-- Tree ids matched to real seeded trees by species where possible
-- (tr_1 = LIME/Tei, tr_4 = CHESTNUT/Castan, tr_2 = OAK/Stejar).
INSERT INTO tree_messages (id, treeId, text, createdAt) VALUES
  ('tm-1', 'tr_1', 'Mulțumesc pentru apă! Pe căldura asta, orice strop contează. — Teiul de pe Splai', datetime('now', '-2 days')),
  ('tm-2', 'tr_4', 'Uf, chiar aveam nevoie! Cei 15 litri m-au salvat de arșiță. — Castanul Sebastian', datetime('now', '-1 days')),
  ('tm-3', 'tr_2', 'Începeam să mă usuc — mulțumesc pentru cei 10 litri! — Stejarul Parlamentului', datetime('now', '-6 hours'));

-- Gold tier (spec §4.1): anchor sponsor underwrites a campaign. Resolved via
-- subquery against real planting_campaigns rows from 0002_seed.sql (cmp_1).
UPDATE planting_campaigns SET sponsorId = 'sponsor-solaris'
WHERE id = (SELECT id FROM planting_campaigns ORDER BY createdAt LIMIT 1);
