# AventuraPE - Frontend

Aplicación web frontend para la plataforma AventuraPE, construida con Vue.js 3 y Vite.

## 🚀 Despliegue en Render

### Configuración Rápida

1. **Verificar configuración:**
   ```bash
   npm run build-check
   ```

2. **Variables de entorno requeridas en Render:**
   - `VITE_API_URL`: URL de tu API backend
   - `VITE_APP_TITLE`: AventuraPE
   - `VITE_APP_ENV`: production
   - `NODE_ENV`: production

3. **Configuración automática:**
   - El archivo `render.yaml` contiene toda la configuración necesaria
   - Render detectará automáticamente la configuración al conectar tu repositorio

### Pasos de Despliegue

1. **Subir a GitHub:**
   ```bash
   git add .
   git commit -m "Configuración para despliegue en Render"
   git push origin main
   ```

2. **Conectar a Render:**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Haz clic en "New +" → "Static Site"
   - Conecta tu repositorio
   - Render detectará automáticamente `render.yaml`

3. **Configurar variables de entorno en Render Dashboard**

4. **Desplegar automáticamente**

Para más detalles, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Desarrollo Local

### Instalación

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Construir para producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── domains/               # Dominios de la aplicación
│   ├── IAM/              # Gestión de identidad y acceso
│   ├── postManagement/   # Gestión de publicaciones
│   ├── profileManagement/ # Gestión de perfiles
│   └── statisticsManagement/ # Gestión de estadísticas
├── router/               # Configuración de rutas
├── shared/               # Componentes y servicios compartidos
└── assets/               # Recursos estáticos
```

## 🔧 Tecnologías Utilizadas

- **Vue.js 3** - Framework principal
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento
- **Pinia** - Gestión de estado
- **PrimeVue** - Componentes UI
- **Axios** - Cliente HTTP
- **FontAwesome** - Iconos
- **Leaflet** - Mapas
- **EmailJS** - Envío de emails

## 🔐 Autenticación

La aplicación incluye:
- Sistema de autenticación con JWT
- Roles de usuario (Admin, Emprendedor, Aventurero)
- Guards de ruta para proteger páginas
- Interceptores para manejo de tokens

## 📱 Características

- **Responsive Design** - Optimizado para móviles y desktop
- **PWA Ready** - Preparado para Progressive Web App
- **SEO Optimizado** - Meta tags y structured data
- **Seguridad** - CSP headers y validación
- **Performance** - Code splitting y lazy loading

## 🌐 Variables de Entorno

```bash
# Desarrollo
VITE_API_URL=http://localhost:8080/api/v1

# Producción
VITE_API_URL=https://tu-api-backend.onrender.com/api/v1
VITE_APP_TITLE=AventuraPE
VITE_APP_ENV=production
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa del build
- `npm run build-check` - Verifica configuración para despliegue

## 🐛 Resolución de Problemas

### Error de Build
1. Verificar que Node.js sea versión 18.17.0 o superior
2. Limpiar node_modules: `rm -rf node_modules && npm install`
3. Verificar variables de entorno

### Error 404 en Rutas
- Asegurarse de que `_redirects` esté en `public/`
- Verificar configuración de `render.yaml`

### Problemas de API
- Verificar que `VITE_API_URL` esté configurada
- Comprobar que el backend esté desplegado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License.

## 📞 Contacto

Para soporte técnico o preguntas sobre el despliegue, consulta la documentación en [DEPLOYMENT.md](./DEPLOYMENT.md).
