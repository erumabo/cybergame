# Idea
Reflejos en superficies como agua y cristal

# Implementation
Los reflejos son con un duplicado de las entidades, estan invertidos y desplazados 1 tile abajo (y+)
El orden de capas es: 
[Entities]
[Soil]
[Entity Reflection]
[Reflective surface]
De forma tal que el suelo normal cubre el duplicado de reflejo normalmente.

## Detalles tecnicos
1. Agregar a la configuración de tiles si es reflectivo o no, para el orden de las capas
2. Ordenar las capas de tiles y objetos  https://annoraaq.github.io/grid-engine/p/character-layers/