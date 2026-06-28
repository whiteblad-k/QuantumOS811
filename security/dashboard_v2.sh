#!/bin/bash
# Dashboard v2 - Modo Menú Permanente

while true; do
    echo "----------------------------------------"
    echo "--- GESTIÓN DE SEGURIDAD NODO GX1158 ---"
    echo "1) Escanear red y mostrar estado"
    echo "2) Ver Blacklist"
    echo "3) Salir"
    read -p "Selecciona una opción [1-3]: " opcion

    case $opcion in
        1) ./security/dashboard.sh ;;
        2) 
           echo "--- CONTENIDO DE BLACKLIST ---"
           cat security/blacklist.txt 2>/dev/null || echo "Archivo vacío o inexistente."
           ;;
        3) echo "Saliendo del centro de mando..."; break ;;
        *) echo "Opción no válida. Inténtalo de nuevo." ;;
    esac
done

