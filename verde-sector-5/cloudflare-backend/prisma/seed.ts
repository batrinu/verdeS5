import { PrismaClient } from '../src/generated/prisma';

declare const process: any;

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Verde în Sectorul 5 database...');

  // 1. Create Admin & Citizen Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sector5.ro' },
    update: {},
    create: {
      email: 'admin@sector5.ro',
      passwordHash: '$2a$10$DemoHashPasswordForCityCouncilPitch',
      name: 'Primăria Sector 5 - Administrare Domeniu Public',
      role: 'ADMIN',
      neighborhood: 'RAHOVA',
      phone: '+40213055500',
    },
  });

  const citizen = await prisma.user.upsert({
    where: { email: 'elena.popa@gmail.com' },
    update: {},
    create: {
      email: 'elena.popa@gmail.com',
      passwordHash: '$2a$10$DemoHashPasswordForCityCouncilPitch',
      name: 'Elena Popa',
      role: 'CITIZEN',
      neighborhood: 'COTROCENI',
      phone: '+40722123456',
    },
  });

  // 2. Seed Neighborhood Stats
  const neighborhoods = [
    { neighborhood: 'Cotroceni', totalTrees: 145, adoptedTrees: 112, wateringsCount: 340, ecoPoints: 17000 },
    { neighborhood: 'Rahova', totalTrees: 210, adoptedTrees: 95, wateringsCount: 220, ecoPoints: 11000 },
    { neighborhood: 'Ferentari', totalTrees: 180, adoptedTrees: 78, wateringsCount: 195, ecoPoints: 9750 },
    { neighborhood: 'Sebastian', totalTrees: 130, adoptedTrees: 85, wateringsCount: 260, ecoPoints: 13000 },
    { neighborhood: 'Izvor', totalTrees: 95, adoptedTrees: 62, wateringsCount: 180, ecoPoints: 9000 },
  ];

  for (const stat of neighborhoods) {
    await prisma.neighborhoodStats.upsert({
      where: { neighborhood: stat.neighborhood },
      update: stat,
      create: stat,
    });
  }

  // 3. Seed Realistic Trees Across Sector 5
  const sampleTrees = [
    // Cotroceni
    { species: 'LIME', latitude: 44.4332, longitude: 26.0715, neighborhood: 'Cotroceni', healthStatus: 'EXCELLENT', nickname: 'Teiul lui Dr. Lister', isAdopted: true, adopterName: 'Elena Popa' },
    { species: 'MAPLE', latitude: 44.4345, longitude: 26.0730, neighborhood: 'Cotroceni', healthStatus: 'GOOD', nickname: 'Arțarul Elefterie', isAdopted: true, adopterName: 'Mihai Ionescu' },
    { species: 'OAK', latitude: 44.4320, longitude: 26.0742, neighborhood: 'Cotroceni', healthStatus: 'NEEDS_WATER', nickname: null, isAdopted: false, adopterName: null },
    { species: 'CHESTNUT', latitude: 44.4310, longitude: 26.0708, neighborhood: 'Cotroceni', healthStatus: 'GOOD', nickname: 'Castanul Carol', isAdopted: false, adopterName: null },

    // Rahova
    { species: 'LIME', latitude: 44.4175, longitude: 26.0680, neighborhood: 'Rahova', healthStatus: 'NEEDS_WATER', nickname: null, isAdopted: false, adopterName: null },
    { species: 'POPLAR', latitude: 44.4190, longitude: 26.0652, neighborhood: 'Rahova', healthStatus: 'ATTENTION_REQUIRED', nickname: null, isAdopted: false, adopterName: null },
    { species: 'OAK', latitude: 44.4162, longitude: 26.0701, neighborhood: 'Rahova', healthStatus: 'EXCELLENT', nickname: 'Stejarul Rahova 1', isAdopted: true, adopterName: 'Andrei Stanciu' },
    { species: 'BIRCH', latitude: 44.4182, longitude: 26.0624, neighborhood: 'Rahova', healthStatus: 'NEEDS_WATER', nickname: null, isAdopted: false, adopterName: null },

    // Ferentari
    { species: 'WILLOW', latitude: 44.4021, longitude: 26.0745, neighborhood: 'Ferentari', healthStatus: 'GOOD', nickname: 'Salcia Vadul Nou', isAdopted: true, adopterName: 'Cristian Dan' },
    { species: 'LIME', latitude: 44.4055, longitude: 26.0782, neighborhood: 'Ferentari', healthStatus: 'NEEDS_WATER', nickname: null, isAdopted: false, adopterName: null },
    { species: 'MAPLE', latitude: 44.4010, longitude: 26.0712, neighborhood: 'Ferentari', healthStatus: 'ATTENTION_REQUIRED', nickname: null, isAdopted: false, adopterName: null },

    // Sebastian
    { species: 'CHESTNUT', latitude: 44.4267, longitude: 26.0812, neighborhood: 'Sebastian', healthStatus: 'EXCELLENT', nickname: 'Castanul Sebastian', isAdopted: true, adopterName: 'Ana Maria' },
    { species: 'OAK', latitude: 44.4278, longitude: 26.0825, neighborhood: 'Sebastian', healthStatus: 'GOOD', nickname: 'Stejarul din Parc', isAdopted: true, adopterName: 'Victor Radu' },
    { species: 'SPRUCE', latitude: 44.4250, longitude: 26.0840, neighborhood: 'Sebastian', healthStatus: 'NEEDS_WATER', nickname: null, isAdopted: false, adopterName: null },

    // Izvor
    { species: 'LIME', latitude: 44.4312, longitude: 26.0885, neighborhood: 'Izvor', healthStatus: 'EXCELLENT', nickname: 'Teiul de pe Splai', isAdopted: true, adopterName: 'Daria M.' },
    { species: 'MAPLE', latitude: 44.4301, longitude: 26.0862, neighborhood: 'Izvor', healthStatus: 'GOOD', nickname: null, isAdopted: false, adopterName: null },
  ];

  for (const treeData of sampleTrees) {
    await prisma.tree.create({
      data: {
        species: treeData.species,
        latitude: treeData.latitude,
        longitude: treeData.longitude,
        neighborhood: treeData.neighborhood,
        healthStatus: treeData.healthStatus,
        nickname: treeData.nickname,
        adoptedById: treeData.isAdopted ? citizen.id : null,
        adoptionDate: treeData.isAdopted ? new Date() : null,
        notes: `Arbore înregistrat în cartierul ${treeData.neighborhood}`,
        photos: JSON.stringify([]),
      },
    });
  }

  // 4. Seed Care Alerts
  await prisma.careAlert.createMany({
    data: [
      {
        neighborhood: 'Rahova',
        alertType: 'HEATWAVE_DRYNESS',
        message: 'Alerte Caniculă: 15 tei tineri pe Calea Rahovei necesită udare de urgență (15L/copac).',
        status: 'ACTIVE',
      },
      {
        neighborhood: 'Ferentari',
        alertType: 'YOUNG_TREE_WATERING',
        message: 'Campanie de udat arborii proaspăt plantați pe Strada Vadul Nou.',
        status: 'ACTIVE',
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    (process as any).exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
