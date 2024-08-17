<template>
  <v-app :class="{ 'dark-theme': isDarkMode }" class="app-container">
    <!-- Encabezado -->
    <header>
      <HeaderComponent :title="'HardwareSolutions'" :menuItems="menuItems" />
    </header>

    <!-- Sección Principal -->
    <main>
      <v-container fluid class="main-content">
        <v-row no-gutters>
          <v-col cols="12" class="main-image-container">
            <v-img
              src="/img/imgfondo.jpg"
              alt="Imagen Principal"
              class="main-image"
              contain
            ></v-img>
            <div class="main-overlay">
              <h2 class="main-overlay-text">¡Bienvenido!</h2>
              <p class="main-overlay-subtext">Más que reparaciones, soluciones.</p>
              <v-btn class="main-overlay-btn" :to="buttonLink">{{ buttonText }}</v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Sección CONÓCENOS -->
        <v-row class="about-us-section">
          <v-col cols="12" class="about-us-container">
            <v-card class="about-us-card">
              <v-card-title class="about-us-title">
                CONÓCENOS
              </v-card-title>
              <v-card-text class="about-us-text">
                <v-row>
                  <v-col cols="12" class="about-us-text-col">
                    <p class="about-us-text-description">
                      En HardwareSolutions, ofrecemos un servicio integral para la reparación de
                      <strong>teléfonos móviles</strong>, <strong>computadoras y laptops</strong>,
                      <strong>electrodomésticos</strong>, y <strong>televisores</strong>. Diagnósticos
                      rápidos y soluciones efectivas para problemas como pantallas rotas, baterías
                      defectuosas, fallos de hardware y software, y más.
                    </p>
                    <p class="about-us-text-description">
                      <strong>Servicio Rápido y Eficiente:</strong> Garantizamos tiempos de reparación
                      cortos para que vuelvas a utilizar tus dispositivos sin demoras.
                    </p>
                    <p class="about-us-text-description">
                      <strong>Soporte Técnico:</strong> Brindamos asesoramiento y asistencia técnica
                      para resolver cualquier duda que puedas tener.
                    </p>
                  </v-col>
                  <v-col cols="12" md="6" class="about-us-image-col">
                    <v-img src="public/img/about-us-image.jpg" class="about-us-image" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Sección de Servicios Destacados -->
        <v-row class="services-section" justify="center">
          <v-col cols="12" sm="6" md="4" class="service-item">
            <v-card class="service-card">
              <v-img src="/img/chetos.png" class="service-img" />
              <v-card-title class="service-title">Reparaciones Rápidas</v-card-title>
              <v-card-subtitle class="service-subtitle">Eficiente Trabajo</v-card-subtitle>
              <v-card-text class="service-text">
                Ofrecemos reparaciones rápidas para tus dispositivos con la mayor eficiencia.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="service-item">
            <v-card class="service-card">
              <v-img src="/img/pupu.png" class="service-img" />
              <v-card-title class="service-title">Soporte Técnico</v-card-title>
              <v-card-subtitle class="service-subtitle">Asistencia Experta</v-card-subtitle>
              <v-card-text class="service-text">
                Nuestro equipo de expertos está listo para ofrecerte la mejor asistencia técnica.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="service-item">
            <v-card class="service-card">
              <v-img src="/img/papa.png" class="service-img" />
              <v-card-title class="service-title">Empleados Capacitados</v-card-title>
              <v-card-subtitle class="service-subtitle">Asesoría a Medida</v-card-subtitle>
              <v-card-text class="service-text">
                Consultoría especializada para optimizar el rendimiento de tus dispositivos.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </main>

    <!-- Pie de Página -->
    <footer>
      <v-container fluid>
        <v-row class="footer-top">
          <!-- Mapa -->
          <v-col cols="12" class="footer-item">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.655566511074!2d-103.41784522489935!3d25.51653121869297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdb87c9af3bab%3A0x48699817edaff153!2sLa%20Fuente!5e0!3m2!1ses-419!2smx!4v1722614399479!5m2!1ses-419!2smx"
              width="100%"
              height="300"
              style="border: 0; border-radius: 12px;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación de HardwareSolutions"
            ></iframe>
          </v-col>

          <!-- Información de Contacto -->
          <v-col cols="12" class="footer-item">
            <v-card class="contact-card">
              <v-card-title class="text-center">Contacto Rápido</v-card-title>
              <v-card-text>
                <p>¿Tienes preguntas o necesitas asistencia inmediata? Contáctanos fácilmente a través de nuestros canales:</p>
                <v-card-subtitle>
                  <li><strong>Teléfono:</strong> (123) 456-7890</li>
                  <li><strong>Email:</strong> contacto@hardwaresolutions.com</li>
                  <li><strong>WhatsApp:</strong> (123) 456-7890</li>
                </v-card-subtitle>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Redes Sociales -->
        <v-row class="social-section">
          <v-col cols="12" class="text-center">
            <h4 class="social-title">Síguenos en Redes Sociales</h4>
            <div class="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100054380206513" target="_blank" aria-label="Facebook">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" class="social-icon"/>
              </a>
              <a href="https://instagram.com" target="_blank" aria-label="Instagram">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" class="social-icon"/>
              </a>
            </div>
          </v-col>
        </v-row>

     
        <v-row class="footer-bottom-line">
          <v-col cols="12">
            <div class="footer-bottom-content text-center">
              <hr class="footer-separator">
              <p>&copy; 2024 HardwareSolutions. Todos los derechos reservados.</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import HeaderComponent from './components/Generales/navBlancoo.vue'
import { ref, computed, onMounted } from 'vue'

const isDarkMode = ref(false)

const menuItems = [
  { name: 'Login', route: '/login' },
  { name: 'Registro', route: '/register' }
]

const isLoggedIn = ref(false)

const buttonLink = computed(() => isLoggedIn.value ? '/profile' : '/register')
const buttonText = computed(() => isLoggedIn.value ? 'Ir al Perfil' : 'Registrate')

onMounted(() => {
  const aboutUsCard = document.querySelector('.about-us-card');
  if (aboutUsCard) {
    aboutUsCard.classList.add('visible');
  }
});
</script>

<style>
/* Estilo de la aplicación */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #BDC3C7;
  font-family: 'Open Sans', sans-serif;
  transition: background-color 0.3s ease;
}

.main-content {
  padding: 20px;
}

/* Imagen Principal */
.main-image-container {
  position: relative;
  overflow: hidden;
}

.main-image {
  border-radius: 0 0 16px 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.main-image-container:hover .main-image {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.main-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #ECF0F1;
  text-align: center;
  border-radius: 16px;
  transition: opacity 0.3s ease;
}

.main-overlay-text {
  font-size: 2.5rem;
  font-weight: 700;
}

.main-overlay-subtext {
  font-size: 1.2rem;
  margin: 10px 0;
}

.main-overlay-btn {
  margin-top: 20px;
  background-color:#34495E;
  color: #ECF0F1;
}

/* Sección CONÓCENOS */
.about-us-section {
  background: #ECF0F1;
  padding: 60px 20px;
}

.about-us-container {
  display: flex;
  justify-content: center;
}

.about-us-card {
  width: 100%;
  max-width: 1200px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 1s ease-out;
}

.about-us-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.about-us-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2C3E50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 2px solid #2C3E50;
}

.about-us-text {
  padding: 20px;
  text-align: center;
}

.about-us-text-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.about-us-text-description {
  font-size: 1.125rem;
  margin-bottom: 15px;
  line-height: 1.6;
}

.about-us-image-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.about-us-image {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Sección de Servicios Destacados */
.services-section {
  background: #fff;
  padding: 60px 20px;
}

.service-item {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.service-card {
  max-width: 350px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.service-img {
  border-radius: 16px 16px 0 0;
  height: 200px;
  object-fit: cover;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2C3E50;
}

.service-subtitle {
  font-size: 1.125rem;
  color: #666;
}

.service-text {
  font-size: 1rem;
  color: #34495E;
}

/* Pie de Página */
.footer-top {
  background: #2C3E50;
  color: #ECF0F1;
  padding: 20px;
}

.footer-item {
  margin-bottom: 20px;
}

.contact-card {
  background: #fff;
  color: #333;
  border-radius: 16px;
  padding: 20px;
}

.footer-bottom-line {
  background: #ECF0F1;
  padding: 20px;
}

.footer-bottom-content {
  margin: 0 auto;
  max-width: 1200px;
}

.footer-separator {
  border: 0;
  border-top: 1px solid #BDC3C7;
  margin-bottom: 10px;
}

.social-section {
  background: #fff;
  padding: 20px;
}

.social-title {
  font-size: 1.5rem;
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icon {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}
</style>
