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
      <div
        v-for="(payment, index) in payments"
        :key="payment.title"
        v-intersect="paymentAnimations[index].intersectOptions"
        :class="paymentAnimations[index].animationClass()"
        :style="paymentAnimations[index].animationStyle"
        class="payments-item"
      >
        <v-img :src="payment.icon" :alt="payment.title" max-width="284" contain />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
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
</script>

<style scoped>
.payments-container {
  margin-bottom: 80px;
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
}

.payments-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 960px) {
  .payments-title {
    font-size: 28px;
  }
}

@media (max-width: 600px) {
  .payments-title {
    font-size: 24px;
  }
}
</style>
