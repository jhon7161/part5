// eslint-disable-next-line no-undef
const fs = require('fs')
// eslint-disable-next-line no-undef
const path = require('path')

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file)
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist)
    } else {
      filelist.push(filepath)
    }
  })
  return filelist
}

const convertLineEndings = file => {
  const content = fs.readFileSync(file, 'utf8')
  const converted = content.replace(/\r\n/g, '\n')
  fs.writeFileSync(file, converted, 'utf8')
}

const files = walkSync('.')
files.forEach(file => convertLineEndings(file))

console.log('Line endings converted to LF')
