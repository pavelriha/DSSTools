import { Injectable } from '@angular/core';
import { TreeNode } from '@circlon/angular-tree-component';

import { Row, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
//import * as QRCode from "@cordobo/qrcode"
import * as QRCode from "qrcode"

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(
  ) { }

  private columns = [
    { header: 'Cesta', key: 'path', width: 10 },
    { header: 'Skupina vlastností', key: 'setNameCS', width: 50 },
    { header: 'Název vlastnosti', key: 'nameCS', width: 50 },
    { header: 'Měrná jednotka', key: 'units', width: 10 },
    { header: 'Datový typ', key: 'dataTypeCS', width: 25 },
    { header: 'Popis', key: 'descriptionCS', width: 50 },
    { header: 'Poznámka', key: 'examples', width: 20 },
    { header: 'kód (GUID)', key: 'uuid', width: 45 },
    { header: 'IFC Pset', key: 'setName', width: 25 },
    { header: 'IFC property', key: 'name', width: 20 },
    { header: 'IFC data type', key: 'dataType', width: 20 },
    { header: 'IFC type', key: 'valueType', width: 20 },
  ];

  private columnsTree = [
    { header: 'Cesta', key: 'path', width: 50 },
    //{ header: 'name', key: 'nameCS', width: 10 },
    { header: 'Popis', key: 'descriptionCS', width: 40 },
    { header: 'Poznámka', key: 'noteCS', width: 40 },
    { header: 'IFC_class', key: 'ifcType', width: 15 },
    { header: 'IFC_type', key: 'ifcPredefinedType', width: 15 },
    { header: 'CCI:SE', key: 'cciSE', width: 10 },
    { header: 'CCI:VF', key: 'cciVF', width: 10 },
    { header: 'CCI:FS', key: 'cciFS', width: 10 },
    { header: 'CCI:TS', key: 'cciTS', width: 10 },
    { header: 'CCI:KO', key: 'cciKO', width: 10 },
    { header: 'CCI:SK', key: 'cciSK', width: 10 },
    { header: 'kód (GUID)', key: 'uuid', width: 45 },
  ];


  private bgcolor_path="CCCCCC";//"DDDDDD";

  private exportRequirement(worksheet:Worksheet, data, level) {
    //console.log(dataTemplates[id]);

    data?.requirementSets.forEach( set => {
      // SetName
      var rowData = {};
      rowData['setNameCS']=set.name;
      var row = worksheet.addRow(rowData, "n");
      row.outlineLevel = level+1;
      //row.font = { bold: true };

      // Requirements
      set.requirements.forEach( req => {
        var rowData = {};
        this.columns.forEach( c => {
          if (req[c.key] && req[c.key].constructor === Array) {
            rowData[c.key]=req[c.key].join();
          } else {
            rowData[c.key]=req[c.key];
          }
        });
        //console.log(rowData);
  
        var row = worksheet.addRow(rowData, "n");
        row.outlineLevel = level+2;
        row.getCell(2).font = { color: { argb: 'FFFFFF' }, };
      });
    });
  }


  // funkce ktera rekurzivne projde cestu k finalnimu uzlu a nasledne vypise pozadavky
  private ExportPathToRequirements(worksheet:Worksheet, dataTemplates, node) {
    //console.info(node.id, node.name, node.level);
    var row = worksheet.addRow([ ' '.repeat(node.level) + ' ' + node.name ],'n');
    row.outlineLevel = node.level;
    row.border = {
      //top: {style: 'thin', color: {argb:this.bgcolor_path}},
      left: {style:'thin', color: {argb:this.bgcolor_path}},
      //bottom: {style:'thin', color: {argb:this.bgcolor_path}},
      right: {style:'thin', color: {argb:this.bgcolor_path}}
    };
    row.fill = { type: 'pattern', pattern:'solid', fgColor:{argb:this.bgcolor_path} };
    //row.font = { family:3 }; //family 1 - Serif, 2 - Sans Serif, 3 - Mono, Others - unknown
    if (node.children.length>0) {
      node.children.forEach( ch => this.ExportPathToRequirements(worksheet, dataTemplates, ch) );
    } else {
      this.exportRequirement(worksheet, dataTemplates[node.id], node.level);
    }
  }

  // funkce ktera rekurzivne projde cestu k finalnimu uzlu 
  private ExportPath(worksheet:Worksheet, dataTemplates, node) {
    var rowData = {};
    this.columnsTree.forEach( c => {
      if (dataTemplates[node.id]) rowData[c.key]=dataTemplates[node.id][c.key];
    });
    rowData['path']=' '.repeat(node.level) + ' ' + node.name;
    //console.log(node,rowData);
    var row = worksheet.addRow(rowData, "n");
    //row.font = { family:3 }; //family 1 - Serif, 2 - Sans Serif, 3 - Mono, Others - unknown
    if (node.children.length>0) {
      node.children.forEach( ch => this.ExportPath(worksheet, dataTemplates, ch) );
    } else {
      //this.exportRequirement(worksheet, dataTemplates[node.id], node.level);
      //row.getCell('path').fill = { type: 'pattern', pattern:'solid', fgColor:{argb:this.bgcolor_path} };
      row.getCell('path').font = { name: 'Calibri', family:2,  bold: true }; 
    }
  }


  private exportAddSheetRequirements(workbook:Workbook, name:string, dataTemplates:any[], tree:any[] ) {
    const worksheet:Worksheet = workbook.addWorksheet(name);

    worksheet.columns = this.columns; //toto prirazeni zpusobi zapsani hlavicky do prvniho radku (A1,B1 atd). Pokud to nechceme mit na prvnim radku, ale neco pred to jeste predsadit, tak jedine reseni je potom provest worksheet.insertRow

    const rowheader = worksheet.getRow(1);
    rowheader.fill = { type: 'pattern', pattern:'solid', fgColor:{ argb:'AAAAAA' } };
    rowheader.font = { name: 'Calibri', family:2, bold: true }; 
    rowheader.alignment = { vertical: 'middle' }
    rowheader.height = 30;
  
    tree.forEach( node => this.ExportPathToRequirements(worksheet, dataTemplates, node) );
      

    worksheet.autoFilter = 'B1:Z1';
  }

  private exportAddSheetTree(workbook:Workbook, name:string, dataTemplates:any[], tree:any[] ) {
    const wstree:Worksheet = workbook.addWorksheet(name);
    wstree.columns = this.columnsTree;

    const rowheader = wstree.getRow(1);
    rowheader.fill = { type: 'pattern', pattern:'solid', fgColor:{ argb:'AAAAAA' } };
    rowheader.font = { name: 'Calibri', family:2, bold: true }; 
    rowheader.alignment = { vertical: 'middle' }
    rowheader.height = 30;


    tree.forEach( node => this.ExportPath(wstree, dataTemplates, node) );
  }

  private async exportAddSheetDSS(workbook:Workbook, name:string, breaks: TreeNode[], actors: TreeNode[], milestones: TreeNode[], reasons: TreeNode[], viewer_url: string) {
    const worksheet:Worksheet = workbook.addWorksheet(name);
    let row: Row;
    worksheet.columns = [
      { key: 'key',   width: 50 },
      { key: 'value', width: 50 },
    ];

    row = worksheet.addRow(['DSS', 'XLS export']);
    let dt = new Date();
    row = worksheet.addRow(['exportováno dne', dt.toLocaleString() ]);
    //console.log(row);

    row = worksheet.addRow(['']);
    row = worksheet.addRow(['Filtry']);
    breaks.forEach( s => { row = worksheet.addRow(['Datové šablony', s.data.nameCS ]); });
    actors.forEach( s => { row = worksheet.addRow(['Aktéři', s.data.nameCS ]); });
    milestones.forEach( s => { row = worksheet.addRow(['Milníky', s.data.nameCS ]); });
    reasons.forEach( s => { row = worksheet.addRow(['Účely užití', s.data.nameCS ]); });
    
    
    
    row = worksheet.addRow(['']);

    row = worksheet.addRow(['URL',viewer_url]);

    // const qrimage = await QRCode.toDataURL(viewer_url, {
    //     type: 'image/png',
    //     errorCorrectionLevel: 'M',
    // });

    // console.log('qrimage', qrimage);

    // const imageId2 = workbook.addImage({
    //     base64: qrimage,
    //     extension: 'png',
    // });
    // console.log(row.number);
    // //worksheet.addImage(imageId2, 'B2:D6');
    // worksheet.addImage(imageId2, {
    //   tl: { col: 1, row: row.number },
    //   ext: { width: 200, height: 200 },
    //   hyperlinks: {
    //     hyperlink: viewer_url,
    //     //tooltip: 'TIP: http://www.somewhere.com'
    //   }
    // });



    // const test1 = workbook.addImage({
    //     base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABSlBMVEUAAAD28vKlEh7XGyusHSwRAALNEyT2Q0ytFSMyBAh0CBLICx/MKjafDhu9FiaaDhu5EyS6GyqnFSTfIzOiEyJ8CxVuChPNDyLHEiPXJTHpO0TTIy/WKDSuCBvHCh6jCBm8Dx/HDiH2Q0zcOEGLBxXFDiDoND/zPkjQKDSpDRy/CR2lDRtsBxG/EyPqNEDEHy69FSZJBgziJjWNDhmWFiKxEyEFAQGdFyfLFSUAAADYJjLPHyzLHivkMz7GGyjhMTzTKDPgO0TcMj3BGie3Cx24EyHYMDvTKDTWMz23FiPEEiPoNECyFSLiMDzBESLNLDjBEyPpMz/YKTXLIzDsNUHVJjPEHiy/HSzBGSf2Q0vZGSrVEyX6SVDRCyDyPkfmLTniJjPsNEDkKjbcHy3fIjDpMTzvOkPSDyPdJDHaHi3uOUPqNkDpMz3RGChOcHzdAAAAWXRSTlMAA0EdCQj+51IyDf2ZgHNvZWAzKiAeFP37+vn27ejl4+Lc2dTSz8C7t7GwopmFhIR5PDEwKSkjFhQT/Pfv6ejf393c3NrYzsnExLmzs6+moZqRjol8e3dvNh6lMQMAAAFLSURBVCjPXZDVdsJAFEUnAqG4W3F3irbU3d1pcRq8///aezMka9H9MufcPcmaGaLAczYbx5P/lAvJiCBEkq/llTH3JLSWCIUtomBLNFutZlSvP8L1hlP2J5rAZZUQaxTTnfzNcweaV0MYhli8EDtvdP651wHONxkQ9mPMBzVJvMxHo9HsgTAAn5pBmb/jXHvRBxZFSRB9H0nhfWq+hSiK3Q8qil0ROLSDYD1doGemYmOAzWcFodkeABMLFcYetnUWhacHKGKCTRLszg8wlX81xLZbAVHdHwJTIxX5KbYTBx736gvJU/EolVsVAQy/mO8ZhL/GrDYRpBL6BuL0ScKYzxxEwqCGopYe0YzRbSIUZ9o1Ho/jVoZhwxBcWS1Z4kjr2u12IJMJwOLOOomC0xAChehOTbhfQVXKxYJ+fzCWK8FJV0yjvgbUG/L8D1M7VvyP2ng5AAAAAElFTkSuQmCC",
    //     extension: 'png',
    // });
    // worksheet.addImage(test1, {
    //   tl: { col: 4, row: row.number },
    //   ext: { width: 200, height: 200 },
    //   hyperlinks: {
    //     hyperlink: viewer_url,
    //     //tooltip: 'TIP: http://www.somewhere.com'
    //   }
    // });

    
  

  }

  public export(dataTemplates:any[], tree:any[], breaks: TreeNode[], actors: TreeNode[], milestones: TreeNode[], reasons: TreeNode[], viewer_url: string ) {

    let workbook:Workbook = new Workbook();

    this.exportAddSheetDSS(workbook, 'DSS', breaks, actors, milestones, reasons, viewer_url);

    this.exportAddSheetRequirements(workbook, "Požadavky na vlastnosti", dataTemplates, tree);

    this.exportAddSheetTree(workbook, 'Datové šablony', dataTemplates, tree);


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Datový standard staveb.xlsx');
    })

  
  }





/* ukazka jak stahnout XLS (sablonu) ze serveru a tu nacist
    //this.httpClient.get('assets/images/dss.xlsx', { responseType: 'blob' }).subscribe(async (data) => {
      this.httpClient.get('assets/images/dss.xlsx', { responseType: 'arraybuffer' }).subscribe( {
        next: (xls) => {
          let workbook = new Workbook();
          await workbook.xlsx.load( xls );
        }
        error: (err) => {
          window.alert('Internal error: Nepodařilo se načíst XLS šablonu');
        }
      });
*/

}
