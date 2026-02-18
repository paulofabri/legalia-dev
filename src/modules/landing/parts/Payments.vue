<template>
  <v-container class="payments-container">
    <v-row>
      <v-col>
        <div class="payments-title text-center">
          y paga de la manera en que desees
        </div>
      </v-col>
    </v-row>

    <div class="payments-row">
      <transition-group name="fade" tag="div" class="payments-group">
        <div
          v-for="payment in visiblePayments"
          :key="payment.title + currentGroup"
          v-intersect="mobile ? undefined : paymentAnimations[payment.originalIndex].intersectOptions"
          :class="mobile ? '' : paymentAnimations[payment.originalIndex].animationClass()"
          :style="mobile ? {} : paymentAnimations[payment.originalIndex].animationStyle"
          class="payments-item"
        >
          <v-img :src="payment.icon" :alt="payment.title" :max-width="mobile ? '200' : '284'" contain />
        </div>
      </transition-group>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { mobile } = useDisplay()

// Offset responsive
const animationOffset = mobile.value ? '-50px' : '-200px'

const payments = ref([
  {
    title: 'Pago móvil',
    icon: new URL('../assets/payments/pago-movil.svg', import.meta.url).href
  },
  {
    title: 'Transferencia internacional',
    icon: new URL('../assets/payments/transferencia-internacional.svg', import.meta.url).href
  },
  {
    title: 'Efectivo',
    icon: new URL('../assets/payments/efectivo.svg', import.meta.url).href
  },
  {
    title: 'Cashea',
    icon: new URL('../assets/payments/cashea.svg', import.meta.url).href
  },
  {
    title: 'Paypal',
    icon: new URL('../assets/payments/paypal.svg', import.meta.url).href
  },
  {
    title: 'Zelle',
    icon: new URL('../assets/payments/zelle.svg', import.meta.url).href
  },
  {
    title: 'Binance',
    icon: new URL('../assets/payments/binance.svg', import.meta.url).href
  }
])

// Sistema de rotación para móviles
const currentGroup = ref(0)
let rotationInterval = null

// Computed para pagos visibles
const visiblePayments = computed(() => {
  if (!mobile.value) {
    // En desktop, mostrar todos con índice original para animaciones
    return payments.value.map((payment, index) => ({
      ...payment,
      originalIndex: index
    }))
  }
  
  // En móvil, mostrar solo 3 a la vez
  const itemsPerGroup = 3
  const totalItems = payments.value.length
  const startIndex = (currentGroup.value * itemsPerGroup) % totalItems
  
  const visible = []
  for (let i = 0; i < itemsPerGroup; i++) {
    const index = (startIndex + i) % totalItems
    visible.push({
      ...payments.value[index],
      originalIndex: index
    })
  }
  
  return visible
})

// Animaciones con stagger dinámico según cantidad de payments
const paymentAnimations = computed(() =>
  payments.value.map((_, index) =>
    useScrollAnimation({
      type: 'slide-up',
      duration: 800,
      delay: index * 150,
      once: true,
      threshold: 0.1,
      offset: animationOffset
    })
  )
)

// Iniciar rotación automática en móviles
onMounted(() => {
  if (mobile.value) {
    rotationInterval = setInterval(() => {
      currentGroup.value = (currentGroup.value + 1) % Math.ceil(payments.value.length / 3)
    }, 5000)
  }
})

// Limpiar interval al desmontar
onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
})
</script>

<style scoped>
.payments-container {
  margin-bottom: 80px;
}

.payments-container :deep(.v-container) {
  padding-left: 12px;
  padding-right: 12px;
}

.payments-title {
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #000000;
}

.payments-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.payments-group {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.payments-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Transiciones suaves para el carrusel */
.fade-enter-active {
  transition: all 1s ease-in-out;
}

.fade-leave-active {
  transition: all 0.8s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-move {
  transition: transform 0.8s ease-in-out;
}

@media (max-width: 960px) {
  .payments-title {
    font-size: 28px;
  }
  
  .payments-item {
    flex: 0 0 auto;
    min-width: 140px;
    max-width: 180px;
  }
}

@media (max-width: 600px) {
  .payments-title {
    font-size: 24px;
  }
  
  .payments-row {
    gap: 0.5rem;
  }
  
  .payments-group {
    gap: 0.5rem;
  }
  
  .payments-item {
    flex: 1 1 0;
    min-width: 100px;
  }
}
</style>
