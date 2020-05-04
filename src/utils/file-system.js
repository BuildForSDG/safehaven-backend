const fs = require('fs');
const path = require('path');

export const createNewFile = async (title, text) => {
 try {
    // const filename = path.join(__dirname, `../../files/${title.split(' ')[0]}.pdf`);
     const file = fs.writeFileSync(`${title.split(' ')[0]}.pdf`, 'utf8')
     return file;
 } catch (e) {
     console.log(e);
     return 'Error while creating file';
 }
};


export const readAFile = (file) => {
 try {
     const data = fs.readFileSync(file, 'utf8');
     return data
 } catch (e) {
     console.log(e);
     return 'Error while creating file';
 }
};

export default async (title, text) => {
  const filename = `${title.split(' ')[0]}.pdf`;
  const data = new Buffer(text)
  return {data, filename};
};
