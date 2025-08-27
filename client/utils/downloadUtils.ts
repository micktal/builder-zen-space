// Download utility functions for generating and downloading content

export const downloadInfographicAsImage = async () => {
  try {
    // Try to load html2canvas from CDN if not available
    if (typeof window !== 'undefined' && !(window as any).html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      document.head.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    const html2canvas = (window as any).html2canvas;

    // Find the infographic element
    const element = document.getElementById('spt-infographic');
    if (!element) {
      console.error('Infographic element not found');
      return;
    }

    // Generate canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      height: element.scrollHeight,
      width: element.scrollWidth
    });

    // Convert canvas to blob
    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SPT-Symptomes-et-Mecanismes.png';

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error generating infographic:', error);
    // Fallback: download as HTML content
    downloadInfographicAsHTML();
  }
};

export const downloadInfographicAsHTML = () => {
  const element = document.getElementById('spt-infographic');
  if (!element) {
    console.error('Infographic element not found');
    return;
  }

  // Create a complete HTML document
  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPT - Symptômes et Mécanismes</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        @media print {
            body { background-color: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${element.outerHTML}
    </div>
    <script>
        // Auto-print for convenience
        window.onload = function() {
            if (confirm('Voulez-vous imprimer l\'infographie maintenant ?')) {
                window.print();
            }
        }
    </script>
</body>
</html>`;

  // Create and download blob
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'SPT-Symptomes-et-Mecanismes.html';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Simplified download function that opens a printable version
export const downloadInfographic = () => {
  // Create a new window with the infographic content
  const element = document.getElementById('spt-infographic');
  if (!element) {
    console.error('Infographic element not found');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Veuillez autoriser les pop-ups pour télécharger l\'infographie');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPT - Symptômes et Mécanismes</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: white;
        }
        * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        .controls {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 0 4px;
        }
        .btn:hover {
            background: #2563eb;
        }
        .btn-secondary {
            background: #6b7280;
        }
        .btn-secondary:hover {
            background: #4b5563;
        }
    </style>
</head>
<body>
    <div class="controls no-print">
        <button class="btn" onclick="window.print()">🖨️ Imprimer/Enregistrer PDF</button>
        <button class="btn btn-secondary" onclick="window.close()">✕ Fermer</button>
    </div>
    ${element.outerHTML}
    <script>
        // Auto-focus print dialog
        setTimeout(() => {
            if (confirm('Voulez-vous imprimer l\'infographie maintenant ?\\n\\nTip: Utilisez "Enregistrer au format PDF" dans vos options d\'impression.')) {
                window.print();
            }
        }, 500);
    </script>
</body>
</html>`;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

// Alternative simple download as HTML file
export const downloadInfographicAsFile = () => {
  const element = document.getElementById('spt-infographic');
  if (!element) {
    console.error('Infographic element not found');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPT - Symptômes et Mécanismes</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        @media print {
            body { background-color: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${element.outerHTML}
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'SPT-Symptomes-et-Mecanismes.html';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
