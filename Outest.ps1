# PowerShell-Skript zum Abrufen aller Organisationseinheiten (OUs) aus einer Active Directory-Domäne
 
# Importieren des Active Directory-Moduls
Import-Module ActiveDirectory
 
# Domänenname eingeben
$domainName = Read-Host 'Geben Sie den Namen der Active Directory-Domäne ein'
 
# Abrufen aller OUs aus der Domäne
$ous = Get-ADOrganizationalUnit -Filter * -Server $domainName
 
# Ausgabe der gefundenen OUs
$ous