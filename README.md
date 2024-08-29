
# VirusDetect
Esta es una aplicación diseñada para analizar archivos utilizando la API de VirusTotal y mostrar los resultados del análisis de manera interactiva. Este proyecto facilita la identificación de posibles amenazas en archivos cargados.

## Installation

Para utilizar mi proyecto utiliza los siguiente comandos:

```bash
git clone https://github.com/georgeacp/VirusDect.git
cd VirusDect
npm install
code .
```
Antes de intentar lanzarlo debes reemplazar en UploadFile.jsx y Report.jsx:
```bash
'x-apikey': 'tu-clave-api' // Reemplaza con tu clave API de virus total
```
Por ultimo utiliza 
```bash
npm run dev
```