---
tags:
  - kanban
  - mvp
  - tech-debt
---
Si, en el handler de un evento, el contexto cambia (set Active Unit, unset target, etc), no hay forma de detectar eso para realizar una acción, solo podemos repetir el mismo código en cada estado.

# Idea

## Reactive
Cambiar el contexto por un objeto más simple, sacar el controller y scene, y envolver ese contexto con Alpine.Reactive o un Proxy, para disparar eventos.
Problema: esto sería solo para efectos secundarios que no cambien el estado del sistema, pero se podría terminar por abusar

## Refractor States
Si estamos repitiendo el mismo código en varios handlers de la máquina máquina estados, tal vez se podría reacomodar la máquina para unir estados.
Pro: igual vamos a reajustar la máquina por que hay muchas transiciones hermanas duplicadad
Con: Puede cambiar mucho la forma de la máquina, y dejar se ser legible

## Common transition states <<<
Similar a la estrategia previa, en lugar de unir estados en un estado padre con una transición común, podemos unir las transiciones en un estado objetivo que hace la lógica duplicada en su hook de entrada 