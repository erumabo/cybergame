JIRA:PJ-3

Ahora, los atributos del personaje como Ataque, vida, defensa, salen de la definición del mapa en  tiled, pero esos atributos deberían ligados a la historia y no al mapa, ya que van a cambiar con forme el jugador avanza.

Los atributos de cada personaje, tanto del jugador como de los enemigos, se deberían sacar del estado de Ink, usando variables del entorno.

Al iniciar un mapa, se cargan los personajes que van a participar en la escena del mapa, y para cada uno se cargan los stats desde ink

[Getting and setting ink variables](https://github.com/y-lohse/inkjs/tree/master?tab=readme-ov-file#getting-and-setting-ink-variables)

Algo importante a definir es la estructura:
- Guardamos un json con todos los stats del personaje?
- Guardamos una variable por personaje-stat?


---
Refs
1. https://github.com/y-lohse/inkjs/tree/master?tab=readme-ov-file#getting-and-setting-ink-variables
2. https://github.com/y-lohse/inkjs/blob/master/docs/compiler-differences.md
3. https://github.com/inkle/ink/blob/master/Documentation/RunningYourInk.md#getting-started-with-the-runtime-api
4. https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md
5. https://stackoverflow.com/questions/13272406/convert-string-with-commas-to-array
