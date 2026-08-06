-- Seed data for Verde în Sectorul 5 (Local D1 Database)

-- Users (password: password123)
INSERT OR REPLACE INTO users (id, email, passwordHash, name, role, phone, neighborhood, createdAt, updatedAt) VALUES
('usr_admin_1', 'admin@sector5.ro', 'fab4dc31f323e3465dfbf1f2cdab0a2e:9a0b2c02a90faf7fc39fc172c79ef24191921ab8747d452c52b26e08b5bea38a', 'Administrator Sector 5', 'ADMIN', '+40700000000', 'RAHOVA', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('usr_citizen_1', 'citizen@example.com', 'fab4dc31f323e3465dfbf1f2cdab0a2e:9a0b2c02a90faf7fc39fc172c79ef24191921ab8747d452c52b26e08b5bea38a', 'Elena Radu', 'CITIZEN', '+40722111222', 'FERENTARI', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('usr_worker_1', 'worker1@sector5.ro', 'fab4dc31f323e3465dfbf1f2cdab0a2e:9a0b2c02a90faf7fc39fc172c79ef24191921ab8747d452c52b26e08b5bea38a', 'Ion Popescu', 'FIELD_WORKER', '+40733333444', 'GIULESTI', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('usr_worker_2', 'worker2@sector5.ro', 'fab4dc31f323e3465dfbf1f2cdab0a2e:9a0b2c02a90faf7fc39fc172c79ef24191921ab8747d452c52b26e08b5bea38a', 'Maria Ionescu', 'FIELD_WORKER', '+40744555666', 'RAHOVA', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');

-- Green Spaces in Sector 5
INSERT OR REPLACE INTO green_spaces (id, name, type, location, area, description, address, createdAt, updatedAt) VALUES
('gs_seb', 'Parcul Sebastian', 'PARK', '[[44.4267, 26.0812], [44.4277, 26.0812], [44.4277, 26.0822], [44.4267, 26.0822]]', 18500.0, 'Parc principal din zona Sebastian cu vegetație matură și teren de joacă.', 'Bulevardul Sebastian, Sector 5', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('gs_izv', 'Parcul Izvor', 'PARK', '[[44.4320, 26.0890], [44.4350, 26.0890], [44.4350, 26.0930], [44.4320, 26.0930]]', 60000.0, 'Parc întins în apropierea Palatului Parlamentului.', 'Bulevardul Națiunile Unite, Sector 5', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('gs_rom', 'Parcul Romniceanu', 'PARK', '[[44.4290, 26.0720], [44.4310, 26.0720], [44.4310, 26.0740], [44.4290, 26.0740]]', 12000.0, 'Parc pe colină în cartierul Cotroceni / 13 Septembrie.', 'Strada Mihail Cioranu, Sector 5', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('gs_hum', 'Parcul Humulești', 'PARK', '[[44.4050, 26.0780], [44.4070, 26.0780], [44.4070, 26.0800], [44.4050, 26.0800]]', 8500.0, 'Zona verde urbană în cartierul Rahova/Ferentari.', 'Strada Humulești, Sector 5', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');

-- Trees
INSERT OR REPLACE INTO trees (id, species, speciesOther, latitude, longitude, plantingDate, height, trunkDiameter, healthStatus, greenSpaceId, notes, photos, neighborhood, nickname, lastWateredAt, createdAt, updatedAt) VALUES
('tr_1', 'LIME', NULL, 44.4268, 26.0814, '2022-04-10T00:00:00.000Z', 8.5, 25.0, 'EXCELLENT', 'gs_seb', 'Tei argintiu îngrijit periodic.', '[]', 'SEBASTIAN', 'Teiul Sebastian', '2026-08-05T12:00:00.000Z', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_2', 'OAK', NULL, 44.4272, 26.0818, '2020-11-15T00:00:00.000Z', 12.0, 40.0, 'GOOD', 'gs_seb', 'Stejar roșu matur.', '[]', 'SEBASTIAN', 'Stejarul din Parc', '2026-08-04T10:00:00.000Z', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_3', 'MAPLE', NULL, 44.4275, 26.0820, '2023-03-20T00:00:00.000Z', 6.0, 18.0, 'FAIR', 'gs_seb', 'Arțar american, necesită toaletare.', '[]', 'SEBASTIAN', NULL, NULL, '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_4', 'CHESTNUT', NULL, 44.4330, 26.0905, '2018-05-01T00:00:00.000Z', 14.0, 55.0, 'GOOD', 'gs_izv', 'Castan ornamental de talie mare.', '[]', 'IZVOR', 'Castanul Izvor', '2026-08-05T08:00:00.000Z', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_5', 'BIRCH', NULL, 44.4335, 26.0915, '2024-03-25T00:00:00.000Z', 4.5, 12.0, 'EXCELLENT', 'gs_izv', 'Mesteacăn tânăr plantat recent.', '[]', 'IZVOR', NULL, NULL, '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_6', 'ASH', NULL, 44.4295, 26.0725, '2021-09-12T00:00:00.000Z', 9.0, 30.0, 'GOOD', 'gs_rom', 'Frasin pe aleea principală.', '[]', 'COTROCENI', 'Frasinul Romniceanu', '2026-08-03T15:00:00.000Z', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_7', 'WILLOW', NULL, 44.4060, 26.0785, '2019-04-18T00:00:00.000Z', 11.0, 45.0, 'POOR', 'gs_hum', 'Salcie plângătoare, uscături la bază.', '[]', 'FERENTARI', NULL, NULL, '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('tr_8', 'PINE', NULL, 44.4250, 26.0790, '2023-11-05T00:00:00.000Z', 5.0, 15.0, 'EXCELLENT', NULL, 'Pin negru aliniament stradal Rahova.', '[]', 'RAHOVA', 'Pinul Rahova', '2026-08-05T09:00:00.000Z', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');

-- Care Alerts
INSERT OR REPLACE INTO care_alerts (id, neighborhood, alertType, message, status, createdAt) VALUES
('alert_1', 'Rahova', 'HEATWAVE_DRYNESS', 'Alerte Caniculă: 15 tei tineri pe Calea Rahovei necesită udare de urgență (15L/copac).', 'ACTIVE', '2026-08-05T08:00:00.000Z'),
('alert_2', 'Ferentari', 'YOUNG_TREE_WATERING', 'Campanie de udat arborii proaspăt plantați pe Strada Vadul Nou.', 'ACTIVE', '2026-08-04T10:00:00.000Z');

-- Neighborhood Stats
INSERT OR REPLACE INTO neighborhood_stats (id, neighborhood, totalTrees, adoptedTrees, wateringsCount, ecoPoints, updatedAt) VALUES
('stat_1', 'Cotroceni', 145, 112, 340, 17000, '2026-08-05T00:00:00.000Z'),
('stat_2', 'Sebastian', 130, 85, 260, 13000, '2026-08-05T00:00:00.000Z'),
('stat_3', 'Rahova', 210, 95, 220, 11000, '2026-08-05T00:00:00.000Z'),
('stat_4', 'Ferentari', 180, 78, 195, 9750, '2026-08-05T00:00:00.000Z'),
('stat_5', 'Izvor', 95, 62, 180, 9000, '2026-08-05T00:00:00.000Z');

-- Reports
INSERT OR REPLACE INTO reports (id, userId, issueType, description, latitude, longitude, address, photos, status, priority, trackingNumber, updatedAt, submittedAt) VALUES
('rep_1', 'usr_citizen_1', 'FALLEN_TREE', 'Copac prăbușit parțial pe aleea de acces după vijelie.', 44.4270, 26.0815, 'Parcul Sebastian - Aleea Centrală', '[]', 'IN_PROGRESS', 'URGENT', 'VS5-2026-001', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('rep_2', 'usr_citizen_1', 'BROKEN_BRANCHES', 'Creangă groasă ruptă atârnă deasupra trotuarului.', 44.4220, 26.0750, 'Calea Rahovei nr. 180', '[]', 'SUBMITTED', 'HIGH', 'VS5-2026-002', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('rep_3', 'usr_citizen_1', 'DISEASED', 'Copac cu semne vizibile de dăunători și frunze uscate.', 44.4150, 26.0820, 'Strada Ferentari nr. 45', '[]', 'RESOLVED', 'MEDIUM', 'VS5-2026-003', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('rep_4', 'usr_citizen_1', 'EMPTY_PIT', 'Alveolă goală pe trotuar ce poate fi reutilizată.', 44.4300, 26.0710, 'Strada 13 Septembrie nr. 90', '[]', 'SUBMITTED', 'LOW', 'VS5-2026-004', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');

-- Planting Campaigns
INSERT OR REPLACE INTO planting_campaigns (id, name, description, latitude, longitude, locationDesc, species, numberOfTrees, treesPlanted, startDate, endDate, status, budget, responsibleId, photos, notes, createdAt, updatedAt) VALUES
('cmp_1', 'Campania Verde Primăvara 2026', 'Marea campanie de împădurire urbană în cartierele Rahova și Ferentari.', 44.4180, 26.0790, 'Parcurile și aliniamentele stradale din Sectorul 5', '["LIME", "OAK", "MAPLE", "CHESTNUT"]', 500, 240, '2026-03-01T00:00:00.000Z', '2026-05-31T00:00:00.000Z', 'ONGOING', 250000.0, 'usr_admin_1', '[]', 'Voluntari bineveniți în fiecare weekend!', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z'),
('cmp_2', 'Adoptă un Stejar - Ediția de Toamnă', 'Campanie dedicată plantarilor de stejari și tei în spațiile verzi școlare.', 44.4290, 26.0730, 'Curțile școlilor și liceelor din Sectorul 5', '["OAK", "LIME"]', 200, 0, '2026-10-01T00:00:00.000Z', '2026-11-30T00:00:00.000Z', 'PLANNED', 100000.0, 'usr_admin_1', '[]', 'În parteneriat cu unitățile de învățământ.', '2026-08-05T00:00:00.000Z', '2026-08-05T00:00:00.000Z');
