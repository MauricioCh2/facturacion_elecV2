export class colorConsole {
  static colors = {
    'RESET': '\x1b[0m',
    'RED': '\x1b[31m',
    'GREEN': '\x1b[32m',
    'YELLOW': '\x1b[33m',
    'BLUE': '\x1b[34m',
    'MAGENTA': '\x1b[35m',
    'CYAN': '\x1b[36m',
    'WHITE': '\x1b[37m',
    'ORANGE': '\x1b[38;5;208m'
  };

  static printf(message) { // para pasarle el color en el propio mensaje
    if (!this.colors[color]) {
      console.log(`Color no soportado: ${color}. Los colores soportados son: ${Object.keys(this.colors).join(', ')}`);
      return;
    }
    console.log(this.colors[color] + message + this.colors['RESET']);
  }
  static printc(message, color) { //para pasarlo como un parametro aparte
    color = color.toUpperCase();
    if (!this.colors[color]) {
      console.log(`Color no soportado: ${color}. Los colores soportados son: ${Object.keys(this.colors).join(', ')}`);
      return;
    }
    console.log(this.colors[color] + message + this.colors['RESET']);
  }
}
