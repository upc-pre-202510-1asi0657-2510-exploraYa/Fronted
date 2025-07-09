# Guía de Despliegue para Render

## Preparación del Proyecto

### 1. Variables de Entorno
Antes de desplegar, asegúrate de configurar las siguientes variables de entorno en Render:

```
VITE_API_URL=https://tu-api-backend.onrender.com/api/v1
VITE_APP_TITLE=AventuraPE
VITE_APP_ENV=production
NODE_ENV=production
```

### 2. Configuración de Build
- **Build Command**: `npm ci --only=production && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: `18.17.0`

## Pasos para Desplegar en Render

### Opción 1: Usando render.yaml (Recomendado)

1. Asegúrate de que el archivo `render.yaml` esté en la raíz del proyecto
2. Conecta tu repositorio de GitHub a Render
3. Render automáticamente detectará la configuración del archivo `render.yaml`
4. El despliegue se realizará automáticamente

### Opción 2: Configuración Manual

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en "New +" y selecciona "Static Site"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build Command**: `npm ci --only=production && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Static`

### 3. Variables de Entorno en Render

En el dashboard de Render, ve a tu servicio y añade las siguientes variables:

- `VITE_API_URL`: La URL de tu API backend
- `VITE_APP_TITLE`: AventuraPE
- `VITE_APP_ENV`: production
- `NODE_ENV`: production

## Configuración de Dominio Personalizado

1. Ve a tu servicio en Render
2. Haz clic en "Settings"
3. Scroll hasta "Custom Domains"
4. Añade tu dominio personalizado
5. Configura los registros DNS según las instrucciones

## Optimizaciones para Producción

### Caché
- Los archivos estáticos se cachean automáticamente por 1 año
- Los headers de caché están configurados en `render.yaml`

### Compresión
- Render automáticamente comprime archivos con gzip
- Los archivos JS/CSS se minifican durante el build

### Seguridad
- Headers de seguridad configurados automáticamente
- CSP configurado para reCAPTCHA y Google Maps

## Monitoreo y Logs

### Ver Logs
```bash
# En el dashboard de Render
Events > Build Logs
Events > Deploy Logs
```

### Métricas
- Render proporciona métricas básicas de tráfico
- Considera usar Google Analytics para métricas más detalladas

## Resolución de Problemas

### Error de Build
1. Verifica que todas las dependencias estén instaladas
2. Revisa que Node.js version sea compatible
3. Verifica las variables de entorno

### Error 404 en Rutas
- Asegúrate de que `_redirects` esté en la carpeta `public`
- Verifica que `render.yaml` tenga la configuración de rewrite

### Problemas de API
- Verifica que `VITE_API_URL` esté configurada correctamente
- Asegúrate de que la API backend esté desplegada y accesible

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Instalar dependencias
npm ci --only=production
```

## Consideraciones Adicionales

- **HTTPS**: Render proporciona SSL automáticamente
- **CDN**: Render incluye CDN global
- **Auto-deploy**: Configurado automáticamente con GitHub
- **Rollbacks**: Disponible en el dashboard

## Contacto y Soporte

Para problemas específicos:
1. Revisa la documentación de Render
2. Verifica los logs de build y deploy
3. Contacta al equipo de desarrollo 