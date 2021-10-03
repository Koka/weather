const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']

export const formatDegreesDirection = (degrees: number) => DIRECTIONS[Math.round((degrees % 360) / 45)]
