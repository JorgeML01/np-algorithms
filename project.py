usuarios_claves = {"admin":"12345"}

def crear_cuenta():
    print("\n\nCREACIÓN DE CUENTA")

    while True:
        nuevo_usuario = input("Ingrese el nombre de usuario: ")

        if nuevo_usuario in usuarios_claves:
            print("\n\nEl nombre de usuario ya existe")
        else:
            break
    
    nueva_clave = input("Ingrese la contraseña: ")
    usuarios_claves[nuevo_usuario] = nueva_clave
    print("\n\nEl usuario se ha creado exitosamente")
    
def iniciar_sesion():
    print("\n\nINICIANDO SESIÓN")
    
    while True:
        usuario = input("Ingrese su usuario:")
        clave = input("Ingrese su contraseña:")

        if usuario in usuarios_claves and usuarios_claves[usuario] == clave:
            print("\n\nBIENVENIDO")
            break
        else:
            print("\n\nLas credeciales son incorrectas")

def ejercicio_1():
    print("\n\n*** EJERCICIO 1 ***")

    sueldoBase = 200

    listaNombre = []
    listaCargo = []
    listaMonto = []

    listaBonificacion = []

    listaSueldoTotal = []
    sueldoMayor = 0


    for i in range(5):
        print("\nVendedor #" + str(i+1))
        nombre = input("Ingrese el nombre de usuario: ")
        cargo = input("Ingrese el cargo: ")
        monto = float(input("Ingrese el monto: "))

        listaNombre.append(nombre)
        listaCargo.append(cargo)
        listaMonto.append(monto)


    for i in range(5):
        if listaMonto[i] <= 1000 and listaMonto[i] >= 0:
            bonificacion = 0
        elif listaMonto[i] <= 5000 and listaMonto[i] >= 1001:
            bonificacion = 3
        elif listaMonto[i] <= 20000 and listaMonto[i] >= 5001:
            bonificacion = 5
        elif listaMonto[i] >= 20001:
            bonificacion = 8

        totalBonificacion = listaMonto[i] * (bonificacion / 100)
        listaBonificacion.append(totalBonificacion)

    
    for i in range(5):
        sueldo = listaMonto[i] + listaBonificacion[i] + sueldoBase
        listaSueldoTotal.append(sueldo)
        
    sueldoMayor = listaSueldoTotal[0]
    indiceMayor = 0
    for i in range(5):
        if listaSueldoTotal[i] > sueldoMayor:
            sueldoMayor = listaSueldoTotal[i]
            indiceMayor = i

    
    print("\n\nVENDEDOR CON MAYOR SUELDO GENERADO")
    print("Nombre:", listaNombre[indiceMayor])
    print("Bonificación:", listaBonificacion[indiceMayor])
    print("Sueldo Total:", listaSueldoTotal[indiceMayor])


def ejercicio_2():
    print("\n\nEJERCICIO 2")

def ejercicio_3():
    print("\n\nEJERCICIO 3")

def menu_principal():
    
    while True:
        print("\n\nMENÚ PRINCIPAL")
        print("1. EJERCICIO 1")
        print("2. EJERCICIO 2")
        print("3. EJERCICIO 3")
        print("4. SALIR")

        opcion = input("Elija una opción: ")

        if opcion == "1":
            ejercicio_1()
        elif opcion == "2":
            ejercicio_2()
        elif opcion == "3":
            ejercicio_3()
        elif opcion == "4":
            print("\n\nSALIENDO...")
            break
        else:
            print("\n\nOPCIÓN INVÁLIDA")


if __name__ == "__main__":
    while True:
        print("\n\nBIENVENIDO AL SISTEMA")
        print("1. Crear cuenta")
        print("2. Iniciar sesión")
        print("3. Salir")

        eleccion = input("Elija una opción: ")

        if eleccion == "1":
            crear_cuenta()
        elif eleccion == "2":
            iniciar_sesion()
            menu_principal()
        elif eleccion == "3":
            print("\n\nSaliendo...")
            break
        else:
            print("\n\nOpción inválida")