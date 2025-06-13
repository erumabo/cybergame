Actor: Jugador

# Flujo normal

1. Estando en el estado inactivo del juego
2. Jugador selecciona una unidad en el mapa
3. El juego muestra las opciones de acción para esa unidad:
	- Muestra botones para cada acción disponible con 1 unidad (usar item en mi, autocuracion, effecto a todo el mapa, etc...)
	- Muestra un _overlay_ para todo _tile_/unidad/object en rango de acción
4. Jugador selecciona un _tile_ en el rango de acción.
    - Si se selecciona una unidad u objecto, es un flujo separado.
5. El juego muestra opciones de acción sobre el _tile_ seleccionado:
	- Muestra botones para cada acción.
	- Si el tile no tiene acción "Moverse" disponible, igual se muestran los botones pero se pasa a otro flujo.
6. El jugador selecciona la acción "Moverse"
7. El juego genera un camino hasta el _tile_ objectivo y mueve la unidad.
8. La unidad se mantiene activa y se actualizan las opciones disponibles desde esta posición.

## Flujo alterno 3a

El usuario vuelve a marcar la unidad activa, en este caso se deselecciona y se regresa al estado inactivo.

## Flujo alterno 3b

El usuario selecciona un _tile_ __fuera__ del rango de acción, en este caso no pasa nada y el juego sigue en el paso 3 del flujo normal.


## Flujo alterno 5a

El usuario selecciona otro _tile_ en el rango de acción, en este caso se muestran las opciones para la nueva selección y continua el flujo normal en el paso 4.

## Flujo alterno 5b

El usuario vuelve a seleccionar el mismo _tile_, en este caso el tile se desmarca y regresa al estado del paso 3 del flujo normal.