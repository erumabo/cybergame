JIRA:PJ-4

Sensor detection delay: Increase when moving

FSM:
Returning home
Patrolling (puede ser estacionario)
Detecting (reduce un contador interno antes de decir "Ey! Te veo")
Pursue:
  en este estado, todavía puede trackear un objectivo conocido detrás de obstáculos (object permanece), pero si no ve al objetivo después de cierto tiempo entonces lo pierde de vista.
  Al perder a un enemigo de vista, regresa a Patrolling pero en la nueva posición
  Después de patrullar cierto tiempo sin encontrar a un objetivo nuevo, regresa a su casa
Attack
Getting damage