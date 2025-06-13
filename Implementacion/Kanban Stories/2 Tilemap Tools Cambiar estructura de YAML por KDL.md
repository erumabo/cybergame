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