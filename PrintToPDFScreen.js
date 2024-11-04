import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function PrintToPDFScreen() {
    const [pdfUri, setPdfUri] = useState(null);

    // Sample HTML content for PDF generation
    const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #333; }
                    p { color: #555; }
                </style>
            </head>
            <body>
                <h1>Hello from Expo!</h1>
                <p>This is a sample PDF document generated from HTML content.</p>
            </body>
        </html>
    `;

    // Function to create and save the PDF
    const printToPdf = async () => {
        try {
            // Generate the PDF from HTML content
            const { uri } = await Print.printToFileAsync({ html: htmlContent });

            // Define the path to save the PDF
            const pdfFileUri = `${FileSystem.documentDirectory}sample.pdf`;
            await FileSystem.moveAsync({
                from: uri,
                to: pdfFileUri,
            });

            setPdfUri(pdfFileUri);
            alert("Success", "PDF generated successfully!");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error", "Could not generate PDF.");
        }
    };

    // Function to share the PDF
    const sharePdf = async () => {
        if (!pdfUri) {
            alert("No PDF", "Generate the PDF first.");
            return;
        }

        try {
            await Sharing.shareAsync(pdfUri);
        } catch (error) {
            console.error("Error sharing PDF:", error);
            alert("Error", "Could not share PDF.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Print HTML as PDF</Text>
            <Button title="Generate PDF" onPress={printToPdf} />
            {pdfUri && (
                <>
                    <Button title="Open PDF" onPress={() => alert("PDF Path", `Your PDF is saved at: ${pdfUri}`)} style={styles.button} />
                    <Button title="Share PDF" onPress={sharePdf} style={styles.button} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
});
