// server.js
const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

// Route for executing the PowerShell script
app.post('/run-script', (req, res) => {
  // Extract variable values from the request body
  const { domainAdminUsername, domainAdminPassword, domain, buttonPressed,OU } = req.body;

  console.log(buttonPressed, OU)

  // PowerShell script as a string
  const powershellScript = `
  # Domain-Join-Skript 
  Write-Host "Starting PowerShell script..."

  # Domänenadministrator-Anmeldeinformationen
  $domainAdminUsername = "${domainAdminUsername}"
  $domainAdminPassword = ConvertTo-SecureString "${domainAdminPassword}" -AsPlainText -Force
  $domain = "${domain}"

  # Domänenadministrator-Anmeldeinformationen
  Write-Host "Domain Admin Username: $domainAdminUsername"
  Write-Host "Domain Admin Password: $domainAdminPassword"
  Write-Host "Domain: $domain"

  # Automatisch Computernamen auslesen
  $computerName = $env:COMPUTERNAME
  Write-Host "Computer Name: $computerName"

  # Verbindung mit der Domäne herstellen 
  Add-Computer -DomainName $domain -Credential (New-Object System.Management.Automation.PSCredential($domainAdminUsername, $domainAdminPassword)) -ComputerName $computerName -Restart -Force

  Write-Host "PowerShell script completed."
  `;




  // Execute the PowerShell script
  const powershell = spawn('powershell.exe', ['-'], { shell: true });

  // Send the PowerShell script as input to the PowerShell process
  powershell.stdin.write(powershellScript);
  powershell.stdin.end();

  powershell.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  powershell.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  powershell.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(`PowerShell script executed with exit code ${code}`);
  });
});

// Start the web server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
