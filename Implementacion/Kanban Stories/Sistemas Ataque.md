Before Jira

Agregar un sistema de ataque basico.
# Flow

1. Seleccionas una unidad aliada
2. Seleccionas (o arrastras el cursor a) una unidad enemiga
3. Si el enemigo esta en rango de nuestra habilidad de ataque, muestra la opcion en el menu contextual
4. Al escoger la opcion "Ataque" en el menu, se le reduce al enemino una cierta cantidad de puntos de salud

# Detalles técnicos

## [x] Validar opciones en menu contextual

Actualmente se muestran todas las opciones en el menu, aun si no tienen sentido.
Vamos a cambiar cada sistema/habilidad a un objecto que tenga 3 funciones:
1. register(controller) => Agrega este sistema al map de sistemas en el controlador, con un handler, id, event listeners, etc...
2. test(context) => Prueba si este sistema tiene sentido en el context actual, ej: si la unidad se puede mover a la casilla seleccionada, si el objetivo esta en rango de ataque, etc...
3. execute(context) => Ejecuta el sistema en el contexto dado

## [x] Separar menu de sistemas

Actualmente la opcion que aparece en el menu es el nombre del sistema.
Vamos a separar eso con un objecto sistema mas complejo.
En el controlador no hay un objecto normal, si no un array de sistemas, cada uno con un ID numérico único (row#).
En cada objecto sistema hay un nombre de display que se una para mostrar en el menu, junto a cualquier otra propiedad interna necesaria.

## [X] Configuracion de Unidades

Ahora cada unidad aliada puede usar todos los sistemas configurados en el controlador.
El cambio es agregar a cada unidad en el .tmx una propiedad llamada "habilidades", que es un array csv de habilidades.
Cada habilidad se corresponde a un nombre interno unico de los sistemas.

La lista de habilidades en el tmx se copia a una propiedad en el objecto/modelo Unit, junto a sus stats como HP, ATK, DEF, MP, etc...

Al activar una unidad y marcar un objetivo, se toma la lista de habilidades de la unidad, se prueba cada sistema, y si son validos para ese contexto entonces se muestran en el menu contextual.

## [X] Sistemas ataque

### Ataque melee

Al seleccionar una unidad en rango (Chev 1), al seleccionar el ataque, vamos a registrar daño al enemigo.
Daño = (Ataque mio + Ataque del Item en mano) - (Def Enemigo + Defensa Armadura enemigo)

Items y armaduras van en otros stories.
También, ciertos items pueden ignorar defensa o armadura, como un mazo o items de daño magico.

Version 2: El cálculo de daño se define por el ítem?
### Ataque a rango

Mas tipos de ataques y habilidades van en otros stories.
No existe "Ataque genérico a rango", en su lugar tendremos "Bola de fuego", "Arco", "Summon", etc...