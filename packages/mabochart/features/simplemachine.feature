# language: es
Requisito: Maquinas de estado anidadas

  Antecedentes:
    Dado una maquina de estados "maquina con errores"
    Y la maquina inicia
  
  Escenario: Estado incial
    Entonces el estado actual es "qA"
  
  Escenario: Transicion no existe se ignora
    Cuando recibe evento "tA"
    Entonces el estado actual es "qA"
    
  Escenario: Estado inexistente
    Cuando recibe evento "t0"
    Entonces tira error "Invalid state q0 at q0"
  
  Escenario: Estado inicial inexistente
    Cuando recibe evento "tD"
    Entonces tira error "Invalid state qDa at qD.qDa"
  
  Escenario: Estado inicial inexistente
    Cuando recibe evento "tE"
    Entonces tira error "Composite state qE has no initial state defined"
  
  
  Escenario: Transicion a un estado simple
    Cuando recibe evento "tC"
    Entonces el estado actual es "qC"
  
  Escenario: Transicion a otro estado con inicial
    Cuando recibe evento "tB"
    Entonces el estado actual es "qB.qBa"
  
  Escenario: Trancision a un estado anidado
    Cuando recibe evento "tC"
    Cuando recibe evento "tB"
    Entonces el estado actual es "qB.qBb"
  