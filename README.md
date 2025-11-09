
Autores: Edwin Sarango, Daniel Mejia

# AppconAPI - Multi-API Consumer Application

Una aplicación móvil desarrollada con Ionic Angular que permite consumir múltiples APIs públicas de forma combinada o individual.

## Características

### APIs Integradas

1. **JokeAPI** - Chistes aleatorios en español
   - URL: `https://v2.jokeapi.dev/joke/Any?lang=es`
   - Chistes de diferentes categorías
   - Historial de chistes visualizados

2. **The Cat API** - Imágenes aleatorias de gatos
   - URL: `https://api.thecatapi.com/v1/images/search`
   - Galería de imágenes de gatos
   - Información de dimensiones

3. **Dog CEO API** - Imágenes aleatorias de perros
   - URL: `https://dog.ceo/api/breeds/image/random`
   - Galería de imágenes de perros
   - Identificación de razas

4. **Cataas** - Cat as a Service
   - URL: `https://cataas.com/cat`
   - Servicio alternativo de imágenes de gatos

### Funcionalidades

- **Modo Combinado**: Consume todas las APIs simultáneamente (chiste + gato + perro)
- **Modo Individual**: Accede a cada API por separado
- **Navegación por Menú**: Interfaz intuitiva con opciones claras
- **Galerías**: Historial visual de imágenes cargadas
- **Actualización en Tiempo Real**: Botones de refresh para cargar nuevo contenido
- **Diseño Responsivo**: Optimizado para dispositivos móviles y tablets
- **Manejo de Errores**: Mensajes claros cuando falla la carga de datos

## 📱 Estructura de la Aplicación

### Páginas Principales

1. **Inicio (Tab1)** - `src/app/tab1/`
   - Menú principal con navegación a todas las opciones
   - Información sobre las APIs disponibles
   - Diseño tipo dashboard

2. **APIs Combinadas (Tab2)** - `src/app/tab2/`
   - Muestra un chiste + imagen de gato + imagen de perro
   - Carga simultánea de las tres APIs
   - Botón para refrescar todo el contenido

3. **Chistes (Tab3)** - `src/app/tab3/`
   - Chistes aleatorios en español
   - Historial de los últimos 10 chistes
   - Categorías y etiquetas de seguridad

4. **Gatos** - `src/app/pages/cats/`
   - Imágenes de The Cat API y Cataas
   - Galería con las últimas imágenes
   - Opción para cargar más gatos

5. **Perros** - `src/app/pages/dogs/`
   - Imágenes de Dog CEO API
   - Galería con identificación de razas
   - Opción para cargar más perros

### Servicios

- **ApiService** - `src/app/services/api.service.ts`
  - Manejo centralizado de todas las llamadas HTTP
  - Métodos para cada API individual
  - Método combinado para cargar múltiples APIs
  - Interfaces TypeScript para tipado fuerte

## Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Ionic CLI (`npm install -g @ionic/cli`)
- Angular CLI (v20.0.0)

### Pasos de Instalación

1. **Clonar o navegar al proyecto**
   ```bash
   cd AppconAPI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   # o
   ionic serve
   ```

4. **Compilar para producción**
   ```bash
   npm run build
   ```

### Ejecutar en Dispositivos

**Android:**
```bash
ionic capacitor add android
ionic capacitor sync android
ionic capacitor run android
```

## Dependencias Principales

```json
{
  "@angular/core": "^20.0.0",
  "@ionic/angular": "^8.0.0",
  "@capacitor/core": "7.4.4",
  "rxjs": "~7.8.0"
}
```

## Diseño y UI

- **Framework**: Ionic 8 con Angular 20
- **Componentes**: Ion-cards, Ion-buttons, Ion-icons
- **Estilos**: SCSS con variables CSS de Ionic
- **Iconos**: Ionicons
- **Colores temáticos**:
  - Primary (Azul) - Navegación general
  - Warning (Amarillo) - Chistes
  - Success (Verde) - Gatos
  - Tertiary (Púrpura) - Perros

## Configuración de APIs

Todas las APIs utilizadas son públicas y no requieren autenticación. Si deseas agregar más APIs:

1. Agregar el método en `src/app/services/api.service.ts`
2. Crear una nueva página en `src/app/pages/`
3. Actualizar el routing en `src/app/tabs/tabs-routing.module.ts`
4. Agregar la opción en el menú principal (Tab1)

### Ejemplo: Agregar una nueva API

```typescript
// En api.service.ts
getNewAPI(): Observable<any> {
  return this.http.get('https://api.example.com/data');
}
```

## Recursos Adicionales

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.dev)
- [Free APIs List](https://free-apis.github.io/)
- [JokeAPI Docs](https://v2.jokeapi.dev/)
- [The Cat API Docs](https://thecatapi.com/)
- [Dog CEO API Docs](https://dog.ceo/dog-api/)

## Solución de Problemas

### Error: CORS
Si encuentras errores de CORS durante el desarrollo, usa el proxy de Ionic:
```bash
ionic serve --proxy-config proxy.conf.json
```

### Error: HttpClient not provided
Asegúrate de que `HttpClientModule` esté importado en `app.module.ts`

### Error: Cannot find module
Ejecuta:
```bash
npm install
ionic capacitor sync
```