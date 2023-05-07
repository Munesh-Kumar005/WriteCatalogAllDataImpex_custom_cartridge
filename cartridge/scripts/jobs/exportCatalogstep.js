var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
function myCustomExportCatalog() {
    var siteCatalog = CatalogMgr.getCatalog('storefront-catalog-m-en')
    var allProducts = ProductMgr.queryProductsInCatalog(siteCatalog);
    var DirName		= File.IMPEX + '/src/';
    file = new dw.io.File(DirName + 'ExportedCatalog');
    var CSVStrmWriter = new CSVStreamWriter(new FileWriter(file))
    var columnNames = [];
    columnNames.push('Product Name');
    columnNames.push('Color');
    columnNames.push('Size');
    columnNames.push('Master ID');
    columnNames.push('Product ID');
    columnNames.push('Quantity');
    CSVStrmWriter.writeNext(columnNames);
    while (allProducts.hasNext()) {
        var dataToPutInFile = [];
        var currentProduct = allProducts.next();
        dataToPutInFile.push(currentProduct.name);
        if(currentProduct.variant){
            dataToPutInFile.push(currentProduct.variationModel.selectedVariant.custom.color);
            dataToPutInFile.push(currentProduct.variationModel.selectedVariant.custom.size);
            dataToPutInFile.push(currentProduct.masterProduct.ID);
        }else{
            dataToPutInFile.push('');
            dataToPutInFile.push('');
            dataToPutInFile.push(currentProduct.ID);
        }
        dataToPutInFile.push(currentProduct.ID);
        dataToPutInFile.push(currentProduct.unitQuantity.value);
        CSVStrmWriter.writeNext(dataToPutInFile);
    }
    CSVStrmWriter.close();
    var test = '';
}

module.exports = {
    myCustomExportCatalog: myCustomExportCatalog
};