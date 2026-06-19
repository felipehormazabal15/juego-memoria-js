# Juego de Memoria

## Uso de IA

La IA me ayudó a generar una estructura inicial para el proyecto y a proponer funciones para el manejo de cartas, renderizado y mezcla del mazo.

Sin embargo, el código generado inicialmente tenía errores importantes. El principal problema era la falta de un bloqueo adecuado del tablero, lo que permitía abrir una tercera carta mientras se resolvía una pareja. También encontré malas prácticas como comparar cartas leyendo el DOM y el uso de innerHTML para mostrar información ingresada por el usuario.

## Decisiones de diseño

### Delegación de eventos

Utilicé un único listener sobre el contenedor del tablero. Esto evita crear un listener por cada carta, simplifica el código y mejora el rendimiento cuando el tablero se vuelve a renderizar.

### Uso de textContent

Utilicé textContent para mostrar mensajes en lugar de innerHTML. De esta manera evito vulnerabilidades XSS y aseguro que cualquier texto ingresado se muestre como contenido plano.

## Mejoras futuras

Si tuviera más tiempo implementaría:

- Cronómetro.
- Guardado de récords con localStorage.
- Animaciones de volteo.
- Sistema de mejores puntajes.

## Controles

- Click: voltear carta.
- Tecla R: reiniciar partida.
- Selector de dificultad: cambiar cantidad de parejas.

## Tecnologías

- HTML5
- CSS3
- JavaScript Vanilla

No se utilizaron frameworks ni librerías externas.