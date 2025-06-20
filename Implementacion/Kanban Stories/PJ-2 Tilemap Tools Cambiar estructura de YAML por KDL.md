JIRA:PJ-2

# Problema
La estructura yaml actual permite editar los tilemaps de forma mas simple que un json.
Tambien podemos recusar tilesets, y cada capa es un archivo independiente manejable.
Pero todavia hay problemas con estructuras anidadas, como los objetos en la capa de objectos:
- capa
	- objecto A
		- Props objecto A
	- objecto B
		- Props objecto B
	- objecto B
		- Props objecto C
Por la naturaleza de yaml (y json, y otros similares), mientras mas profundo vayamos mas extenso se vuelve el documento y mas molesto editarlo

# Idea
Cambiar la estructura por KDL
KDL puede usar la misma estructura que TMX (.xml), y convertirla a un json para exportar.
# Soporte de archivos

## Input
| Format | Map | Tileset | Single Layer | Template Object |
| ------ | --- | ------- | ------------ | --------------- |
| Json   | Si  | Si      |              | Si              |
| KDL    | wip | Si      |              | Si              |
| YAML   | Si  | Si      |              | Si              |
| CSV    |     |         | Si           |                 |
| TMX    | *   | *       |              | *               |
Se puede importar un mapa en cualquier formato JSON, KDL o YAML.

Adicional, usando el atributo `source` del Tileset, se puede importar un tileset desde otro archivo json, kdl o yaml separado.

Para las capas de tipo `tilelayer`, si existe un archivo `Layers/base_[Layer name].csv` en el mismo directorio que el mapa, se usa ese csv como data de la capa, sobreescribe la data existente.

Para las capas de objetos tiled no soporta referencias a tilesets embeb o definidos en el mapa, la lista de tilesets del mapa y del objecto por separado.
Dado que Phaser ocupa todo embed nosotros si vamos a soportar referencias cruzadas:
  - Si el tileset en el object template solo declara un name se asume que ese tileset esta en el tilemap, así que vamos a tomar ese tileset `firstgid` y agregarlo al gid del objecto, y el objeto embed
  - Si declara un `firstgid` y `source`, no-op (equivalente a Tiled)
  - Si no hay tileset, y es un objeto de geometría, procedemos a hacer embed
  - Si no hay tileset, y es un objecto tile, error
  - Si el tileset solo declara nombre, sin source, y el tileset no existe en el mapa, error

## Output
| Format | Map               | Tileset | Single Layer | Template Object |
| ------ | ----------------- | ------- | ------------ | --------------- |
| JSON   | Si (all embedded) | *       |              | *               |
| KDL    | *                 | *       |              | *               |
| YAML   | *                 | *       |              | *               |
| CSV    |                   |         | *            |                 |
| TMX    | *                 | *       |              | *               |
Por ahora, el único formato de salida es json.
A futuro quiero agregar kdl y yaml, con la posibilidad de exportar un tileset o capa unica.

El JSON de salida tiene todo embed: tilesets, layers, objects, ..., ya que Phaser no soporta referencias a archivos externos y espera que un tilemap sea enteramente autocontenido

--- 
refs
1. https://github.com/mholt/PapaParse/blob/master/README.md#papa-parse-for-node
2. https://github.com/kdl-org/kdl?tab=readme-ov-file
3. https://kdl.dev/kdljs/0.3/
4. https://doc.mapeditor.org/en/stable/manual/export-generic/
5. https://doc.mapeditor.org/en/stable/reference/tmx-map-format/#map
6. https://doc.mapeditor.org/en/stable/reference/tmx-map-format/#tmx-tileset-tile
