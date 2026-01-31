<template>
  <v-container fluid class="px-0">
    <v-row align="center">
      <!-- Título y descripción -->
      <v-col cols="12" md="5" lg="4" class="d-flex flex-column justify-center">
        <h2 class="section-title" v-html="title">
        </h2>
        <p class="section-description mt-10">
          {{ description }}
        </p>
      </v-col>

      <!-- Tarjetas de servicios -->
      <v-col cols="12" md="7" lg="8">
        <!-- Desktop: Carrusel con botón -->
        <div class="d-none d-md-block carousel-container">
          <div class="carousel-wrapper">
            <div class="carousel-grid">
              <transition-group name="stagger-card" appear>
                <v-card 
                  v-for="(service, index) in currentPageServices" 
                  :key="`${currentPage}-${service.code}`"
                  class="service-card" 
                  elevation="2" 
                  @click="handleServiceClick(service)"
                  :style="{ '--stagger-delay': `${index * 100}ms` }"
                >
                  <v-card-text class="pa-4 d-flex align-start">
                    <span class="service-icon">{{ service.icon }}</span>
                    <div class="text-content">
                      <h3 class="service-title">{{ service.title }}</h3>
                      <p class="service-description">{{ service.description }}</p>
                    </div>
                    <v-icon class="arrow-icon" size="20" color="#D1D5DB">mdi-chevron-right</v-icon>
                  </v-card-text>
                </v-card>
              </transition-group>
            </div>
            
            <!-- Botón de navegación simple -->
            <button class="carousel-nav-btn" @click="nextPage" aria-label="Siguiente">
              <v-icon size="40" color="#9CA3AF">mdi-chevron-right</v-icon>
            </button>
          </div>
        </div>

        <!-- Mobile: Cards apiladas con animación por scroll -->
        <div class="d-md-none mobile-cards-container">
          <v-card 
            v-for="(service, index) in services" 
            :key="service.code" 
            class="service-card-mobile mb-3" 
            elevation="2" 
            @click="handleServiceClick(service)"
            v-scroll-animate="{ 
              type: 'slide-up', 
              duration: 400, 
              delay: index * 50,
              once: false, 
              threshold: 0.1,
              offset: '-50px'
            }"
          >
            <v-card-text class="pa-4 d-flex align-center">
              <span class="service-icon-mobile">{{ service.icon }}</span>
              <div class="text-content-mobile">
                <h3 class="service-title-mobile">{{ service.title }}</h3>
                <p class="service-description-mobile">
                  {{ service.description }}
                </p>
              </div>
              <v-icon class="arrow-icon-mobile" size="18" color="#9CA3AF">mdi-chevron-right</v-icon>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Modal para mostrar detalles del servicio -->
    <BaseModal
      v-model="isModalOpen"
      :dismissable="true"
      :closeable="isMobile ? false : true"
      :persistent="false"
      max-width="80%"
    >
      <ModalPayload
        :selected-service="selectedService"
        @cancel="closeModal"
        @confirm="confirmService"
      />
    </BaseModal>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import BaseModal from '@/components/BaseModal.vue'
import ModalPayload from './ModalPayload.vue'
import { servicesModalData } from '../../data/servicesModalData.js'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { vScrollAnimate } from '@/composables/useScrollAnimation'
import { useCalendly } from '@/composables/useCalendly'

const { mdAndDown } = useDisplay()
const { openWhatsApp } = useWhatsApp()
const { openCalendly } = useCalendly()

const isMobile = computed(() => mdAndDown.value)

const emit = defineEmits(['service-click'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  services: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Carrusel - 6 cards por página (grid 3x2)
const CARDS_PER_PAGE = 6
const currentPage = ref(0)

const totalPages = computed(() => Math.ceil(props.services.length / CARDS_PER_PAGE))

// Cards de la página actual (hasta 6)
const currentPageServices = computed(() => {
  const startIndex = currentPage.value * CARDS_PER_PAGE
  return props.services.slice(startIndex, startIndex + CARDS_PER_PAGE)
})

const nextPage = () => {
  // Loop: si estamos en la última página, volver a la primera
  if (currentPage.value >= totalPages.value - 1) {
    currentPage.value = 0
  } else {
    currentPage.value++
  }
}

// Estado del modal
const isModalOpen = ref(false)
const selectedService = ref(null)

// Función para enriquecer los datos del servicio con la información del modal
const enrichServiceData = (service) => {
  const enrichedData = servicesModalData[service.code] || {}
  return {
    ...service,
    ...enrichedData
  }
}

const handleServiceClick = (service) => {
  selectedService.value = enrichServiceData(service)
  isModalOpen.value = true
  emit('service-click', service.code, service)
}

const closeModal = () => {
  isModalOpen.value = false
}

const confirmService = () => {
  const service = selectedService.value
  const message = `Hola, me interesa obtener información sobre el servicio de ${service?.title || 'asesoría legal'}. ¿Podrían ayudarme?`
  openCalendly()
  isModalOpen.value = false
}
</script>

<style scoped lang="scss">
/* Sección de título */
.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 50px;
  font-weight: 400;
  color: #425066;
}

.section-description {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: #000000;
  max-width: 500px;
}

/* Desktop: Carrusel */
.carousel-container {
  position: relative;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.carousel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  flex: 1;
}

.service-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  background-color: #FFFFFF;
  cursor: pointer;
  border: 1px solid #F3F4F6;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  :deep(.v-card-text) {
    height: 100%;
  }
}

.service-icon {
  font-size: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.text-content {
  flex: 1;
  min-width: 0;
}

.service-title {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
  margin-bottom: 4px;
}

.service-description {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #6B7280;
  margin: 0;
}

.arrow-icon {
  margin-left: 8px;
  flex-shrink: 0;
  align-self: center;
}

/* Botón de navegación simple (solo chevron) */
.carousel-nav-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Mobile: Cards apiladas */
.mobile-cards-container {
  padding: 0 8px;
}

.service-card-mobile {
  border-radius: 12px;
  background-color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

.service-icon-mobile {
  font-size: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.text-content-mobile {
  flex: 1;
}

.service-title-mobile {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: #000000;
  margin-bottom: 2px;
}

.service-description-mobile {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #6B7280;
  margin: 0;
}

.arrow-icon-mobile {
  margin-left: 8px;
  flex-shrink: 0;
}

/* Responsive */
/* Animación stagger para las cards del carrusel - solo entrada */
.stagger-card-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--stagger-delay, 0ms);
}

.stagger-card-leave-active {
  transition: none;
  position: absolute;
  opacity: 0;
}

.stagger-card-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.stagger-card-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.stagger-card-leave-to {
  opacity: 0;
}

@media (max-width: 1264px) {
  .carousel-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }
}

@media (max-width: 960px) {
  .section-title {
    font-size: 36px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 28px;
    text-align: center;
  }

  .section-description {
    font-size: 14px;
    text-align: center;
  }
}
</style>
