<template>
  <v-app>
    <v-main>
      <!-- Carrusel de imágenes mejorado -->
      <v-sheet :elevation="24" class="main-sheet" rounded tile>
        <v-carousel
          cycle
          hide-delimiters
          hide-delimiter-background
          class="main-carousel"
          interval="5000"
          @change="updateIndex"
          height="700px"
        >
          <v-carousel-item
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            class="carousel-item"
          >
            <v-container fill-height class="carousel-content">
              <v-row align="center" justify="center">
                <v-col class="text-center">
                  <h2 class="carousel-title">{{ titles[index] }}</h2>
                  <p class="carousel-description">{{ descriptions[index] }}</p>
                  <v-btn class="cta-btn" @click="navigateToCitas">Agenda tu Cita</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>

      <!-- Sección de Servicios mejorada -->
      <v-container class="services-section">
        <v-row>
          <v-col cols="12" md="4" v-for="(service, index) in services" :key="index">
            <v-hover v-slot:default="{ isHovering }">
              <v-card :class="{'service-card-hover': isHovering}" class="service-card">
                <v-img :src="service.image" class="service-image" />
                <v-card-title class="service-title">{{ service.title }}</v-card-title>
                <v-card-subtitle class="service-description">{{ service.description }}</v-card-subtitle>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Pie de página -->

    <footer>
      <FooterComponent />
    </footer>

  </v-app>
</template>

<script setup>
import FooterComponent from '@/components/Generales/FooterComponent.vue'
import { useRouter } from 'vue-router'
import img1 from '/img/ima.jpg';
import img2 from '/img/ma.jpg';
import img3 from '/img/pis.png';

const router = useRouter();

const images = [img1, img2, img3];
const titles = [
  "Soluciones Rápidas",
  "Confianza en Cada Servicio",
  "Servicio Integral"
];

const descriptions = [
  "Repara tu tecnología con eficiencia y rapidez.",
  "Expertos en reparación de hardware y software.",
  "Desde diagnóstico hasta reparación, te tenemos cubierto."
];

const navigateToCitas = () => {
  router.push('/Agendar');
}

const services = [
  { title: 'Contamos con:', description: 'Soluciones rápidas y efectivas.', image: img1 },
  { title: '¿Problemas?', description: 'Agenda, mejora tus productos', image: img2 },
  { title: 'Tenemos:', description: 'las mejores reparaciones', image: img3 }
];
</script>

<style scoped>
/* Estilos globales */
.v-application {
  background: #f3f4f6;
  font-family: 'Roboto', sans-serif;
}

/* Estilo del contenedor principal */
.main-sheet {
  width: 100%;
  max-width: 1600px;
  margin: auto;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

/* Estilo del carrusel */
.main-carousel {
  border-radius: 16px;
  overflow: hidden;

}

/* Estilo de los ítems del carrusel */
.carousel-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

/* Estilo del contenido sobre la imagen */
.carousel-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  padding: 20px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.carousel-content-enter-active, .carousel-content-leave-active {
  opacity: 0;
}

.carousel-content-enter, .carousel-content-leave-to {
  transform: translateY(10%);
}

/* Estilo del título en el carrusel */
.carousel-title {
  font-size: 48px;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin: 0;
  color: #fff;
  transition: color 0.3s, transform 0.3s;
}

.carousel-description {
  font-size: 20px;
  margin-top: 10px;
  color: #ddd;
  transition: color 0.3s, transform 0.3s;
}

/* Estilo del botón de llamada a la acción */
.cta-btn {
  width: 240px;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: 18px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  background-color: #2c3e50;
  color: #fff;
}

.cta-btn:hover {
  background-color: #ffad00;
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.4), 0 0 20px #ffad00;
}

/* Estilos para la sección de Servicios */
.services-section {
  margin: 80px auto;
  max-width: 1400px;
}

/* Estilo de la tarjeta de servicio */
.service-card {
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(255, 128, 0, 0.3);
  padding: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
  background: #fff;
}

/* Efecto de hover en la tarjeta de servicio */
.service-card-hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(255, 128, 0, 0.5);
}

/* Estilo del título en la tarjeta de servicio */
.service-title {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 20px;
}

/* Estilo de la descripción en la tarjeta de servicio */
.service-description {
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 10px;
}

/* Estilo de la imagen de servicio */
.service-image {
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
  object-fit: cover;
}

/* Estilos para el pie de página */
footer {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}

/* Consultas de medios para hacer el diseño responsivo */
@media (max-width: 768px) {
  .overlay-container {
    padding: 5% 2%;
  }

  .schedule-btn {
    width: 150px;
  }

  .white-text {
    font-size: 30px;
  }

  .subtitulo {
    font-size: 30px;
  }

  .text {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .overlay-container {
    padding: 5% 1%;
  }

  .schedule-btn {
    width: 100%;
  }

  .white-text {
    font-size: 24px;
  }

  .subtitulo {
    font-size: 24px;
  }

  .text {
    font-size: 14px;
  }
}
</style>
