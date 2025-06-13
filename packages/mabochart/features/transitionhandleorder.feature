# language: es
Requisito: Maquinas de estado anidadas, los eventos se procesan del estado mas interno al externo

  Antecedentes:
    Dado una maquina de estados "maquina con errores"
    Y la maquina inicia
  
  Escenario: Estado incial
    Entonces el estado actual es "qA"
  
  Escenario: Transicion no existe se ignora
    Cuando recibe evento "tA"
    Entonces el estado actual es "qA"
    