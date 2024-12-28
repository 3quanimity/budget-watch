import { colors, getColor, getColorWithOpacity, categoryColors } from '../theme/colors';

export function useAppColors() {
  const getCategoryColor = (category, opacity = 1) => {
    const colorName = categoryColors[category] || 'primary';
    return opacity < 1 ? getColorWithOpacity(colorName, opacity) : getColor(colorName);
  };

  return {
    colors,
    getColor,
    getColorWithOpacity,
    getCategoryColor
  };
}
