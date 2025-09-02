Set WshShell = WScript.CreateObject("WScript.Shell")
Set WshSysEnv = WshShell.Environment("PROCESS")

WScript.Echo "=== Vérification de Node.js ==="
WScript.Echo ""

' Vérifier si Node.js est dans le PATH
nodePath = WshShell.Exec("where node").StdOut.ReadAll()

If nodePath <> "" Then
    WScript.Echo "[SUCCÈS] Node.js est installé"
    WScript.Echo "Emplacement : " & nodePath
    
    ' Obtenir la version de Node.js
    Set nodeVersion = WshShell.Exec("node --version")
    WScript.Echo "Version : " & nodeVersion.StdOut.ReadAll()
Else
    WScript.Echo "[ERREUR] Node.js n'est pas installé ou n'est pas dans le PATH"
End If

WScript.Echo ""
WScript.Echo "=== Variables d'environnement ==="
WScript.Echo "PATH: " & WshSysEnv("PATH")

WScript.Echo ""
WScript.Echo "Appuyez sur une touche pour continuer..."
WScript.StdIn.Read(1)
