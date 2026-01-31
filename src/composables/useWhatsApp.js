/**
 * Composable reutilizable para abrir WhatsApp con un mensaje predefinido
 * @param {string} phoneNumber - Número de teléfono (formato: +584122515898)
 * @param {string} defaultMessage - Mensaje por defecto
 * @returns {Function} Función para abrir WhatsApp
 */
export function useWhatsApp(phoneNumber = '+584141535130', defaultMessage = 'Hola, me interesa conocer más sobre sus servicios legales.') {
  const openWhatsApp = (customMessage = null) => {
    // Si se pasa un evento por error, ignorarlo y usar el mensaje por defecto
    if (customMessage && typeof customMessage !== 'string') {
      customMessage = null
    }
    const message = encodeURIComponent(customMessage || defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return {
    openWhatsApp
  }
}
