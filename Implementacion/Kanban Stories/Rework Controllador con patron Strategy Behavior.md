Before Jira

# Estado actual
El controlador maneja todo input, consulta el estado y contexto (objecto estado, self), y escoge que transición usar en la maquina.
La maquina de estados solo es un flag, y ejecuta acciones inmediatas en respuesta.

# Cambio
1. El objecto de estado/contexto se separa en una interfaz separada, DTO
2. Vamos a unir todos los callbacks de input en uno
3. Crear subclasses/POJOs estado que tienen toda la lógica para procesar eventos en un estado determinado ( StateHandler )
4. La maquina, al entrar a un estado nuevo, cambia el objecto StateHandler en el controlador
 {UI} >evento> {Controlador} >delega> {StateHandler} >transición?> {FSM}

# Actualización

Al final, lo que se hizo fue dividir los eventos en {PointerDown, PointerUp, PointerDrag, PointerHover} x {Ally, Map, Enemy, Self}, quien decide que evento es creado es el UI
Y cada estado maneja los eventos de forma mas granular.
No hay un StateHandler, todo es manejado por FSM
 {UI} >evento> {Controlador} >delega> {FSM}