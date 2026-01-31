<template>
  <v-col cols="12" md="6">
    <div class="pricing-card-wrapper" :class="{ 'small': size === 'small', 'big': size === 'big' }">
      <!-- Badge Más Popular (opcional) -->
      <div v-if="showBadge" class="popular-badge-wrapper">
        <div class="popular-badge">
          <span class="badge-text">{{ badgeText }}</span>
        </div>
      </div>

      <v-card class="pricing-card" elevation="2">
        <v-card-text class="pa-8 text-center">
          <!-- Icono -->
          <div class="card-icon-wrapper mb-4 d-flex flex-row justify-center align-center">
            <v-img :src="iconSrc" width="68" height="68" contain />
          </div>

          <h3 class="card-title mb-2">{{ title }}</h3>
          <p class="card-subtitle mb-2">{{ subtitle }}</p>
          <p v-if="plan" class="card-plan mb-4">{{ plan }}</p>

          <div v-if="price" class="price-section mb-4 d-flex flex-column align-center" :class="{ 'mb-4': !plan }">
            <div class="price-amount">{{ price }}</div>
            <div class="price-unit">{{ priceUnit }}</div>
          </div>

          <div class="features-list mb-6 d-flex flex-column">
            <div class="feature-item" v-for="(feature, index) in features" :key="index">
              <div class="check-icon" :class="checkIconClass">✓</div>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>

          <v-btn class="action-button" :class="buttonClass" block @click="handleButtonClick">
            {{ buttonText }}
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-col>
</template>

<script setup>
import { computed } from 'vue'
import shieldIcon from '@/modules/services/assets/pricing-card/shield.svg'
import buildingIcon from '@/modules/services/assets/pricing-card/building.svg'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { useCalendly } from '@/composables/useCalendly'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: ''
  },
  priceUnit: {
    type: String,
    default: ''
  },
  features: {
    type: Array,
    required: true,
    default: () => []
  },
  buttonText: {
    type: String,
    required: true
  },
  buttonClass: {
    type: String,
    default: 'black-button'
  },
  iconType: {
    type: String,
    default: 'shield',
    validator: (value) => ['shield', 'building'].includes(value)
  },
  checkIconClass: {
    type: String,
    default: 'yellow-check'
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  badgeText: {
    type: String,
    default: 'Más Popular'
  },
  size: {
    type: String,
    default: 'small'
  },
  whatsappMessage: {
    type: String,
    default: ''
  }
})

const { openWhatsApp } = useWhatsApp()
const { openCalendly } = useCalendly()

const iconSrc = computed(() => {
  return props.iconType === 'shield' ? shieldIcon : buildingIcon
})

const handleButtonClick = () => {
  if (props.whatsappMessage) {
    openWhatsApp(props.whatsappMessage)
  } else {
    // Mensaje por defecto si no se proporciona uno específico
    openCalendly()
  }
}
</script>

<style lang="scss">
/* Estilos globales para sobreescribir Vuetify */
.pricing-card.v-card {
  --v-hover-opacity: 0 !important;
  
  &:hover {
    background-color: #FFFFFF !important;
    
    > .v-card__overlay {
      opacity: 0 !important;
    }
  }
  
  > .v-card__overlay {
    background-color: transparent !important;
  }
}
</style>

<style scoped>
/* Wrapper para la tarjeta con badge */
.pricing-card-wrapper {
  position: relative;
  height: 100%;
}

.pricing-card-wrapper.small {
  min-height: 452px;
}

.pricing-card-wrapper.big {
  min-height: 570px;
}

/* Mobile: todas las tarjetas miden 400px */
@media (max-width: 959px) {
  .pricing-card-wrapper.small {
    min-height: 450px;
  }

  .pricing-card-wrapper.big {
    min-height: 500px;
  }
}

/* Badge "Más Popular" - Mitad fuera, mitad dentro del card */
.popular-badge-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.popular-badge {
  display: inline-block;
  background-color: #FBBF24;
  border-radius: 20px;
  padding: 8px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge-text {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #000000;
}

/* Tarjetas de precios */
.pricing-card {
  border-radius: 24px;
  background-color: #FFFFFF;
  height: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  background-color: #FFFFFF !important;
}

.pricing-card:hover::before,
.pricing-card::before {
  opacity: 0 !important;
}

/* Títulos y textos de las tarjetas */
.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
}

.card-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #6B7280;
  line-height: 1.4;
}

.card-plan {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1rem;
}

/* Precio */
.price-section {
  gap: 0;
}

.price-amount {
  font-family: 'Poppins', sans-serif;
  font-size: 56px;
  font-weight: 700;
  color: #000000;
  line-height: 1;
}

.price-unit {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #6B7280;
  margin-top: 4px;
}

/* Lista de características */
.features-list {
  gap: 14px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
}

.yellow-check {
  color: #FBBF24;
}

.green-check {
  color: #10B981;
}

.feature-text {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #374151;
  line-height: 1.5;
}

/* Botones */
.action-button {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  border-radius: 12px;
  height: 52px;
  box-shadow: none !important;
}

.black-button {
  background-color: #000000 !important;
  color: #FFFFFF !important;
}

.dark-button {
  background-color: #1F2937 !important;
  color: #FFFFFF !important;
}

/* Responsive - Mobile */
@media (max-width: 960px) {
  .card-title {
    font-size: 20px;
  }

  .price-amount {
    font-size: 48px;
  }

  .pricing-card {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .card-title {
    font-size: 18px;
  }

  .card-subtitle,
  .card-plan,
  .price-unit {
    font-size: 14px;
  }

  .price-amount {
    font-size: 40px;
  }

  .feature-text {
    font-size: 13px;
  }

  .action-button {
    font-size: 14px;
    height: 48px;
  }

  .popular-badge {
    padding: 5px 12px;
  }

  .badge-text {
    font-size: 12px;
  }
}
</style>
