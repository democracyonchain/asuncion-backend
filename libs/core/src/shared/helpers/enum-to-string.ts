/**
 * Función que transforma un enum en un string para mensajes de respuesta
 * @date 9/6/2022 - 12:39:28
 *
 * @param {object} _enum
 * @returns {{}}
 */
export const EnumToString = (_enum: object) =>
  Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string') as string[];
