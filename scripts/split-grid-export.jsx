/*
 * Split 2x2 Grid Images and Export for Web
 * 
 * This script takes images that contain a 2x2 grid of 4 images,
 * splits them into individual images, and exports as WebP or PNG.
 * 
 * Usage: File > Scripts > Browse... > select this script
 */


// Configuration
var config = {
    outputFormat: "png",   // "webp" or "png" (png is more reliable)
    webpQuality: 80,       // 0-100 for WebP
    pngQuality: 9,         // 0-9 for PNG (9 = max compression)
    outputFolder: null,    // null = same folder as source, or specify path
    prefix: "",            // prefix for output filenames
    suffix: "_part",       // suffix before number (e.g., "image_part1.webp")
    resize: false,         // resize individual images after split
    resizeWidth: 800,      // target width if resize is true
    resizeHeight: 800      // target height if resize is true
};

// Position names for the 4 quadrants
var positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

function main() {
    // Check if Photoshop has open documents
    if (app.documents.length === 0) {
        // No document open, prompt to select files
        var files = File.openDialog("Select 2x2 grid images to split", "*.jpg;*.jpeg;*.png;*.tif;*.tiff;*.psd", true);
        if (!files || files.length === 0) {
            alert("No files selected.");
            return;
        }
        processFiles(files);
    } else {
        // Process ALL open documents
        var docCount = app.documents.length;
        var result = confirm("Process all " + docCount + " open document(s)?\n\nClick 'Yes' to process all open images.\nClick 'No' to select files from disk instead.");
        
        if (result) {
            // Store references to all open docs (iterate backwards to avoid index issues)
            var docsToProcess = [];
            for (var i = 0; i < app.documents.length; i++) {
                docsToProcess.push(app.documents[i]);
            }
            
            // Process each document
            for (var j = 0; j < docsToProcess.length; j++) {
                app.activeDocument = docsToProcess[j];
                processDocument(docsToProcess[j]);
            }
        } else {
            var files = File.openDialog("Select 2x2 grid images to split", "*.jpg;*.jpeg;*.png;*.tif;*.tiff;*.psd", true);
            if (files && files.length > 0) {
                processFiles(files);
            }
        }
    }
    
    alert("Processing complete!");
}

function processFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file instanceof File) {
            var doc = app.open(file);
            processDocument(doc);
            doc.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
}

function processDocument(doc) {
    var originalName = doc.name.replace(/\.[^\.]+$/, ""); // Remove extension
    
    // Try to get source path, handle unsaved documents
    var sourcePath = null;
    try {
        sourcePath = doc.path;
    } catch (e) {
        // Document hasn't been saved - path doesn't exist
        sourcePath = null;
    }
    
    // Determine output folder
    var outputFolder;
    if (config.outputFolder) {
        outputFolder = new Folder(config.outputFolder);
    } else if (sourcePath) {
        outputFolder = sourcePath;
    } else {
        // Prompt user to select output folder
        outputFolder = Folder.selectDialog("Select output folder for: " + doc.name);
        if (!outputFolder) {
            alert("No output folder selected. Skipping: " + doc.name);
            return;
        }
    }
    
    if (!outputFolder.exists) {
        outputFolder.create();
    }
    
    // Get document dimensions
    var docWidth = doc.width.as("px");
    var docHeight = doc.height.as("px");
    
    // Calculate quadrant dimensions
    var quadWidth = Math.floor(docWidth / 2);
    var quadHeight = Math.floor(docHeight / 2);
    
    // Define the 4 quadrant regions [x, y, width, height]
    var quadrants = [
        [0, 0, quadWidth, quadHeight],                    // top-left
        [quadWidth, 0, quadWidth, quadHeight],            // top-right
        [0, quadHeight, quadWidth, quadHeight],           // bottom-left
        [quadWidth, quadHeight, quadWidth, quadHeight]    // bottom-right
    ];
    
    // Process each quadrant
    for (var i = 0; i < 4; i++) {
        var q = quadrants[i];
        extractAndSave(doc, q[0], q[1], q[2], q[3], outputFolder, originalName, i + 1);
    }
}

function extractAndSave(doc, x, y, width, height, outputFolder, baseName, index) {
    // Duplicate the document
    var dupDoc = doc.duplicate();
    
    // Set selection to the quadrant
    var selRegion = [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height]
    ];
    dupDoc.selection.select(selRegion);
    
    // Crop to selection - bounds array: [left, top, right, bottom]
    var cropBounds = [
        new UnitValue(x, "px"),
        new UnitValue(y, "px"),
        new UnitValue(x + width, "px"),
        new UnitValue(y + height, "px")
    ];
    dupDoc.crop(cropBounds);
    
    // Optional resize
    if (config.resize) {
        dupDoc.resizeImage(
            new UnitValue(config.resizeWidth, "px"),
            new UnitValue(config.resizeHeight, "px"),
            null,
            ResampleMethod.BICUBICSHARPER
        );
    }
    
    // Flatten for export
    dupDoc.flatten();
    
    // Build output filename
    var outputName = config.prefix + baseName + config.suffix + index;
    var outputFile;
    
    // Export based on format
    if (config.outputFormat.toLowerCase() === "webp") {
        outputFile = new File(outputFolder + "/" + outputName + ".webp");
        saveAsWebP(dupDoc, outputFile, config.webpQuality);
    } else {
        outputFile = new File(outputFolder + "/" + outputName + ".png");
        saveAsPNG(dupDoc, outputFile);
    }
    
    // Close without saving
    dupDoc.close(SaveOptions.DONOTSAVECHANGES);
}

function saveAsWebP(doc, file, quality) {
    // Try multiple WebP export methods for compatibility
    try {
        // Method 1: Quick Export as WebP (PS 2022+)
        var idsave = stringIDToTypeID("save");
        var desc = new ActionDescriptor();
        var descWebP = new ActionDescriptor();
        
        descWebP.putEnumerated(stringIDToTypeID("compression"), stringIDToTypeID("webpCompression"), stringIDToTypeID("compressionLossy"));
        descWebP.putInteger(stringIDToTypeID("quality"), quality);
        
        desc.putObject(stringIDToTypeID("as"), stringIDToTypeID("WebPFormat"), descWebP);
        desc.putPath(stringIDToTypeID("in"), file);
        desc.putBoolean(stringIDToTypeID("copy"), true);
        
        executeAction(idsave, desc, DialogModes.NO);
    } catch (e1) {
        try {
            // Method 2: Export As WebP
            var descExport = new ActionDescriptor();
            descExport.putEnumerated(charIDToTypeID("FlTy"), stringIDToTypeID("WebPFormat"), stringIDToTypeID("WebPFormat"));
            descExport.putInteger(stringIDToTypeID("Qlty"), quality);
            descExport.putPath(charIDToTypeID("In  "), file);
            
            executeAction(stringIDToTypeID("export"), descExport, DialogModes.NO);
        } catch (e2) {
            // Fallback: Save as PNG
            $.writeln("WebP export failed, saving as PNG instead: " + e2.message);
            var pngFile = new File(file.toString().replace(/\.webp$/i, ".png"));
            saveAsPNG(doc, pngFile);
        }
    }
}

function saveAsPNG(doc, file) {
    var pngOptions = new PNGSaveOptions();
    pngOptions.compression = config.pngQuality;
    pngOptions.interlaced = false;
    
    doc.saveAs(file, pngOptions, true, Extension.LOWERCASE);
}

// Alternative WebP save using Save For Web (better compatibility)
function saveForWeb(doc, file, format) {
    var sfwOptions = new ExportOptionsSaveForWeb();
    
    if (format === "png") {
        sfwOptions.format = SaveDocumentType.PNG;
        sfwOptions.PNG8 = false; // Use PNG-24
        sfwOptions.transparency = true;
    } else {
        // For older PS versions without native WebP, save as high-quality JPEG
        sfwOptions.format = SaveDocumentType.JPEG;
        sfwOptions.quality = 90;
    }
    
    sfwOptions.optimized = true;
    doc.exportDocument(file, ExportType.SAVEFORWEB, sfwOptions);
}

// Run the script
main();
