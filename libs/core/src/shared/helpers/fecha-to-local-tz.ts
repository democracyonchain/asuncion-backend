/**
 * Función que transforma las fechas de entrada en formato (dd-mm-yyyy) a (dd-mm-yyy TZ) incluyendo timezone de la zona horaria GTM-5
 * @date 9/6/2022 - 12:40:12
 *
 * @export
 * @param {Date} fecha
 * @returns {Date}
 */
export function fechaToLocalTZ(fecha: Date): Date {
  if (!fecha) return null;
  const fechaToLocalTZ = new Date(fecha);
  fechaToLocalTZ.setMinutes(fechaToLocalTZ.getMinutes() + fechaToLocalTZ.getTimezoneOffset());
  return fechaToLocalTZ;
}
