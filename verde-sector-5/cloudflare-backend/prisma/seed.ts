import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sector5.ro' },
    update: {},
    create: {
      email: 'admin@sector5.ro',
      passwordHash: '$2a$10$YourHashedPasswordHere', // Will be replaced with actual hash
      name: 'Administrator Sector 5',
      role: 'ADMIN',
      phone: '+40700000000',
    },
  });

  // Create field worker users
  const fieldWorkers = [
    {
      email: 'worker1@sector5.ro',
      name: 'Ion Popescu',
      neighborhood: 'GIULESTI',
    },
    {
      email: 'worker2@sector5.ro',
      name: 'Maria Ionescu',
      neighborhood: 'RAHOVA',
    },
    {
      email: 'worker3@sector5.ro',
      name: 'Andrei Dumitrescu',
      neighborhood: 'DRUMUL_TABEREI',
    },
  ];

  for (const worker of fieldWorkers) {
    await prisma.user.upsert({
      where: { email: worker.email },
      update: {},
      create: {
        email: worker.email,
        passwordHash: '$2a$10$YourHashedPasswordHere',
        name: worker.name,
        role: 'FIELD_WORKER',
        neighborhood: worker.neighborhood as any,
        phone: '+40700000001',
      },
    });
  }

  // Create sample citizen user
  const citizen = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      email: 'citizen@example.com',
      passwordHash: '$2a$10$YourHashedPasswordHere',
      name: 'Cetățean Demo',
      role: 'CITIZEN',
      neighborhood: 'FERENTARI',
      phone: '+40700000002',
    },
  });

  // Create green spaces
  const park = await prisma.greenSpace.upsert({
    where: { name: 'Parcul Sebastian' },
    update: {},
    create: {
      name: 'Parcul Sebastian',
      type: 'PARK',
      location: JSON.stringify([[44.4267, 26.0812], [44.4277, 26.0812], [44.4277, 26.0822], [44.4267, 26.0822]]),
      area: 15000.5,
      description: 'Park în cartierul Sebastian',
      address: 'Bulevardul Sebastian, Sector 5',
    },
  });

  // Create sample trees
  await prisma.tree.createMany({
    data: [
      {
        species: 'LIME',
        latitude: 44.4267,
        longitude: 26.0812,
        healthStatus: 'GOOD',
        plantingDate: new Date('2024-03-15'),
        greenSpaceId: park.id,
        notes: 'Tei sănătos, plantat în 2024',
        photos: JSON.stringify([]),
      },
      {
        species: 'OAK',
        latitude: 44.4270,
        longitude: 26.0815,
        healthStatus: 'EXCELLENT',
        plantingDate: new Date('2023-10-20'),
        greenSpaceId: park.id,
        notes: 'Stejar viguros',
        photos: JSON.stringify([]),
      },
      {
        species: 'MAPLE',
        latitude: 44.4275,
        longitude: 26.0818,
        healthStatus: 'FAIR',
        notes: 'Arțar care necesită îngrijire',
        photos: JSON.stringify([]),
      },
    ],
  });

  // Create sample reports
  await prisma.report.createMany({
    data: [
      {
        userId: citizen.id,
        issueType: 'FALLEN_TREE',
        description: 'Copac căzut pe carosabil după furtună',
        latitude: 44.4280,
        longitude: 26.0825,
        address: 'Strada Ferentari nr. 10',
        photos: JSON.stringify(['photo1.jpg']),
        status: 'SUBMITTED',
        priority: 'URGENT',
        trackingNumber: `VS5-${Date.now()}-1`,
      },
      {
        userId: citizen.id,
        issueType: 'BROKEN_BRANCHES',
        description: 'Crengi rupte atârnă periculos',
        latitude: 44.4285,
        longitude: 26.0830,
        address: 'Bulevardul Rahova nr. 50',
        photos: JSON.stringify(['photo2.jpg']),
        status: 'UNDER_REVIEW',
        priority: 'HIGH',
        trackingNumber: `VS5-${Date.now()}-2`,
      },
      {
        userId: citizen.id,
        issueType: 'EMPTY_PIT',
        description: 'Groapă goală pentru plantare',
        latitude: 44.4290,
        longitude: 26.0835,
        address: 'Strada 13 Septembrie nr. 25',
        photos: JSON.stringify([]),
        status: 'SUBMITTED',
        priority: 'LOW',
        trackingNumber: `VS5-${Date.now()}-3`,
      },
    ],
  });

  // Create planting campaign
  await prisma.plantingCampaign.create({
    data: {
      name: 'Campania de Plantare Primăvară 2026',
      description: 'Plantare a 500 de arbori în Sectorul 5',
      latitude: 44.4300,
      longitude: 26.0850,
      locationDesc: 'Diverse locații în Sectorul 5',
      species: JSON.stringify(['LIME', 'OAK', 'MAPLE', 'CHESTNUT']),
      numberOfTrees: 500,
      treesPlanted: 150,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-05-31'),
      status: 'ONGOING',
      budget: 250000.0,
      responsibleId: admin.id,
      photos: JSON.stringify([]),
      notes: 'Campanie anuală de împădurire',
    },
  });

  console.log('Seeding completed successfully!');
  console.log(`Created admin: ${admin.email}`);
  console.log(`Created ${fieldWorkers.length} field workers`);
  console.log(`Created citizen: ${citizen.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
