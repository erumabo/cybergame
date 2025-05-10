# language: es
Requisito: Objecto de estado externo

  Antecedentes:
    Dado una maquina de estados "estado externo"
    Y un contexto "{\"history\": []}"
    Y la maquina inicia
  
  Escenario: Accion Entrada
    Entonces el estado actual es "qA"
    Y el contexto es 
      """json
      {"history": ["qA.enter"]}
      """
  
  Escenario: Accion de salida
    Cuando recibe evento "tB"
    Entonces el contexto es 
    """json
    {"history": ["qA.enter", "qA.exit", "qB.enter"]}
    """
    
  Escenario: Transicion con accion
    Cuando recibe evento "tC"
    Entonces el contexto es 
    """json
      {"history": ["qA.enter", "qA2qC", "qA.exit", "qC.enter"]}
    """
  
  Escenario: Entry estado anidado
    Cuando recibe evento "tD"
    Entonces el contexto es 
    """json
      {"history": [
        "qA.enter", 
        "qA.exit",
        "qD.enter",
        "qDa.enter"
      ]}
    """
  
  Escenario: Entry estado hermano
    Cuando recibe evento "tD"
    Y recibe evento "tDb"
    Entonces el contexto es 
    """json
      {"history": [
        "qA.enter", 
        "qA.exit",
        "qD.enter",
        "qDa.enter",
        "qDa.exit",
        "qDb.enter"
      ]}
    """
  
  Escenario: Salida estado anidado
    Cuando recibe evento "tD"
    Y recibe evento "tA"
    Entonces el contexto es 
    """json
      {"history": [
        "qA.enter", 
        "qA.exit",
        "qD.enter",
        "qDa.enter",
        "qDa.exit",
        "qD.exit",
        "qA.enter"
      ]}
    """