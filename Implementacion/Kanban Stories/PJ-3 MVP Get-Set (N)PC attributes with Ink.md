JIRA:PJ-3

Ahora, los atributos del personaje como Ataque, vida, defensa, salen de la definición del mapa en  tiled, pero esos atributos deberían ligados a la historia y no al mapa, ya que van a cambiar con forme el jugador avanza.

Los atributos de cada personaje, tanto del jugador como de los enemigos, se deberían sacar del estado de Ink.

[Getting and setting ink variables](https://github.com/y-lohse/inkjs/tree/master?tab=readme-ov-file#getting-and-setting-ink-variables)
# Implementacion

En el archivo del tilemap.json, no vamos a especificar que personajes estan en que posición, en su lugar vamos a usar objectos tipo Point que marcan los lugares donde pueden aparecer tanto personajes como enemigos:

```
template <Point>PlayerSpawn(id)
template <Point>EnemySpawn(id, type)
```

| PlayerSpawn(id=0) |                   |                  |                  |
| ----------------- | ----------------- | ---------------- | ---------------- |
|                   | PlayerSpawn(id=1) |                  |                  |
|                   |                   |                  | EnemySpawn(id=3) |
|                   |                   | EnemySpawn(id=4) | EnemySpawn(id=2) |

Al cargar un mapa, los personajes de la party se van acomodando en los espacios dispuestos, segun orden de prioridad (el personaje principal va en el id mas algo, el segundo en el segundo id, etc...)
`?? Pueden haber mas personajes en el party que espacios disponibles?`

La información de cuales personajes estan en el party,  y cada stat de ellos, se almacena en variables de Ink.

- Usar un JSON o KDL (como string) con toda la informacion del party:
	- JSON: facil de manejar desde el juego, molesto de setear en el ink.
	- KDL: requiere una biblioteca nueva, y un parser adicional, pero podemos agregar contenido structured en ink de forma facil. Ademas, posiblemente vamos a incluir kdljs como dependencia para poder abrir mapas kdl directamente.

Al terminar un mapa, las variables se actualizan de regreso en ink (eso da paso a que un jugador pueda cerrar un mapa y reintentarlo varias veces).

## Tareas
- [ ] Agregar templates de personajes y enemigos a Ink JIRA:PJ-30
- [ ] Cambiar personajes por points en Tiled JIRA:PJ-31
- [ ] Spawn de personajes y enemigos en los puntos de spawn JIRA:PJ-32
- [ ] Obtener lista de personajes desde ink JIRA:PJ-33
- [ ] Obtener stats de personajes desde ink JIRA:PJ-34
- [ ] Guardar stats de personajes en ink JIRA:PJ-35

---
Refs
1. https://github.com/y-lohse/inkjs/tree/master?tab=readme-ov-file#getting-and-setting-ink-variables
2. https://github.com/y-lohse/inkjs/blob/master/docs/compiler-differences.md
3. https://github.com/inkle/ink/blob/master/Documentation/RunningYourInk.md#getting-started-with-the-runtime-api
4. https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md
5. https://stackoverflow.com/questions/13272406/convert-string-with-commas-to-array
