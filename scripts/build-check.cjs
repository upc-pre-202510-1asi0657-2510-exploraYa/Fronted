#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para despliegue en Render...\n');

// Verificar archivos necesarios
const requiredFiles = [
  'render.yaml',
  'public/_redirects',
  'package.json',
  'vite.config.js',
  '.nvmrc'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

if (missingFiles.length > 0) {
  console.error('❌ Archivos faltantes:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

console.log('✅ Todos los archivos necesarios están presentes');

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Verificar scripts
const requiredScripts = ['build', 'start'];
const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);

if (missingScripts.length > 0) {
  console.error('❌ Scripts faltantes en package.json:');
  missingScripts.forEach(script => console.error(`   - ${script}`));
  process.exit(1);
}

console.log('✅ Scripts de build configurados correctamente');

// Verificar engines
if (!packageJson.engines || !packageJson.engines.node) {
  console.warn('⚠️  Se recomienda especificar la versión de Node.js en engines');
}

// Verificar dependencias de terser
if (!packageJson.devDependencies || !packageJson.devDependencies.terser) {
  console.warn('⚠️  Se recomienda instalar terser para minificación');
}

// Verificar configuración de Vite
const viteConfigPath = 'vite.config.js';
const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

if (!viteConfig.includes('build:') || !viteConfig.includes('outDir')) {
  console.warn('⚠️  Configuración de build de Vite podría estar incompleta');
}

console.log('✅ Configuración de Vite verificada');

// Verificar variables de entorno
const envVars = ['VITE_API_URL'];
const missingEnvVars = envVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Variables de entorno no configuradas (asegúrate de configurarlas en Render):');
  missingEnvVars.forEach(envVar => console.warn(`   - ${envVar}`));
}

console.log('\n🚀 Configuración lista para desplegar en Render');
console.log('\nPróximos pasos:');
console.log('1. Subir cambios a tu repositorio de GitHub');
console.log('2. Conectar repositorio a Render');
console.log('3. Configurar variables de entorno en Render');
console.log('4. Desplegar automáticamente con render.yaml');
console.log('\nPara más información, consulta DEPLOYMENT.md'); 