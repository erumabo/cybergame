# language: es
Requisito: Match transiciones usando glob patterns

  Antecedentes:
    Dado una maquina de estados "glob patterns"
    Y la maquina inicia
  
  Escenario: Estado Base
    Entonces el estado actual es "qA"
    
  Escenario: Trancision normal
    Cuando recibe evento "tB"
    Entonces el estado actual es "qB"
    
  Escenario: Glob t.* 1 
    Cuando recibe evento "t.E"
    Entonces el estado actual es "qC"
  
  Escenario: Glob t.* 2
    Cuando recibe evento "t.D"
    Entonces el estado actual es "qC"
  
  Escenario: Glob t.*.D 1 
    Cuando recibe evento "t.E.D"
    Entonces el estado actual es "qD"
  
  Escenario: Glob t.*.D 2
    Cuando recibe evento "t.D.D"
    Entonces el estado actual es "qD"
  
  Escenario: Glob no match
    Cuando recibe evento "t.D.C"
    Entonces el estado actual es "qA"