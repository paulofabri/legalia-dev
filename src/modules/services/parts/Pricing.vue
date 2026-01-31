<template>
  <v-container fluid class="pricing-section py-16">
    <v-container fluid class="px-4 px-md-16">
      <!-- Contenido condicional basado en el tab seleccionado -->
      <v-row v-if="selectedTab === 'naturales'" class="align-center">
        <!-- Texto izquierdo -->
        <v-col 
          cols="12" 
          md="6" 
          class="d-flex flex-column justify-center pr-8"
          v-intersect="titleAnimation.intersectOptions"
          :class="titleAnimation.animationClass()"
          :style="titleAnimation.animationStyle"
        >
          <h2 class="pricing-main-title">
            Conoce nuestras <span class="text-bold">tarifas claras</span>, y enfócate en lo que importa: <br></br><span
              class="text-brown">tu tranquilidad legal.</span>
          </h2>
        </v-col>

        <!-- Tarjetas de precios derecha -->
        <v-col 
          cols="12" 
          md="6"
          v-intersect="cardsAnimation.intersectOptions"
          :class="cardsAnimation.animationClass()"
          :style="cardsAnimation.animationStyle"
        >
          <v-row class="d-flex align-center">
            <!-- Tarjeta 1: Asesoría Integral -->
            <PricingCard title="Asesoría Integral" subtitle="Tu tranquilidad legal garantizada." price="$80"
              price-unit="por hora" :features="integralFeatures" button-text="Contratar Ahora"
              button-class="black-button" icon-type="shield" check-icon-class="yellow-check" :show-badge="true"
              badge-text="Más Popular" :size="integralCardSize" />

            <!-- Tarjeta 2: Asesoría Especializada -->
            <PricingCard title="Asesoría especializada" subtitle="Soluciones hechas a tu medida."
              plan="Planes personalizados por caso" :features="specializedFeatures" button-text="Solicitar cotización"
              button-class="dark-button" icon-type="building" check-icon-class="green-check"
              :size="specializedCardSize"
              whatsapp-message="Hola, me interesa solicitar una cotización para la Asesoría Especializada para personas naturales." />
          </v-row>
        </v-col>
      </v-row>

      <v-row v-else-if="selectedTab === 'juridicas'" class="align-center">
        <!-- Texto izquierdo para jurídicas -->
        <v-col 
          cols="12" 
          md="4" 
          class="d-flex flex-column justify-center pr-8"
          v-intersect="juridicasTitleAnimation.intersectOptions"
          :class="juridicasTitleAnimation.animationClass()"
          :style="juridicasTitleAnimation.animationStyle"
        >
          <h2 class="juridicas-main-title">
            Asesoría legal <span class="text-purple">especializada para tu empresa</span>
          </h2>
          <p class="juridicas-subtitle mb-6">Adaptada a tus necesidades.</p>
          <div class="d-flex">
            <v-chip variant="outlined" size="large" class="juridicas-chip">
              <v-icon start size="20" color="#3B82F6">mdi-clock-outline</v-icon>
              Respuesta en 24h
            </v-chip>
          </div>
        </v-col>

        <!-- Bullets de características -->
        <v-col 
          cols="12" 
          md="4"
          v-intersect="juridicasBulletsAnimation.intersectOptions"
          :class="juridicasBulletsAnimation.animationClass()"
          :style="juridicasBulletsAnimation.animationStyle"
        >
          <div class="juridicas-bullets-list">
            <div v-for="(bullet, index) in juridicasBullets" :key="index"
              class="juridicas-bullet-item d-flex flex-row align-center">
              <div class="juridicas-bullet-icon">
                <v-icon color="white" size="16">mdi-check</v-icon>
              </div>
              <div class="juridicas-bullet-text">{{ bullet }}</div>
            </div>
          </div>
        </v-col>
        <v-col 
          cols="12" 
          md="4" 
          class="d-flex justify-center align-center"
          v-intersect="juridicasButtonAnimation.intersectOptions"
          :class="juridicasButtonAnimation.animationClass()"
          :style="juridicasButtonAnimation.animationStyle"
        >
          <v-btn 
            class="juridicas-button" 
            color="#1E2761" 
            height="52" 
            rounded="lg" 
            elevation="2" 
            width="250"
            @click="handleJuridicasWhatsApp"
          >
            Solicitar cotización
            <v-icon class="ml-2" size="20">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Contenido por defecto -->
      <v-row v-else>
        <v-col cols="12">
          <div class="pricing-content">
            <h3 class="content-title">Selecciona una opción</h3>
            <p class="content-description">
              Por favor selecciona entre Personas Naturales o Personas Jurídicas para ver los precios correspondientes.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import PricingCard from './partials/PricingCard.vue'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  selectedTab: {
    type: String,
    required: true,
    default: 'naturales'
  }
})

// Usar el helper de breakpoints de Vuetify
const { mobile } = useDisplay()

// Animaciones de entrada
const titleOffset = mobile.value ? '-50px' : '-100px'
const cardsOffset = mobile.value ? '-50px' : '-150px'

const titleAnimation = useScrollAnimation({ 
  type: 'slide-right', 
  duration: 800, 
  once: true, 
  threshold: 0.2,
  offset: titleOffset
})

const cardsAnimation = useScrollAnimation({ 
  type: 'slide-left', 
  duration: 800, 
  delay: 200,
  once: true, 
  threshold: 0.2,
  offset: cardsOffset
})

// Animación para jurídicas
const juridicasTitleAnimation = useScrollAnimation({ 
  type: 'slide-right', 
  duration: 800, 
  once: true, 
  threshold: 0.2,
  offset: titleOffset
})

const juridicasBulletsAnimation = useScrollAnimation({ 
  type: 'slide-left', 
  duration: 800, 
  delay: 150,
  once: true, 
  threshold: 0.2,
  offset: cardsOffset
})

const juridicasButtonAnimation = useScrollAnimation({ 
  type: 'slide-left', 
  duration: 800, 
  delay: 300,
  once: true, 
  threshold: 0.2,
  offset: cardsOffset
})

// Computed properties para determinar el size basado en el breakpoint
const integralCardSize = computed(() => mobile.value ? 'big' : 'big')
const specializedCardSize = computed(() => 'small')

// Datos para las características de las tarjetas
const integralFeatures = [
  '1 hora de atención con un abogado especialista',
  'Modalidad presencial o en línea',
  'Revisión de contratos o documentos',
  'Recomendaciones prácticas y claras'
]

const specializedFeatures = [
  'Asesoría legal estratégica y acompañamiento permanente',
  'Gestión integral de contratos y documentos legales',
  'Consultas ilimitadas'
]

// Bullets para jurídicas
const juridicasBullets = [
  'Asesoría legal estratégica y acompañamiento permanente',
  'Asistencia y representación legal',
  'Gestión integral de contratos y documentos legales',
  'Capacitación legal para tu equipo'
]

// WhatsApp
const { openWhatsApp } = useWhatsApp()

const handleJuridicasWhatsApp = () => {
  openWhatsApp('Hola, me interesa solicitar una cotización para servicios legales empresariales.')
}

</script>

<style scoped>
.pricing-section {
  background-color: #FFFFFF;
}

/* Título principal izquierdo */
.pricing-main-title {
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.3;
  color: #000000;
}

.text-bold {
  font-weight: 700;
  color: #000000;
}

.text-brown {
  font-weight: 700;
  color: #63071E !important;
}

.text-purple {
  font-weight: 700;
  color: #1E3A8A !important;
}

/* Sección Jurídicas */
.juridicas-main-title {
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.3;
  color: #000000;
  margin-bottom: 1rem;
}

.juridicas-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #6B7280;
  line-height: 1.5;
}

.juridicas-chip {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #3B82F6 !important;
  background-color: #FFFFFF !important;
  border: 2px solid #3B82F6 !important;
  text-transform: none;
  letter-spacing: 0;
  padding: 10px 24px;
  height: 48px;
  border-radius: 50px !important;
}

.juridicas-bullets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1rem 0;
}

.juridicas-bullet-item {
  gap: 12px;
}

.juridicas-bullet-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #22C55E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.juridicas-bullet-text {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #374151;
  line-height: 1.6;
  flex: 1;
}

.juridicas-button {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  border-radius: 12px;
  box-shadow: none !important;
}

.juridicas-cards-placeholder {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F9FAFB;
  border-radius: 12px;
  border: 2px dashed #D1D5DB;
}

/* Responsive - Mobile */
@media (max-width: 960px) {

  .pricing-main-title,
  .juridicas-main-title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 2rem;
  }

  .juridicas-subtitle {
    font-size: 18px;
    text-align: center;
  }

  .juridicas-chip {
    margin: 0 auto;
  }

  .juridicas-bullet-text {
    font-size: 15px;
  }

  .juridicas-bullet-icon {
    width: 28px;
    height: 28px;
  }

  .juridicas-button {
    width: 100% !important;
    max-width: 300px;
  }
}

@media (max-width: 600px) {

  .pricing-main-title,
  .juridicas-main-title {
    font-size: 24px;
    text-align: center;
  }

  .juridicas-subtitle {
    font-size: 16px;
    text-align: center;
  }

  .juridicas-chip {
    font-size: 14px;
    height: 44px;
    padding: 8px 20px;
  }

  .juridicas-bullet-text {
    font-size: 14px;
  }

  .juridicas-bullet-icon {
    width: 26px;
    height: 26px;
  }

  .juridicas-button {
    width: 100% !important;
    font-size: 14px;
    height: 48px !important;
  }
}
</style>
