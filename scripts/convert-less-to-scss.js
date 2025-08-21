import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

// List of files to convert
const filesToConvert = [
  'src/App.vue',
  'src/components/Avatars/src/Avatars.vue',
  'src/components/Breadcrumb/src/Breadcrumb.vue',
  'src/components/Descriptions/src/Descriptions.vue',
  'src/components/Dialog/src/Dialog.vue',
  'src/components/Form/src/Form.vue',
  'src/components/Icon/src/Icon.vue',
  'src/components/IconPicker/src/IconPicker.vue',
  'src/components/InputPassword/src/InputPassword.vue',
  'src/components/Menu/src/Menu.vue',
  'src/components/Qrcode/src/Qrcode.vue',
  'src/components/Setting/src/Setting.vue',
  'src/components/Setting/src/components/ColorRadioPicker.vue',
  'src/components/Setting/src/components/LayoutRadioPicker.vue',
  'src/components/TabMenu/src/TabMenu.vue',
  'src/components/TagsView/src/TagsView.vue',
  'src/components/ThemeSwitch/src/ThemeSwitch.vue',
  'src/components/Tree/src/Tree.vue',
  'src/components/UserInfo/src/UserInfo.vue',
  'src/components/UserInfo/src/components/LockDialog.vue',
  'src/components/UserInfo/src/components/LockPage.vue',
  'src/layout/Layout.vue',
  'src/layout/components/ToolHeader.vue',
  'src/views/Components/Descriptions.vue',
  'src/views/Components/Form/DefaultForm.vue',
  'src/views/Components/Form/UseFormDemo.vue',
  'src/views/Components/Search.vue',
  'src/views/Components/Table/TreeTable.vue',
  'src/views/Components/Table/UseTableDemo.vue',
  'src/views/Components/Tree.vue',
  'src/views/Dashboard/components/PanelGroup.vue',
  'src/views/Login/Login.vue',
  'src/views/Personal/PersonalCenter/PersonalCenter.vue'
]

// Function to convert Less to SCSS
function convertLessToScss(content) {
  let result = content

  // Replace Less variable declarations
  result = result.replace(/@([a-zA-Z0-9_-]+):/g, '$$$1:')

  // Replace Less variable usage
  result = result.replace(/@([a-zA-Z0-9_-]+)/g, '$$1')

  // Replace Less string interpolation
  result = result.replace(/~'([^']+)'/g, "'$1'")
  result = result.replace(/@{([^}]+)}/g, '#{$$1}')

  // Replace Less mixin calls
  result = result.replace(/\.([\w-]+);/g, '@extend .$1;')

  // Replace Less language attribute
  result = result.replace(/lang="less"/g, ' lang="scss"')

  // Replace Less file extensions
  result = result.replace(/\.less/g, '.scss')

  // Replace Less parent selector & when it's not part of a class name
  result = result.replace(/&([^-_a-zA-Z0-9])/g, '&$1')

  // Replace Less variable interpolation in selectors
  result = result.replace(/\.@{([^}]+)}/g, '.#{$$1}')

  return result
}

// Process each file
for (const file of filesToConvert) {
  try {
    if (fs.existsSync(file)) {
      console.log(`Processing ${file}...`)
      const content = fs.readFileSync(file, 'utf8')

      // Check if the file already has SCSS
      if (content.includes(' lang="scss"')) {
        console.log(`  ${file} already uses SCSS, skipping...`)
        continue
      }

      // Convert the content
      const scssContent = convertLessToScss(content)

      // Write back to the file
      fs.writeFileSync(file, scssContent)
      console.log(`  Converted ${file} to SCSS`)
    } else {
      console.log(`  File ${file} not found, skipping...`)
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error)
  }
}

console.log('Conversion complete!')
