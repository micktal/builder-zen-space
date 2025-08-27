// Download utility functions for generating and downloading content

export const downloadInfographicAsImage = async () => {
  try {
    // Dynamically import html2canvas only when needed
    const html2canvas = (await import('html2canvas')).default;
    
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
    canvas.toBlob((blob) => {
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

export const downloadInfographicAsPDF = async () => {
  try {
    // Try to use jsPDF if available
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById('spt-infographic');
    if (!element) {
      console.error('Infographic element not found');
      return;
    }

    // Generate canvas
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 1.5,
      useCORS: true
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download PDF
    pdf.save('SPT-Symptomes-et-Mecanismes.pdf');

  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to image download
    downloadInfographicAsImage();
  }
};

// Main download function that tries multiple formats
export const downloadInfographic = async () => {
  try {
    await downloadInfographicAsImage();
  } catch (error) {
    console.error('Image download failed, trying HTML:', error);
    downloadInfographicAsHTML();
  }
};
