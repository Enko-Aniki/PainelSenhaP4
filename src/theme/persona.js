export const colors = {
  yellow: '#F9DE00',
  yellowDark: '#E0C700',
  black: '#0A0A0A',
  red: '#E4032E',
  white: '#FFFFFF',
  gray: '#1F1F1F',
};

export const comicShadow = (color = colors.black, distance = 4) => ({
  shadowColor: color,
  shadowOffset: { width: distance, height: distance },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: distance,
});

export const fonts = {
  display: {
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  body: {
    fontWeight: '600',
  },
};