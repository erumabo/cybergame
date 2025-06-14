# language: es
Requisito: Maquinas de estado anidadas, los eventos se procesan del estado mas interno al externo

  Antecedentes:
    Dado una maquina de estados "glob patterns"
    Y la maquina inicia
    Y recibe evento "tE"
  
  Escenario: Estado incial
    Entonces el estado actual es "qE.trap"
  
  Escenario: Transicion capturada por el estado interno
    Cuando recibe evento "t.A"
    Entonces el estado actual es "qA"
  
  Escenario: Transicion no capturada por el estado interno, escala
    Cuando recibe evento "t.N"
    Entonces el estado actual es "qC"
  
  Escenario: Transicion no capturada por ningun estado
    Cuando recibe evento "noop"
    Entonces el estado actual es "qE.trap"
  
  