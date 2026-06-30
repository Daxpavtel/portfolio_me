const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require('../config/env');
const Admin = require('../models/Admin.model');
const Project = require('../models/Project.model');
const Skill = require('../models/Skill.model');
const Experience = require('../models/Experience.model');

async function seed() {
  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const existingAdmin = await Admin.findOne({ username: env.ADMIN_USERNAME });
  if (existingAdmin) {
    console.log('Admin user already exists — skipping admin seed');
  } else {
    const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
    await Admin.create({ username: env.ADMIN_USERNAME, passwordHash });
    console.log(`Admin user "${env.ADMIN_USERNAME}" created`);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'AI-Powered News Application',
        description: 'Cross-platform React Native app with authentication, offline reading, bookmarking, cloud sync, and category-based news feeds.',
        longDescription: 'A feature-rich React Native news application with Firebase integration and AWS migration planning. Includes user authentication via Firebase Auth, real-time news feeds categorized by topics, offline reading with local caching, bookmarking with cloud synchronization, and push notifications. The architecture was designed with future AWS migration in mind, replacing Firebase services with AWS Cognito, S3, and EC2.',
        techStack: ['React Native', 'Firebase', 'REST API', 'AWS', 'JavaScript'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/e94560?text=News+App',
        githubUrl: 'https://github.com/Daxpavtel',
        featured: true,
        category: 'mobile',
        order: 1,
      },
      {
        title: 'Firebase to AWS Cloud Migration',
        description: 'Designed and documented a scalable cloud migration strategy replacing Firebase services with AWS infrastructure.',
        longDescription: 'Comprehensive migration plan to transition from Firebase Authentication and Storage to AWS Cognito, S3, EC2, and IAM. Includes secure REST API design, IAM role configuration, EC2 instance setup with auto-scaling, and S3 bucket policy management. Documented step-by-step migration procedure ensuring zero downtime during transition.',
        techStack: ['AWS Cognito', 'EC2', 'S3', 'IAM', 'Node.js'],
        imageUrl: 'https://placehold.co/600x400/16213e/0f3460?text=Cloud+Migration',
        githubUrl: 'https://github.com/Daxpavtel',
        featured: true,
        category: 'backend',
        order: 2,
      },
      {
        title: 'Air Quality Monitoring System',
        description: 'IoT-based environmental monitoring system using Arduino with real-time sensor data display and cloud logging.',
        longDescription: 'Built an IoT-enabled environmental monitoring system using Arduino Uno and multiple sensors (MQ-135, DHT11). Tracks air quality index, humidity, and temperature with real-time LCD display output. Data is logged to the cloud for historical analysis. The system triggers alerts when pollution levels exceed safe thresholds.',
        techStack: ['Arduino', 'C++', 'IoT', 'Sensors', 'Cloud Integration'],
        imageUrl: 'https://placehold.co/600x400/1a1a2e/e94560?text=Air+Quality',
        githubUrl: 'https://github.com/Daxpavtel',
        featured: false,
        category: 'other',
        order: 3,
      },
      {
        title: 'Coffee Shop Website',
        description: 'Responsive frontend website with performance optimization, interactive UI, and mobile-first design.',
        longDescription: 'A fully responsive coffee shop website developed during internship at TechSkill Solution. Features include interactive menu with category filtering, location finder, reservation form, and online ordering UI. Optimized for loading speed with lazy-loaded images, minified assets, and efficient CSS. Built with mobile-first approach ensuring seamless experience across all devices.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        imageUrl: 'https://placehold.co/600x400/16213e/0f3460?text=Coffee+Shop',
        githubUrl: 'https://github.com/Daxpavtel',
        liveUrl: 'https://example.com',
        featured: false,
        category: 'web',
        order: 4,
      },
    ]);
    console.log('Projects seeded');
  } else {
    console.log(`${projectCount} projects already exist — skipping project seed`);
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: 'Python', category: 'backend', proficiency: 85, icon: 'python', order: 1 },
      { name: 'JavaScript', category: 'backend', proficiency: 88, icon: 'js', order: 2 },
      { name: 'TypeScript', category: 'backend', proficiency: 72, icon: 'ts', order: 3 },
      { name: 'Java', category: 'backend', proficiency: 70, icon: 'java', order: 4 },
      { name: 'C', category: 'backend', proficiency: 75, icon: 'c', order: 5 },
      { name: 'C++', category: 'backend', proficiency: 75, icon: 'cpp', order: 6 },
      { name: 'SQL', category: 'database', proficiency: 80, icon: 'sql', order: 1 },
      { name: 'MongoDB', category: 'database', proficiency: 78, icon: 'mongo', order: 2 },
      { name: 'React.js', category: 'frontend', proficiency: 85, icon: 'react', order: 1 },
      { name: 'React Native', category: 'frontend', proficiency: 80, icon: 'rn', order: 2 },
      { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'html', order: 3 },
      { name: 'CSS3', category: 'frontend', proficiency: 90, icon: 'css', order: 4 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 82, icon: 'tailwind', order: 5 },
      { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'node', order: 7 },
      { name: 'Express.js', category: 'backend', proficiency: 82, icon: 'express', order: 8 },
      { name: 'REST APIs', category: 'backend', proficiency: 85, icon: 'rest', order: 9 },
      { name: 'Firebase', category: 'devops', proficiency: 78, icon: 'firebase', order: 1 },
      { name: 'AWS EC2', category: 'devops', proficiency: 70, icon: 'ec2', order: 2 },
      { name: 'AWS S3', category: 'devops', proficiency: 70, icon: 's3', order: 3 },
      { name: 'AWS Cognito', category: 'devops', proficiency: 65, icon: 'cognito', order: 4 },
      { name: 'Git', category: 'tools', proficiency: 85, icon: 'git', order: 1 },
      { name: 'GitHub', category: 'tools', proficiency: 85, icon: 'github', order: 2 },
      { name: 'VS Code', category: 'tools', proficiency: 92, icon: 'vscode', order: 3 },
      { name: 'Postman', category: 'tools', proficiency: 80, icon: 'postman', order: 4 },
      { name: 'Prompt Engineering', category: 'tools', proficiency: 82, icon: 'prompt', order: 5 },
      { name: 'Generative AI', category: 'tools', proficiency: 75, icon: 'genai', order: 6 },
    ]);
    console.log('Skills seeded');
  } else {
    console.log(`${skillCount} skills already exist — skipping skill seed`);
  }

  const experienceCount = await Experience.countDocuments();
  if (experienceCount === 0) {
    await Experience.insertMany([
      {
        role: 'Software Development Intern',
        company: 'SoftCoding Solution',
        location: 'Ahmedabad',
        startDate: new Date('2025-01-01'),
        endDate: null,
        description: 'Built a cross-platform React Native News Application with authentication, offline reading, bookmarking, and push notifications. Worked directly with client feedback to enhance product quality and improved application performance by fixing state management issues.',
        responsibilities: [
          'Built cross-platform React Native News Application',
          'Implemented authentication, offline reading, bookmarking, and push notifications',
          'Improved app performance by fixing state management issues',
          'Worked directly with client feedback to enhance product quality',
        ],
        type: 'internship',
        order: 1,
      },
      {
        role: 'Frontend Development Intern',
        company: 'TechSkill Solution',
        location: 'Ahmedabad',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        description: 'Developed a fully responsive coffee shop website with performance optimization and reusable UI components. Improved loading speed through frontend optimization techniques.',
        responsibilities: [
          'Developed fully responsive coffee shop website',
          'Improved loading speed through frontend optimization',
          'Built reusable UI components and interactive user experiences',
        ],
        type: 'internship',
        order: 2,
      },
      {
        role: 'B.Tech Computer Science Engineering',
        company: 'University',
        location: 'Gujarat',
        startDate: new Date('2022-08-01'),
        endDate: null,
        description: 'Pursuing Computer Science Engineering with focus on Full Stack Development, Cloud Computing, and Generative AI.',
        responsibilities: [
          'Focus on Full Stack Development, Cloud Computing, and AI',
          'Building personal projects and exploring emerging technologies',
        ],
        type: 'education',
        order: 3,
      },
    ]);
    console.log('Experience seeded');
  } else {
    console.log(`${experienceCount} experiences already exist — skipping experience seed`);
  }

  await mongoose.disconnect();
  console.log('Seed complete — database disconnected');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
