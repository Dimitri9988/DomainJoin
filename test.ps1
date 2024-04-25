# Domain-Join-Skript
 
# Domänenadministrator-Anmeldeinformationen
$domainAdminUsername = Read-Host 'Name des Domainadmins'
$domainAdminPassword = Read-Host 'Passwort des Domainadmins' -AsSecureString -Force
$domain = Read-Host 'Domain Name Eingeben'
$ou = Read-Host 'Organisationseinheit angeben (Beispielpfad: OU=BeispielOU,DC=Domain,DC=com)
)' 
 
# Automatisch Computernamen auslesen
$computerName = $env:COMPUTERNAME
 
# Verbindung mit der Domäne herstellen 
Add-Computer -DomainName $domain -Credential (New-Object System.Management.Automation.PSCredential($domainAdminUsername, $domainAdminPassword)) -ComputerName $computerName -Restart -Force -OUPath $ou

