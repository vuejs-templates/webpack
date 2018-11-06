import getPermissionRequest from '../api/permission'

let permissitionPromise = null

let applicationMenu = null

let permissionMap = null

const getPermissionPromise = function () {
  return permissitionPromise || (permissitionPromise = getPermissionRequest())
}

const getMenu = function (menu, _permissionData, _menu) {
  let hasSubMenu = false

  for(const menuItem of menu){
    let menuItemCopy = {}

    Object.keys(menuItem).forEach(prop => {
      if(prop !== 'subMenu'){
        menuItemCopy[prop] = menuItem[prop]
      }
    })

    if(_permissionData[menuItem.key] && !menuItem.subMenu){
      _menu.push(menuItemCopy)
      hasSubMenu = true
    }else if(menuItem.subMenu) {
      menuItemCopy.subMenu = []

      hasSubMenu = getMenu(menuItem.subMenu, _permissionData, menuItemCopy.subMenu)

      if(hasSubMenu) {
        _menu.push(menuItemCopy)
      }
    }
  }

  return hasSubMenu
}

export const getApplicationMenu = async function (menu) {
  const permission = await getPermission()

  let permission_menu = []

  if (!applicationMenu) {
    getMenu(menu, permission, permission_menu)

    applicationMenu = permission_menu
  }

  return applicationMenu
}

export const getPermission = async function () {
  const _permissitionPromise = getPermissionPromise()

  const permission = await _permissitionPromise

  if(!permissionMap) {
    permissionMap = {}

    permission.forEach(pageOpt => {
      permissionMap[pageOpt.code] = pageOpt
    })
  }

  return permissionMap
}

export const getOperatesConfig = function ({gridBtns = [], gridCustomBtns = {}, editColumnConfig}, operatesPermission) {
  let _gridBtns = []
  let _gridCustomBtns = {}
  let _editColumnConfig = Object.assign({}, editColumnConfig, {setBtnGroup: null})
  let operatesPermissionMap = {}
  let result = {}

  operatesPermission.forEach(btnConfig => {
    const customBtn = gridCustomBtns[btnConfig.code]

    if(gridBtns.includes(btnConfig.code)){
      _gridBtns.push(btnConfig.code)

      if(gridCustomBtns[btnConfig.code]){
        _gridCustomBtns[btnConfig.code] = {
          type: customBtn.type,
          text: btnConfig.name,
          onClick: function (...arg) {
            if(btnConfig.metaData) {
              customBtn.onClick(...arg, JSON.parse(btnConfig.metaData))
            }else{
              customBtn.onClick(...arg)
            }
          }
        }
      }
    }

    operatesPermissionMap[btnConfig.code] = btnConfig
  })

  result.gridBtns = _gridBtns
  result.gridCustomBtns = _gridCustomBtns

  if(editColumnConfig) {
    _editColumnConfig.setBtnGroup = function ({data, index}) {
      let allBtns = editColumnConfig.setBtnGroup({data, index})
      let permissionBtns = []

      allBtns.forEach(btn => {
        const btnConfig = operatesPermissionMap[btn.key]

        if(btnConfig) {
          permissionBtns.push({
            type: btn.type,
            text: btnConfig.name,
            onClick (...arg) {
              if(btnConfig.metaData) {
                btn.onClick(...arg, JSON.parse(btnConfig.metaData))
              }else{
                btn.onClick(...arg)
              }
            }
          })
        }
      })

      return permissionBtns
    }

    result.editColumnConfig = _editColumnConfig
  }

  return result
}
